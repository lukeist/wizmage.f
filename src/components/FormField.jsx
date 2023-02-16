import React from "react";

const FormField = ({
  btnName,
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      {/* <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5x] text-black"
          >
            Surprise me
          </button>
        )}
      </div> */}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          style={{ maxWidth: "100%" }}
          className="w-full p-3 pr-28 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block transition duration-300 ease-in-out hover:shadow-xl focus:shadow-lg active:shadow-md"
        />
        <div className="absolute right-0 top-0 mr-3 mt-2.5">
          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="flex gap-2 justify-center items-center hover:text-[#ff0080] focus:text-[#ff0080] active:text-[#ff0080] font-semibold text-xs py-1 px-2 rounded-[5x] text-black"
            >
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-neon-pulse animate-neon animate-pulse"></div>
              <span>{btnName}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;
