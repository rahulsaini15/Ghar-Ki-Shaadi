import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Music2 } from "lucide-react";
import { weddingData as d } from "./weddingData";
import Opening from "./components/Opening";
import Countdown from "./components/Countdown";

function FloatingBackground() {
  const decorations = [
    "❀",
    "✦",
    "❦",
    "✧",
    "❀",
    "✦",
    "❦",
    "✧",
    "❀",
    "✦",
  ];

  return (
    <div className="floatingBackground" aria-hidden="true">
      {decorations.map((item, index) => (
        <span
          key={index}
          style={{
            "--index": index,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);

  const openInvitation = async () => {
    setOpened(true);

    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const shareInvitation = async () => {
    const shareData = {
      title: "Mousam & Vatan Wedding",
      text: "सैनी परिवार की ओर से स्नेह निमंत्रण 💍",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        alert("निमंत्रण लिंक कॉपी हो गया");
      }
    } catch (error) {
      console.log("Share cancelled", error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {!opened && <Opening onOpen={openInvitation} />}
      </AnimatePresence>

      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.section
            className="screen intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FloatingBackground />

            <div className="content">
              <motion.p
                className="mantra"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                ॥ श्री गणेशाय नमः ॥
              </motion.p>

              <motion.div
                className="om"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1,
                  type: "spring",
                }}
              >
                ॐ
              </motion.div>

              <p>श्री राम की कृपा से</p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                मंगल परिणयोत्सव
              </motion.h1>

              <div className="divider">❦</div>

              <p className="bigcopy">
                हमारे परिवार में शुभ विवाह का
                <br />
                मंगल अवसर आया है
              </p>

              <p className="date">{d.date}</p>

              <a className="down" href="#couples">
                मंगल यात्रा आरंभ करें
                <br />
                ⌄
              </a>
            </div>
          </motion.section>

          <div id="couples">
            {d.couples.map((couple, index) => (
              <motion.section
                className="screen couple"
                key={couple.groom}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{ duration: 0.8 }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
              >
                <FloatingBackground />

                <div className="content coupleBox">
                  <p className="label">शुभ विवाह</p>

                  <small>
                    मंगल मिलन • {index ? "द्वितीय" : "प्रथम"}
                  </small>

                  <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    ✦ {couple.groom} ✦
                  </motion.h2>

                  <motion.p
                    className="sang"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      duration: 0.8,
                    }}
                    viewport={{ once: true }}
                  >
                    संग
                  </motion.p>

                  <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    ✦ {couple.bride} ✦
                  </motion.h2>

                  <div className="divider">❦</div>

                  <p className="bigcopy">{couple.line}</p>
                </div>
              </motion.section>
            ))}
          </div>

          <motion.section
            className="screen brothers"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <FloatingBackground />

            <motion.div
              className="content"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="orn">❦</div>

              <h1>एक आँगन, दो खुशियाँ</h1>

              <p className="orn">✦</p>

              <p className="bigcopy">
                दो भाइयों के जीवन में
                <br />
                आरंभ हो रहा है एक नया अध्याय
              </p>

              <h2>मौसम ❦ वतन</h2>

              <p className="bigcopy">
                आपके स्नेह और आशीर्वाद की
                <br />
                हमें प्रतीक्षा रहेगी
              </p>
            </motion.div>
          </motion.section>

          <Countdown targetDate={d.dateISO} />

          <section className="events">
            <FloatingBackground />

            <div className="content eventsContent">
              <motion.p
                className="label"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                वैवाहिक कार्यक्रम
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                शुभ कार्यक्रम
              </motion.h1>

              <div className="divider">❦</div>

              <div className="eventList">
                {d.events.map((event, index) => (
                  <motion.article
                    className="eventCard"
                    key={event.title}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -70 : 70,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                  >
                    <motion.div
                      className="eventIcon"
                      animate={{
                        y: [0, -7, 0],
                      }}
                      transition={{
                        duration: 2 + index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {event.symbol}
                    </motion.div>

                    <div className="eventDetails">
                      <h3>{event.title}</h3>

                      <p>{event.date}</p>

                      <span>{event.time}</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <motion.section
            className="screen venue"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FloatingBackground />

            <div className="content frame">
              <p className="label">पधारो सा</p>

              <h1>{d.venue.name}</h1>

              <div className="divider">✦</div>

              <p className="bigcopy">{d.venue.address}</p>

              <motion.a
                className="btn"
                href={d.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Google Map
              </motion.a>
            </div>
          </motion.section>

          <motion.section
            className="screen light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <FloatingBackground />

            <motion.div
              className="content"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="om">ॐ</div>

              <h1>
                आपकी उपस्थिति ही
                <br />
                हमारा सौभाग्य है
              </h1>

              <div className="divider">❦</div>

              <p className="bigcopy">{d.invitation}</p>

              <h3>{d.family}</h3>

              <p>।। शुभ विवाह ।।</p>

              <button
                className="btn"
                onClick={shareInvitation}
              >
                निमंत्रण साझा करें
              </button>
            </motion.div>
          </motion.section>

          <footer className="screen footer">
            <FloatingBackground />

            <motion.div
              className="content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h1>मौसम ❦ वतन</h1>

              <h3>Mousam & Vatan Wedding</h3>

              <p>सप्रेम — {d.family}</p>
            </motion.div>
          </footer>
        </motion.main>
      )}

      {opened && (
        <button
          className="music"
          onClick={toggleMusic}
          aria-label="Toggle music"
        >
          {playing ? (
            <Music2 size={22} />
          ) : (
            <Music size={22} />
          )}
        </button>
      )}
    </>
  );
}
