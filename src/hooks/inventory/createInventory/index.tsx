import { useState } from "react";

export default function useCreateInventory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const createInventory = async (inventoryData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      console.log("CREATE_INVENTORY" + JSON.stringify(inventoryData));
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(inventoryData),
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
      setError("Failed to create inventory");
    } finally {
      setLoading(false);
    }
  };

  return {
    createInventory,
    success,
    loading,
    error,
  };
}
