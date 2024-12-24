import { useState } from "react";

export default function useCreateBorrower() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const createBorrower = async (borrowerData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      console.log("SUSI 1 " + JSON.stringify(borrowerData));
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrower/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(borrowerData),
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
      setError("Failed to create borrower.");
    } finally {
      setLoading(false);
    }
  };

  return {
    createBorrower,
    success,
    loading,
    error,
  };
}
