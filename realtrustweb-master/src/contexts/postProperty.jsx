import Request from "../lib/axios";
import { createContext, useState, useEffect, useMemo } from "react";

export const LocalityandSociety = createContext({});

const LocalityandSocietyProvider = ({ children }) => {
  const [locality, setLocality] = useState([]);
  const [society, setSociety] = useState([]);
  const [features, Setfeatures] = useState([]);

  const getLocality = async () => {
    try {
      const res = await Request.get("/locality");
      setLocality(res.data.locality);
    } catch (error) {
      console.error("Failed to fetch locality data:", error);
      setLocality([]);
    }
  };

  const getSociety = async () => {
    try {
      const res = await Request.get("/socity");
      setSociety(res.data.socity);
    } catch (error) {
      console.error("Failed to fetch society data:", error);
      setSociety([]);
    }
  };

  const getFeatures = async () => {
    try {
      const res = await Request.get("/features");
      Setfeatures(res.data.sliders);
    } catch (error) {
      console.error("Failed to fetch locality data:", error);
      setLocality([]);
    }
  };

  useEffect(() => {
    getLocality();
    getSociety();
    getFeatures();
  }, []);
  const contextValue = useMemo(
    () => ({ locality, society,features }),
    [locality, society,features]
  );

  return (
    <LocalityandSociety.Provider value={contextValue}>
      {children}
    </LocalityandSociety.Provider>
  );
};

export default LocalityandSocietyProvider;
