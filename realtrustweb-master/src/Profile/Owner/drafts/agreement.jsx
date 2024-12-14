import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Request from "./../../../lib/axios";
import { toast } from "react-toastify";

const Agreement = ({ path, token, userProfileData }) => {
  const [agreementFileName, setAgreementFileName] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setAgreementFileName(savedData.agreement_name || "");
    }
    if (userProfileData) {
      setValue("agreement", userProfileData.agreement || "");
    }
  }, [userProfileData, setValue]);

  useEffect(() => {
    const subscription = watch(async (value) => {
      const existingData = JSON.parse(localStorage.getItem("formData")) || {};

      if (value.agreement?.[0]) {
        const base64Agreement = await fileToBase64(value.agreement[0]);
        existingData.agreement = base64Agreement;
        existingData.agreement_name = value.agreement[0].name;

        setAgreementFileName(value.agreement[0].name);
      }
      localStorage.setItem("formData", JSON.stringify(existingData));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const uploadAgreement = async (data) => {
    const formData = new FormData();
    formData.append("agreement", data.agreement[0]);

    try {
      await Request.post(path, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Agreement uploaded successfully");
      setAgreementFileName(data.agreement[0].name);
    } catch (error) {
      console.error("Error uploading agreement:", error);
      toast.error("Failed to upload agreement");
    }
  };

  return (
    <div className="lg:w-[60%] w-full mx-auto bg-white border border-gray-200 px-8 py-6 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(uploadAgreement)} className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Upload Agreement
        </h2>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-800 mb-2">
            Agreement
          </label>
          {/* 
          <input
            type="file"
            accept="application/pdf"
            className="w-full text-gray-700 text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5 focus:ring-2 focus:ring-blue-300"
            {...register("agreement", {
              required: "Agreement is required",
              onChange: (e) =>
                setAgreementFileName(e.target.files[0]?.name || ""),
            })}
          />

          <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full relative">
            {agreementFileName}
          </div> */}
          <div className="relative">
            <input
              type="file"
              accept="image/*,.pdf"
              className={`bg-gray-50 border ${
                errors.agreement ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 opacity-0 absolute inset-0 z-10`}
              {...register("agreement", {
                required: "Agreement PDF is required",
                onChange: (e) =>
                  setAgreementFileName(e.target.files[0]?.name || ""),
              })}
            />
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full relative">
              {agreementFileName || "Choose a file..."}
            </div>
            {/* Show error message */}
            {errors.agreement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.agreement.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white cursor-pointer bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Agreement;
