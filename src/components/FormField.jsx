import React from "react";

const FormField = ({
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
          className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3 pr-28 transition duration-300 ease-in-out hover:shadow-xl focus:shadow-lg active:shadow-md"
        />
        <div className="absolute right-0 top-0 mr-3 mt-2">
          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="hover:text-red-500 focus:text-red-500 active:text-red-500 font-semibold text-xs py-1 px-2 rounded-[5x] text-black"
            >
              Surprise me!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;
