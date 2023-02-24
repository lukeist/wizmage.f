import React, { useState } from "react";
import { preview } from "../assets";
import { downloadImage, getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
// import { useNavigate } from "react-router-dom";

const FormGenerator = ({ currentLanguage, form, setForm }) => {
  // const navigate = useNavigate();
  const isMobile = window.innerWidth < 600;

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(import.meta.env.VITE_API_POST, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        // setForm({
        //   name: "",
        //   prompt: "",
        //   photo: "",
        // });
        location.href = window.location.href;
        // navigate("/");

        // window.location.reload();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(import.meta.env.VITE_API_DALLE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else alert(`${currentLanguage.txtPleaseEnterAPrrompt}`);
  };

  return (
    <>
      {!form.photo ? (
        <form
          onSubmit={handleSubmit}
          className="absolute max-w-3xl z-30"
          style={{
            top: "70%",
            left: "50%",
            width: isMobile ? "90%" : "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex flex-col gap-3" style={{ height: "60px" }}>
            <FormField
              // labelName="Prompt"
              btnName={currentLanguage.btnSurpriseMe}
              type="text"
              name="prompt"
              placeholder={currentLanguage.placeholderPrompt}
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={generateImage}
                className={`btn-generator p-2 ${isMobile ? "w-2/4" : "w-1/4"}`}
              >
                {generatingImg
                  ? currentLanguage.btnGenerating
                  : form.photo
                  ? currentLanguage.btnGenerateAgain
                  : currentLanguage.btnGenerate}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`${
            isMobile ? "ml-0 items-center bg-black opacity-90" : "ml-14"
          } absolute flex flex-col justify-center mt-0 max-w-3xl h-screen z-30`}
          style={
            isMobile
              ? {}
              : {
                  left: "50%",
                  width: "50%",
                }
          }
        >
          <div
            className={`flex flex-col gap-5 ${isMobile ? "" : "mr-20"}`}
            style={isMobile ? { width: "90%" } : {}}
          >
            <FormField
              labelName={currentLanguage.placeholderName}
              type="text"
              name="name"
              placeholder={currentLanguage.placeholderName}
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              btnName={currentLanguage.btnSurpriseMe}
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder={currentLanguage.placeholderPrompt}
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div
              className={`${
                isMobile ? "" : "w-80 h-80"
              } relative bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 flex justify-center items-center`}
            >
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg=[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div
            className="mt-5 flex gap-3"
            style={isMobile ? { width: "90%" } : {}}
          >
            <button
              type="button"
              onClick={generateImage}
              className="btn-generator w-full text-white font-medium rounded-md text-sm sm:w-auto px-10 py-2.5 text-center"
            >
              {generatingImg
                ? currentLanguage.btnGenerating
                : form.photo
                ? currentLanguage.btnGenerateAgain
                : currentLanguage.btnGenerate}
            </button>
            {generatingImg
              ? undefined
              : form.photo && (
                  <button
                    type="button"
                    onClick={() =>
                      downloadImage(
                        Math.floor(new Date().getTime() / 1000),
                        form.photo
                      )
                    }
                    className="w-full text-white bg-black font-medium rounded-md text-sm sm:w-auto px-7 py-2.5 text-center"
                  >
                    {currentLanguage.btnDownload}
                  </button>
                )}
          </div>
          <div className="mt-10" style={isMobile ? { width: "90%" } : {}}>
            <p className="mt-2 text-white text-[14px]">
              {currentLanguage.txtSharePost}
            </p>

            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading
                ? currentLanguage.btnSharing
                : currentLanguage.btnSharePost}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormGenerator;
