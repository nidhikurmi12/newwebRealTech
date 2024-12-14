import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MdEditSquare } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { FaAddressCard, FaIdCardAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ProfileContext } from "../../contexts/profileContext";
export const Profile = ({ userProfileData, updateUserProfile }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { userProfile } = useContext(ProfileContext);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile_no", data.mobile_no);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    updateUserProfile(formData);
    onOpenChange(false);
  };

  setValue("name", userProfile.name);
  setValue("mobile_no", userProfile.mobile_no);
  setValue("email", userProfile.email);

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center w-full mt-10">
          <div className="container mx-auto rounded-lg">
            <div>
              <div className=" bg-white lg:w-[460px] relative shadow rounded-lg !md:w-full mx-auto">
                <div className="flex justify-center">
                  <img
                    src={
                      userProfileData.image_url ||
                      "https://avatars0.githubusercontent.com/u/35900628?v=4"
                    }
                    alt="Profile"
                    className="rounded-full mx-auto absolute -top-16 w-24 h-24 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                  />
                  <Button
                    onPress={onOpen}
                    className="absolute right-0 top-2 bg-transparent"
                  >
                    <MdEditSquare size={30} />
                  </Button>
                </div>

                <div className="mt-11 ">
                  <h1 className="font-bold text-center text-3xl text-gray-900 capitalize">
                    {userProfileData.name}
                  </h1>
                  <div className="my-5 px-6">
                    <a
                      href="#"
                      className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
                    >
                      <span className="font-bold capitalize">
                        {userProfileData.email || "person@gmial.com"}
                      </span>
                    </a>
                  </div>

                  <div className="w-full">
                    <h3 className="font-medium text-gray-900 text-left px-6 capitalize">
                      Profile details
                    </h3>
                    <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                      <a
                        href="#"
                        className="border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex gap-4 hover:bg-gray-100 transition duration-150"
                      >
                        <FaSquarePhone size={30} className="text-blue-500" />
                        <span className="text-gray-500 text-lg">
                          {userProfileData.mobile_no || "Data Not Available"}
                        </span>
                      </a>
                      <a
                        href="#"
                        className="border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex gap-4 hover:bg-gray-100 transition duration-150"
                      >
                        <BsBuildingsFill
                          size={30}
                          className="text-yellow-500"
                        />
                        <span className="text-gray-500 text-lg">
                          {userProfileData.company_name || "Data Not Available"}
                        </span>
                      </a>
                      <a
                        href="#"
                        className="border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex gap-4 hover:bg-gray-100 transition duration-150"
                      >
                        <FaIdCardAlt size={30} className="text-blue-500" />
                        <span className="text-gray-500 text-lg">
                          {userProfileData.employee_id || "Data Not Available"}
                        </span>
                      </a>
                      <a
                        href="#"
                        className="border-t border-gray-100 text-gray-600 pt-3 pb-2 overflow-hidden pl-6 pr-5 w-full flex gap-4 hover:bg-gray-100 transition duration-150"
                      >
                        <FaAddressCard size={30} className="text-blue-600" />
                        <img
                          src={userProfileData.pan_card_url}
                          alt="pancard"
                          className="h-40 w-full"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Update Profile
                </ModalHeader>
                <ModalBody>
                  {/* Name Input */}
                  <div className=" w-full">
                    <label className="text-black font-semibold mb-1">Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your name"
                      className="w-full p-2 border-2 rounded-md"
                      type="text"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                  <label className="text-black font-semibold mb-1">Email</label>
                    <input
                      {...register("email", { required: "Name is required" })}
                      placeholder="Enter your Email"
                      className="w-full p-2 border-2 rounded-md"
                      type="text"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Mobile Number Input */}
                  <div className="">
                  <label className="text-black font-semibold mb-1">Number</label>
                    <input
                      {...register("mobile_no", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                      placeholder="Enter your mobile number"
                      className="w-full p-2 border-2 rounded-md"
                      type="tel"
                    />
                    {errors.mobile_no && (
                      <span className="text-red-500 text-sm">
                        {errors.mobile_no.message}
                      </span>
                    )}
                  </div>

                  {/* Profile Image Upload */}
                  <div className="mb-4">
                    <label className="text-black font-semibold mb-1">
                      Upload Profile Image
                    </label>
                    <input
                      {...register("image")}
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                    className="text-white text-md"
                  >
                    Close
                  </Button>
                  <Button
                    color="warning"
                    type="submit"
                    className="text-white text-md bg-yellow-500"
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
