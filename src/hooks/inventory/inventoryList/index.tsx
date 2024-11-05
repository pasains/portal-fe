import { useEffect, useState } from "react";

export type InventoryList = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeName: string;
  isBorrowable: boolean;
};

type InventoryResponse = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: InventoryList[];
};

export default function useInventory() {
  const [inventory, setInventory] = useState<InventoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  // Function to get all inventory list
  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/inventory`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: InventoryResponse) => {
          console.log("INVENTORY: " + json.data.length);
          for (let i = 0; i < json.data.length; i++) {
            console.log("INVENTORY_" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setInventory(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setInventory([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setInventory([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);

  const deleteInventory = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory/delete/${id}`,
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
      setInventory((inventory) => inventory.filter((item) => item.id !== id));
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
    deleteInventory(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    inventory,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    setInventory,
    loading,
    error,
  };
}
