import { useState } from "react";

export default function useCreateBorrowing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const createBorrowing = async (borrowingData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrowing/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(borrowingData),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(data.meta.message);
      } else {
        setSuccess(data.meta.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to create borrowing");
    } finally {
      setLoading(false);
    }
  };

  return {
    createBorrowing,
    success,
    loading,
    error,
  };
}
