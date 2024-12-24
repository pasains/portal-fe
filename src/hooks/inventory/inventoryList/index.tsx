import { useEffect, useState } from "react";

type InventoryStockIdRel = {
  currentQuantity: number;
  totalQuantity: number;
};
type InventoryTypeIdRel = {
  inventoryTypeName: string;
};

export type InventoryListDetailProps = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeIdRel: InventoryTypeIdRel;
  inventoryTypeName: string;
  inventoryStockIdRel: InventoryStockIdRel[] | undefined;
  currentQuantity: number;
  totalQuantity: number;
  isBorrowable: boolean;
};

export type InventoryList = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeName: string;
  isBorrowable: boolean;
};

export default function useInventory() {
  const [inventory, setInventory] = useState<InventoryListDetailProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInventory, setPageInventory] = useState(1);
  const [totalPageInventory, setTotalPageInventory] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  // Function to get all inventory list
  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory?page=${currentPage}&limit=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Not found!");
        }
        const json = await response.json();
        if (Array.isArray(json.data.inventory)) {
          setLoading(false);
          setInventory(json.data.inventory);
          setTotalPageInventory(json.data.totalPageInventory);
        } else {
          setLoading(false);
          console.error("Expected array inventory, got:", json.data.inventory);
          setInventory([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setInventory([]);
      }
    }

    fetchTitle(pageInventory);
  }, [pageInventory]);

  const deleteInventory = async (id: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      } else {
        console.log(`Deleted inventory:`, result);
        setInventory((inventory) => inventory.filter((item) => item.id !== id));
        setSuccess(result.meta.message);
      }
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
    if (deleteId !== null) {
      deleteInventory(deleteId);
    }
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    inventory,
    openAlert,
    pageInventory,
    totalPageInventory,
    setPageInventory,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    setInventory,
    loading,
    error,
    success,
  };
}
