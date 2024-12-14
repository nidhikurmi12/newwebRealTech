import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GetAllPropertiesFromApiProvider from "./contexts/useProperties.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import ProfileContextProvider from "./contexts/profileContext.jsx";
import LocalityandSocietyProvider from "./contexts/postProperty.jsx";

createRoot(document.getElementById("root")).render(
  <LocalityandSocietyProvider>
    <GetAllPropertiesFromApiProvider>
      <ProfileContextProvider>
        <NextUIProvider>
          <App />
          <ToastContainer />
        </NextUIProvider>
      </ProfileContextProvider>
    </GetAllPropertiesFromApiProvider>
  </LocalityandSocietyProvider>
);
