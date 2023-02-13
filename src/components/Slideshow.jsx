import React, { useState, useEffect } from "react";

const Slideshow = ({ firstThree }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        firstThree ? Math.floor(Math.random() * firstThree.length) : 0
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
      }}
    >
      {firstThree &&
        firstThree.map((item, index) => (
          <img
            className={`object-cover slide${
              index === currentIndex ? " active" : ""
            }`}
            style={{ height: "100vh", width: "100%" }}
            key={index}
            src={item.photo}
            alt={item.alt}
          />
        ))}
    </div>
  );
};

export default Slideshow;
