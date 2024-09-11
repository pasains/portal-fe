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

  const updateInventory = async (id: any, formData: any) => {
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
          body: JSON.stringify(formData),
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
      console.log("Updated data:", data);
      setInvenntoryUpdate(data);
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { id, inventoryUpdate, success, updateInventory, loading, error };
}
