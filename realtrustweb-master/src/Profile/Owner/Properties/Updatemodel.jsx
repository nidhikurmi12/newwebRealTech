import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { customStyles, data as feature } from "../../../constant";
import Request from "../../../lib/axios";
import { accessTokenFromLocalStorageOfOwner } from "../../../helper";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { LocalityandSociety } from "../../../contexts/postProperty";
export const Updatemodel = ({ propertyItem, isOpen, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, reset, setValue } = useForm({});
  const [featureslist, setfeatureslist] = useState([]);
  const { locality, society } = useContext(LocalityandSociety);
  const selectedFeatures = propertyItem.features.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  useEffect(() => {
    reset(propertyItem);
    setfeatureslist(selectedFeatures);
  }, []);

  const handleSelectChange = (e) => {
    setfeatureslist(e);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await Request.post(
        `/owner/properties/${property.unique_id}`,
        formData,
        {
          headers: {
            Authorization: accessTokenFromLocalStorageOfOwner(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        
      >
        <ModalContent className="bg-white fixed h-[98vh] overflow-y-auto overflow-x-hidden rounded-lg shadow-lg max-w-lg mx-auto lg:overflow-hidden">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold pt-2 pb-0">
                Update Property
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  {step === 1 && (
                    <>
                      <div className="flex flex-col mt-2">
                        <label className="font-medium mb-1">Property Name</label>
                        <input
                          {...register("title")}
                          required
                          className="border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium mb-1">Society Name</label>

                        <select
                          type="text"
                          id="society_name"
                          {...register("society_name", {
                            required: "society_name is required",
                          })}
                          className="border border-gray-300 rounded-md p-2"
                        >
                          {society.map((e) => (
                            <option value={e.name}>{e.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Purpose</label>

                          <select
                            type="text"
                            id="purpose"
                            {...register("purpose", {
                              required: "Purpose is required",
                            })}
                            className="border border-gray-300 rounded-md p-2"
                          >
                            <option value="Rent">Rent</option>
                            <option value="Sell">Sell</option>
                            <option value="upcoming_projects">
                              Upcoming projects
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col  w-full">
                          <label className="font-medium mb-1">City</label>
                          <input
                            {...register("city")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Type</label>
                          <select
                            type="text"
                            id="type"
                            {...register("type", {
                              required: "Type is required",
                            })}
                            className="border border-gray-300 rounded-md p-2"
                          >
                            <option value="apartment">Apartment</option>
                            <option value="villa">villa</option>
                            <option value="Independent Floor">
                              Independent Floor
                            </option>
                            <option value=" Independent House">
                              {" "}
                              Independent House
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col  w-full">
                          <label className="font-medium mb-1">Locality</label>

                          <select
                            type="text"
                            id="locality"
                            {...register("locality", {
                              required: "locality is required",
                            })}
                            className="border border-gray-300 rounded-md p-2"
                          >
                            {locality.map((e) => (
                              <option value={e.name}>{e.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">BHK</label>

                          <select
                            type="text"
                            id="bhk"
                            {...register("bhk", {
                              required: "Bhk is required",
                            })}
                            className="border border-gray-300 rounded-md p-2"
                          >
                            {Array.from({ length: 3 }).map((e, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Area</label>
                          <input
                            type="number"
                            {...register("area")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="flex flex-col">
                        <label className="font-medium">Description</label>
                        <textarea
                          {...register("description")}
                          required
                          className="border border-gray-300 rounded-md p-2 h-20"
                        ></textarea>
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Price</label>
                        <input
                          type="number"
                          {...register("price")}
                          required
                          className="border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium">Latitude</label>
                          <input
                            type="number"
                            step="any"
                            {...register("latitude")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium">Longitude</label>
                          <input
                            type="number"
                            step="any"
                            {...register("longitude")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Gallery Images</label>
                        <input
                          type="file"
                          multiple
                          {...register("gallaryimage")}
                          className="border border-gray-300 rounded-md p-2"
                        />
                        <div className="flex overflow-x-auto">
                          {propertyItem.gallery.map((e, i) => (
                            <>
                              <div className="relative">
                                <img
                                  src={e.image_url}
                                  alt="Err"
                                  className=" h-[100px] w-[120px] object-cover p-2"
                                />
                                <p className="absolute top-1 right-1 text-2xl cursor-pointer">
                                  <IoMdClose />
                                </p>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-medium">Floor Plan</label>
                        <input
                          type="file"
                          multiple
                          {...register("floor_plan")}
                          className="border border-gray-300 rounded-md p-2"
                        />
                        {/* {propertyItem.floor_plan && (
                              <>
                                <div className="relative">
                                  <img
                                    src={propertyItem.floor_plan}
                                    alt="Err"
                                    className=" h-[100px] w-[120px] object-cover p-2"
                                  />
                                  <p className="absolute top-1 right-1 text-2xl cursor-pointer">
                                    <IoMdClose />
                                  </p>
                                </div>
                              </>
                            )} */}
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Furnish Type</label>

                          <select
                            type="text"
                            id="furnish_type"
                            {...register("furnish_type", {
                              required: "furnish type is required",
                            })}
                            className="border border-gray-300 rounded-md p-2"
                          >
                            <option value="Unfurnished">Unfurnished</option>
                            <option value="Semi Furnished">
                              Semi Furnished
                            </option>
                            <option value="Fully Furnished">
                              Fully Furnished
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Available For</label>
                          <input
                            type="date"
                            step="any"
                            {...register("available_for")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Deposit</label>
                          <input
                            type="number"
                            step="any"
                            {...register("deposit")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Monthly Rent</label>
                          <input
                            type="number"
                            step="any"
                            {...register("monthly_rent")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">maintenance</label>
                          <input
                            type="number"
                            step="any"
                            {...register("maintenance")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Tenant Type</label>
                          <select
                            type="text"
                            id="tenant_type"
                            {...register("tenant_type", {
                              required: "Tenant type is required",
                            })}
                            className="border border-gray-300 rounded-md p-2"
                          >
                            <option value="family">Family</option>
                            <option value="bachelor">Bachelor</option>
                            <option value="any">Any</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Bathroom</label>
                          <input
                            type="number"
                            step="any"
                            {...register("bathroom")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Balcony</label>
                          <input
                            type="number"
                            step="any"
                            {...register("balcony")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 lg:flex-row flex-col">
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Bedroom</label>
                          <input
                            type="number"
                            step="any"
                            {...register("bedroom")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="font-medium mb-1">Year</label>
                          <input
                            type="number"
                            step="any"
                            {...register("age")}
                            required
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="font-medium mb-1">Features</label>

                        <div>
                          <Select
                            isMulti
                            options={feature.map((e) => ({
                              value: e.k,
                              label: e.title,
                            }))}
                            value={featureslist}
                            onChange={handleSelectChange}
                            classNamePrefix="select"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                padding: "0px 6px",
                                cursor: "pointer",
                                borderColor: "#ccc",
                                transition:
                                  "border-color 0.3s, box-shadow 0.3s",
                              }),
                            }}
                          />
                        </div>
                        <div>
                          <Select
                            isMulti
                            options={feature.map((e) => ({
                              value: e.k,
                              label: e.title,
                            }))}
                            value={featureslist}
                            onChange={handleSelectChange}
                            classNamePrefix="select"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                padding: "0px 6px",
                                cursor: "pointer",
                                borderColor: "#ccc",
                                transition:
                                  "border-color 0.3s, box-shadow 0.3s",
                              }),
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="mt-2 flex justify-between">
                    {step > 1 && (
                      <Button
                        onClick={() => setStep(step - 1)}
                        className="bg-gray-500 text-white p-2 rounded-md"
                      >
                        Back
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button
                        onClick={() => setStep(step + 1)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
