import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft(targetDate) {
  const difference = Math.max(new Date(targetDate) - Date.now(), 0);

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor(difference / 3600000) % 24,
    minutes: Math.floor(difference / 60000) % 60,
    seconds: Math.floor(difference / 1000) % 60,
  };
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(targetDate));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const countdownItems = [
    ["दिन", time.days],
    ["घंटे", time.hours],
    ["मिनट", time.minutes],
    ["सेकंड", time.seconds],
  ];

  return (
    <section className="screen countdown">
      <div className="countdownDecorations" aria-hidden="true">
        <span>❦</span>
        <span>✦</span>
        <span>❀</span>
        <span>✧</span>
      </div>

      <div className="content">
        <motion.p
          className="gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          शुभ घड़ी आने में
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          मंगल प्रतीक्षा
        </motion.h1>

        <div className="grid">
          {countdownItems.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <strong>{formatNumber(value)}</strong>

              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
