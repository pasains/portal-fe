import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type InventoryTypeList = {
  id: number;
  inventoryTypeName: string;
  description: string;
};

type InventoryTypeResponse = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: InventoryTypeList[];
};

export default function useInventoryType() {
  const [inventoryType, setInventoryType] = useState<InventoryTypeList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  // Fetch all inventory type
  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/inventorytype`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: InventoryTypeResponse) => {
          console.log("INVENTORY_TYPE_DATA_LENGTH: " + json.data.length);
          for (let i = 0; i < json.data.length; i++) {
            console.log("INVENTORY_TYPE_ID_" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setInventoryType(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setInventoryType([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setInventoryType([]);
        });
    }

    fetchTitle();
    return () => {};
  }, []);

  const deleteInventoryType = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "aplication/json",
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      }
      console.log("Delete item", result);
      setInventoryType((inventoryType) =>
        inventoryType.filter((item) => item.id !== id),
      );
    } catch (error: any) {
      setError(`Deleting error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: any) => {
    setOpenAlert(true);
    setDeletId(id);
  };

  const handleConfirmDelete = () => {
    deleteInventoryType(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    inventoryType,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    setInventoryType,
    loading,
    error,
  };
}
