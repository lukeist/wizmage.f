import React, { useState, useEffect } from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
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
          <div key={index}>
            <img
              className={`object-cover absolute top-0 left-0  ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                height: "100vh",
                width: "100%",
                transition: "opacity 1.5s",
              }}
              src={item.photo}
              alt={item.alt}
            />
            <div
              className={`flex flex-col items-end object-cover absolute top-0 left-0 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                top: "55%",
                left: "50%",
                width: isMobile ? "90%" : "45%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                type="button"
                onClick={() => downloadImage(item._id, item.photo)}
                className="z-10 outline-none bg-transparent border-none"
              >
                <img
                  src={download}
                  alt="download"
                  className="w-6 h-6 object-contain invert"
                />
              </button>
              <p
                className="text-white italic text-right text-lg text-shadow-2xl"
                style={{ textShadow: "0 0 3px rgba(0, 0, 0, 0.5)" }}
              >
                {item.prompt.toLowerCase()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Slideshow;
