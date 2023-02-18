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

      {form.photo ? (
        <img
          // className="object-cover absolute top-0 left-0"
          className="z-1 object-cover"
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
            <div
              id={`slide${index}`}
              className={`slidebox absolute top-0 left-0  ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `url(${item.photo})`,
              }}
            >
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
          </div>
        ))
      )}
    </div>
  );
};

export default Slideshow;
