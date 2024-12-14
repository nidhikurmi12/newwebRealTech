import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const ModalWithForm = ({ onClose, updateProfileApi }) => {
  const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const onSubmitForm = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("mobile_no", data.mobile_no);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    updateProfileApi(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen bg-[rgba(0,0,0,0.5)] z-50">
      <div className="relative w-[40%] bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className={`mt-1 block w-full p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobile_no"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile_no"
              {...register("mobile_no", { required: true })}
              className={`mt-1 block w-full p-2 border ${
                errors.mobile_no ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.mobile_no && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Profile Image
            </label>
            <div className="relative w-full h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-yellow-500">
              {fileName ? (
                <p className="text-gray-700 ">{fileName}</p>
              ) : (
                <div className="flex items-center text-gray-500 ">
                  <FiUpload className="text-2xl mb-2" />
                  <span>Click to upload or drag & drop</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
