export const locations = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Indiranagar", label: "Indiranagar, Bangalore" },
  { value: "Whitefield", label: "Whitefield, Bangalore" },
  { value: "Koramangala", label: "Koramangala, Bangalore" },
  { value: "MG Road", label: "MG Road, Bangalore" },
  { value: "HSR Layout", label: "HSR Layout, Bangalore" },
  { value: "Jayanagar", label: "Jayanagar, Bangalore" },
];
export const societies = [
  { value: "PrestigeLakeView", label: "Prestige Lake View, Bangalore" },
  { value: "BrigadeMeadows", label: "Brigade Meadows, Bangalore" },
  { value: "SobhaIndraprastha", label: "Sobha Indraprastha, Bangalore" },
  { value: "PurvaSkydale", label: "Purva Skydale, Bangalore" },
  { value: "EmbassyPristine", label: "Embassy Pristine, Bangalore" },
  {
    value: "GodrejWoodsmanEstate",
    label: "Godrej Woodsman Estate, Bangalore",
  },
  {
    value: "PrestigeShantiniketan",
    label: "Prestige Shantiniketan, Bangalore",
  },
  {
    value: "SalarpuriaSattvaMagnolia",
    label: "Salarpuria Sattva Magnolia, Bangalore",
  },
  { value: "BrigadeGateway", label: "Brigade Gateway, Bangalore" },
  { value: "MantriEspana", label: "Mantri Espana, Bangalore" },
];
export const propertyTypes = [
  { value: "Rent", label: "Rent" },
  { value: "Sale", label: "Sale" },
  { value: "Upcoming Projects", label: "Upcoming Projects" },
];
export const furnishTypes = [
  { value: "Fully Furnished", label: "Fully Furnished" },
  { value: "Semi Furnished", label: "Semi Furnished" },
  { value: "Unfurnished", label: "Unfurnished" },
];
export const propertySubfloor = [
  { value: "1", label: "Floor 1" },
  { value: "2", label: "Floor 2" },
  { value: "3", label: "Floor 3" },
  { value: "4", label: "Floor 4" },
];
export const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#E2E8F0",
    boxShadow: "none",
    padding: "0 4px",
    "&:hover": {
      borderColor: "#CBD5E0",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#2D3748",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A0AEC0",
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0 4px",
  }),
  indicatorSeparator: () => ({}),
};
export const filterPriceRange = [
  { value: "1000000", label: "Up to 1,000,000" },
  {
    value: "1000000 - 2000000",
    label: "1,000,000 - 2,000,000",
  },
  {
    value: "2000000 - 3000000",
    label: "2,000,000 - 3,000,000",
  },
  { value: "3000000", label: "3,000,000+" },
];
export const propertySubCat = [
  { value: "Apartment", label: "Apartment" },
  { value: "Villa", label: "Villa" },
  { value: "Independent Floor", label: "Independent Floor" },
  { value: "Independent House", label: "Independent House" },
];
export const propertycategory = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
];
export const bhkCategory = [
  { value: "1", label: "1BHK" },
  { value: "2", label: "2BHK" },
  { value: "3", label: "3BHK" },
  { value: "4", label: "4BHK" },
  { value: "5", label: "5BHK" },
  { value: "6", label: "6BHK" },
];

import {
  homeTheater,
  SwmmingPool,
  weightLifter,
  ElectricRange,
  EmergencyExit,
  FireAlarm,
  Heating,
  LaundaryRoom,
  Lawn,
  Mattress,
  Sink,
  Shutters,
  Stories,
  FirePlace,
  Wifi,
  Floor,
} from "../assets";

export const data = [
  {
    title: "Swimming Pool",
    k: "1",
    image: SwmmingPool,
    checked: false,
    disabled: false,
  },
  {
    title: "Home Theater",
    k: "2",
    image: homeTheater,
    checked: false,
    disabled: false,
  },
  {
    title: "Fire Alarm",
    k: "3",
    image: FireAlarm,
    checked: false,
    disabled: false,
  },
  {
    title: "Marble Floors",
    k: "4",
    image: Floor,
    checked: false,
    disabled: false,
  },
  // {
  //   title: "Electric Range",
  //   k: "5",
  //   image: ElectricRange,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Emergency Exit",
  //   k: "6",
  //   image: EmergencyExit,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Fire Alarm",
  //   k: "7",
  //   image: FireAlarm,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Fire Place",
  //   k: "8",
  //   image: FirePlace,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Hurricane Shutters",
  //   k: "9",
  //   image: Shutters,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Laundry Room",
  //   k: "10",
  //   image: LaundaryRoom,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Lawn",
  //   k: "11",
  //   image: Lawn,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Marble Floors",
  //   k: "12",
  //   image:Floor,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Swimming Pool",
  //   k: "13",
  //   image: SwmmingPool,
  //   checked: false,
  //   disabled: false,
  // },
  // {
  //   title: "Wifi",
  //   k: "14",
  //   image: Wifi,
  //   checked: false,
  //   disabled: false,
  // },
];

export const furnishOptions = [
  { value: "Unfurnished", label: "Unfurnished" },
  { value: "Semi Furnished", label: "Semi Furnished" },
  { value: "Fully Furnished", label: "Fully Furnished" },
];
