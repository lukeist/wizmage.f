import React, { useState } from "react";
import { preview } from "../../assets";
import FormGenerator from "../../components/FormGenerator";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  return (
    <section className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <div className="max-w-7xl my-8 mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
            Create imaginative and visually stunning images through DALL-E AI
            and share them with the community
          </p>
        </div>
        <FormGenerator form={form} setForm={setForm} />
      </div>
    </section>
  );
};

export default Create;
