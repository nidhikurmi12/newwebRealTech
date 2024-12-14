import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Request from "../../lib/axios";
import { toast } from "react-toastify";

const MyForm = ({ apiurl, token, userProfileData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [aadhaarFileName, setAadhaarFileName] = useState("");
  const [panFileName, setPanFileName] = useState("");

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
      setValue("company_name", savedData.company_name || "");
      setValue("employee_id", savedData.employee_id || "");
      setAadhaarFileName(savedData.aadhaar_card_name || "");
      setPanFileName(savedData.pan_card_name || "");
    }
    if (userProfileData) {
      setValue("company_name", userProfileData.company_name || "");
      setValue("employee_id", userProfileData.employee_id || "");
      setValue("aadhaar_card", userProfileData.aadhaar_card || "");
      setValue("pan_card", userProfileData.pan_card || "");
    }
  }, [userProfileData, setValue]);

  useEffect(() => {
    const subscription = watch(async (value) => {
      const formData = { ...value };
      if (value.aadhaar_card?.[0]) {
        formData.aadhaar_card = await fileToBase64(value.aadhaar_card[0]);
        formData.aadhaar_card_name = value.aadhaar_card[0].name;
        setAadhaarFileName(value.aadhaar_card[0].name);
      }
      if (value.pan_card?.[0]) {
        formData.pan_card = await fileToBase64(value.pan_card[0]);
        formData.pan_card_name = value.pan_card[0].name;
        setPanFileName(value.pan_card[0].name);
      }
      localStorage.setItem("formData", JSON.stringify(formData));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const userDocuments = async (data) => {
    const formData = new FormData();
    formData.append("company_name", data.company_name);
    formData.append("employee_id", data.employee_id);
    if (data.aadhaar_card?.[0])
      formData.append("aadhaar_card", data.aadhaar_card[0]);
    if (data.pan_card?.[0]) formData.append("pan_card", data.pan_card[0]);

    try {
      const response = await Request.post(apiurl, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      toast("Data sent successfully");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <form
      className="lg:w-[80%] w-full bg-white max-w-md mx-auto border px-4 py-4 shadow-md rounded-md"
      onSubmit={handleSubmit(userDocuments)}
    >
      <h1 className="text-center text-lg font-bold mb-3">Upload Documents</h1>

      {/* Company Name */}
      <div className="mb-5">
        <label className="block mb-2 text-md font-medium text-gray-900">
          Company Name
        </label>
        <input
          type="text"
          className={`bg-gray-50 border ${
            errors.company_name ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          placeholder="Enter your company name"
          {...register("company_name", {
            required: "Company Name is required",
          })}
        />
        {errors.company_name && (
          <p className="text-red-500 text-sm">{errors.company_name.message}</p>
        )}
      </div>

      {/* Employee ID */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Employee ID
        </label>
        <input
          type="text"
          placeholder="AIRFH658H"
          className={`bg-gray-50 border ${
            errors.employee_id ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
          {...register("employee_id", { required: "Employee ID is required" })}
        />
        {errors.employee_id && (
          <p className="text-red-500 text-sm">{errors.employee_id.message}</p>
        )}
      </div>

      {/* Aadhaar Card */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Aadhaar Card Image
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*,.pdf"
            className={`bg-gray-50 border ${
              errors.aadhaar_card ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 opacity-0 absolute inset-0 z-10`}
            {...register("aadhaar_card", {
              required: "Aadhaar card image or PDF is required",
              onChange: (e) =>
                setAadhaarFileName(e.target.files[0]?.name || ""),
            })}
          />
          <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full relative">
            {aadhaarFileName || "Choose a file..."}
          </div>
        </div>
        {errors.aadhaar_card && (
          <p className="text-red-500 text-sm">{errors.aadhaar_card.message}</p>
        )}
      </div>

      {/* Pan Card */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Pan Card Image
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*,.pdf"
            className={`bg-gray-50 border ${
              errors.pan_card ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 opacity-0 absolute inset-0 z-10`}
            {...register("pan_card", {
              required: "PAN card image is required",
              onChange: (e) => setPanFileName(e.target.files[0]?.name || ""),
            })}
          />
          <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full relative">
            {panFileName || "Choose a file..."}
          </div>
        </div>
        {errors.pan_card && (
          <p className="text-red-500 text-sm">{errors.pan_card.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;
