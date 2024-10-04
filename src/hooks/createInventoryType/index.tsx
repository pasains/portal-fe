import { useState } from "react";

export type InventoryTypeList = {
  id: number;
  inventoryTypeName: string;
  description: string;
};

export default function useCreateInventoryType() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const createInventoryType = async (inventoryTypeData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      console.log("SUSI 1 " + JSON.stringify(inventoryTypeData));
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventoryTypeData),
        },
      );
      const data = await response.json();
      console.log("SUSI + ", JSON.stringify(data.meta.message));
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
      setError("Failed to create inventory type");
    } finally {
      setLoading(false);
    }
  };

  return {
    createInventoryType,
    success,
    loading,
    error,
  };
}
