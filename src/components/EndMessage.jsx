import React from "react";

const EndMessage = ({ text }) => (
  <div className="flex justify-center items-center bg-opacity-50 bg-white bg-blur rounded-xl bg-gradient-to-tr from-red-500/50 to-purple-500/50">
    <h4 className="text-gray-200 text-center">{text}</h4>
  </div>
);

export default EndMessage;
