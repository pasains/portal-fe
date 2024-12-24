import { useState } from "react";

export type LoginData = {
  id: number;
  email: string;
  password: string;
};

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const userLogin = async (loginData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/authentication/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(data.meta.message);
      } else {
        localStorage.setItem("access_token", data.meta.access_token);
        console.log(data.meta.access_token);
        setSuccess(data.meta.message);
      }
    } catch (err) {
      setError("Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return {
    userLogin,
    success,
    loading,
    error,
  };
}
