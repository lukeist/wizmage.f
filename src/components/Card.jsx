import React from "react";
import { download, thumbup, thumbdown } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo, disliked, liked }) => {
  const incLike = (id) => {
    console.log(liked);
  };
  const incDislike = (id) => {};

  return (
    <div className="rounded-xl group relative card hover:shadow-xl shadow-card transition duration-300 ease-in-out hover:brightness-110">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg=[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-md - overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-black flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            {/* LIKE AND DISLIKE NOT WORKING WITHOUT AN ACCOUNT
            BECAUSE THEY'LL CLICK MANY TIMES THEY WANT
            <button
              type="button"
              onClick={() => incLike(_id)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={thumbup}
                alt="like"
                className="w-6 h-6 object-contain invert "
              />
              <span className="c-white"> {liked}</span>
            </button>
            <button
              type="button"
              onClick={() => incDislike(_id)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={thumbdown}
                alt="dislike"
                className="w-6 h-6 object-contain invert "
              />
              {disliked}
            </button> */}
            <p className="text-white text-sm"></p>
          </div>

          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none  bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
