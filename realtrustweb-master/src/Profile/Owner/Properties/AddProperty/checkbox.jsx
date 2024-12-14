import React, { useState } from "react";
import { homeTheater } from "../../../../assets";

const data = [
  {
    title: "Home Theater",
    k: "1",
    image: homeTheater,
    checked: false,
    disabled: false,
  },
  {
    title: "2 Stories",
    k: "2",
    image: "https://i.ibb.co/cXjw2Gz/category-b.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Central Heating",
    k: "3",
    description: "Large goods vehicle",
    image: "https://i.ibb.co/nDbfH9B/category-c.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Dual Sinks",
    k: "4",
    description: "Buses",
    image: "https://i.ibb.co/7gSQMmm/category-d.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Electric Range",
    k: "5",
    description: "Tractors and SMV",
    image: "https://i.ibb.co/0F3SdsX/category-t.png", // Image for Electric Range
    checked: false,
    disabled: false,
  },
  {
    title: "Emergency Exit",
    k: "6",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Emergency Exit
    checked: false,
    disabled: false,
  },
  {
    title: "Fire Alarm",
    k: "7",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Fire Alarm
    checked: false,
    disabled: false,
  },
  {
    title: "Fire Place",
    k: "8",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Fire Place
    checked: false,
    disabled: false,
  },
  {
    title: "Hurricane Shutters",
    k: "9",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Hurricane Shutters
    checked: false,
    disabled: false,
  },
  {
    title: "Laundry Room",
    k: "10",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Laundry Room
    checked: false,
    disabled: false,
  },
  {
    title: "Lawn",
    k: "11",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Lawn
    checked: false,
    disabled: false,
  },
  {
    title: "Marble Floors",
    k: "12",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Marble Floors
    checked: false,
    disabled: false,
  },
  {
    title: "Swimming Pool",
    k: "13",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Swimming Pool
    checked: false,
    disabled: false,
  },
  {
    title: "Wifi",
    k: "14",
    image: "https://i.ibb.co/7gSQMmm/category-d.png", // Image for Wifi
    checked: false,
    disabled: false,
  },
];

const CardGrid = () => {
  const [items, setItems] = useState(data);

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  return (
    <div className=" flex flex-col items-center">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-h-[15vh] overflow-y-auto overflow-x-hidden  px-7">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-48 h-48 p-4 cursor-pointer ${
              item.disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 transition-transform"
            }`}
            onClick={() => !item.disabled && handleCheckboxChange(index)}
          >
            <input
              id={`checkbox-${index}`}
              type="checkbox"
              className="absolute w-0 h-0 opacity-0"
              checked={item.checked}
              disabled={item.disabled}
              onChange={() => {}}
            />
            <label
              htmlFor={`checkbox-${index}`}
              className="relative w-full h-full flex flex-col items-center"
            >
              <div className="relative w-full h-32 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-f object-cover transition-transform ${
                    item.checked ? "grayscale-0" : "grayscale"
                  }`}
                />
                {item.checked && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
