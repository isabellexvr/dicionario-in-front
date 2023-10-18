import { useState, useEffect } from "react";

export default function useAsync(apiHook, moment = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(moment);
  const [error, setError] = useState(null);

  const connect = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiHook(...args);
      setData(data);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (moment) {
      connect();
    }
  }, []);

  return {
    data,
    loading,
    error,
    connect
  };
}
