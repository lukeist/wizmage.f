import React, { useState, useEffect } from "react";
import FormGenerator from "./FormGenerator";

const Slideshow = ({ firstThree }) => {
  const isMobile = window.innerWidth < 600;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
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
      className="relative flex flex-col w-full overflow-hidden bg-black h-screen"
      // style={{
      //   height: isMobile ? undefined : "100vh",
      // }}
    >
      <FormGenerator form={form} setForm={setForm} />

      {form.photo ? (
        <img
          // className="object-cover absolute top-0 left-0"
          className="object-cover"
          style={{
            height: "100vh",
          }}
          src={form.photo}
          alt={form.prompt}
        />
      ) : (
        firstThree &&
        firstThree.map((item, index) => (
          <img
            className={`object-cover absolute top-0 left-0  ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              height: "100vh",
              width: "100%",
              transition: "opacity 1.5s",
            }}
            key={index}
            src={item.photo}
            alt={item.alt}
          />
        ))
      )}
    </div>
  );
};

export default Slideshow;
