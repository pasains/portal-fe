import { useState } from "react";

export type User = {
  id: number;
  email: string;
  password: string;
};

export default function useUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  const user = async (userData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(`${REACT_APP_PORTAL_BE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(userData),
      });
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
      setError("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    success,
    loading,
    error,
  };
}
