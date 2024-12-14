import { useEffect, useState } from "react";

export type InventoryList = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeName: string;
  isBorrowable: boolean;
};

export default function useInventory() {
  const [inventory, setInventory] = useState<InventoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  // Function to get all inventory list
  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory?page=${currentPage}&limit=10`,
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Not found!");
        }
        const json = await response.json();
        if (Array.isArray(json.data.inventory)) {
          setLoading(false);
          setInventory(json.data.inventory);
          setTotalPage(json.data.totalPageInventory);
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

    fetchTitle(page);
  }, [page]);

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
    page,
    totalPage,
    setPage,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    setInventory,
    loading,
    error,
  };
}
