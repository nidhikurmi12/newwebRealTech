import { useEffect, useState } from "react";
import Request from "../lib/axios";
import api from "../config/api.conf";

export default function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await Request.get(api.getProperties);
        setProperties(response.data.properties.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Error fetching properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
  };
}