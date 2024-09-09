import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type InventoryListDetail = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeName: string;
  isBorrowable: boolean;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  quantity: number;
};

export function useInventoryUpdate() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [inventoryUpdate, setInvenntoryUpdate] = useState<InventoryListDetail>(
    {} as InventoryListDetail,
  );

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const updateDataById = async (id: string, updatedData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory/updateinventory/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const result = await response.json();
      console.log("Updated data:", result);
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setInvenntoryUpdate(result.data);
      } else {
        setSuccess(result.meta.message)
        setLoading(false)
      }
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
      throw error;
    } finally {
      setLoading(true);
    }
  };

  return { id, inventoryUpdate, updateDataById, loading, error };
}
