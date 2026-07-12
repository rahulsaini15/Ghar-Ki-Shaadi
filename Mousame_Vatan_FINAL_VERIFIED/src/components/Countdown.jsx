import { useEffect, useState } from "react";

const hindiDigits = "०१२३४५६७८९";

const hindiNumber = (number) =>
  String(number)
    .padStart(2, "0")
    .replace(/\d/g, (digit) => hindiDigits[Number(digit)]);

function getTimeLeft(targetDate) {
  const difference = Math.max(
    new Date(targetDate) - Date.now(),
    0
  );

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor(difference / 3600000) % 24,
    minutes: Math.floor(difference / 60000) % 60,
    seconds: Math.floor(difference / 1000) % 60,
  };
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(() =>
    getTimeLeft(targetDate)
  );

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
      <div className="content">
        <p className="gold">
          शुभ घड़ी आने में
        </p>

        <h1>मंगल प्रतीक्षा</h1>

        <div className="grid">
          {countdownItems.map(([label, value]) => (
            <div key={label}>
              <strong>
                {hindiNumber(value)}
              </strong>

              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
