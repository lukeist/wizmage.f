import React, { useState, useEffect } from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
import FormGenerator from "./FormGenerator";

const Slideshow = ({ currentLanguage, firstThree }) => {
  const isMobile = window.innerWidth < 600;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      firstThree.length &&
        setCurrentIndex(
          (currentIndex) => (currentIndex + 1) % firstThree.length
        );
    }, 9000);

    return () => clearInterval(interval);
  }, [currentIndex, firstThree.length]);

  return (
    <div
      className="relative flex flex-col w-full overflow-hidden bg-black h-screen z-1"
      // style={{
      //   height: isMobile ? undefined : "100vh",
      // }}
    >
      <FormGenerator
        currentLanguage={currentLanguage}
        form={form}
        setForm={setForm}
      />

      {firstThree.map((item, index) => (
        <div
          key={index}
          className={`${
            index === currentIndex ? "z-20 opacity-100" : "z-0 opacity-0"
          } transition-opacity duration-1000 ease-in-out absolute top-0 left-0 w-full`}
          id={`slide${index}`}
        >
          <img
            src={item.photo}
            alt=""
            className="w-full h-screen object-cover"
          />
          {!form.photo && (
            <div
              className={`flex flex-col items-end absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                width: isMobile ? "90%" : "45%",
              }}
            >
              <button
                type="button"
                onClick={() => downloadImage(item._id, item.photo)}
                className={`${
                  index === currentIndex ? "z-20" : "z-0"
                } outline-none bg-transparent border-none mb-2`}
              >
                <img
                  src={download}
                  alt="download"
                  className="w-6 h-6 object-contain invert"
                />
              </button>
              <p
                className={`text-white italic text-right text-lg text-shadow-2xl z-10`}
                style={{ textShadow: "0 0 3px rgba(0, 0, 0, 0.5)" }}
              >
                {item.prompt.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
