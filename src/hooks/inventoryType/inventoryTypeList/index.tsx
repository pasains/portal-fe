import { useEffect, useState } from "react";

export type InventoryTypeList = {
  id: number;
  inventoryTypeName: string;
  description: string;
};

export default function useInventoryType() {
  const [inventoryType, setInventoryType] = useState<InventoryTypeList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  // Fetch all inventory type
  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorytype?page=${currentPage}&limit=10`,
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
        if (Array.isArray(json.data.inventoryType)) {
          setLoading(false);
          setInventoryType(json.data.inventoryType);
          setTotalPage(json.data.totalPage);
        } else {
          setLoading(false);
          console.error("Expected array inventory type, got:", json.data);
          setInventoryType([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setInventoryType([]);
      }
    }
    fetchTitle(page);
  }, [page]);

  const deleteInventoryType = async (id: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/delete/${id}`,
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
        setInventoryType((inventoryType) =>
          inventoryType.filter((item) => item.id !== id),
        );
        setSuccess(result.meta.message);
        console.log("Delete inventory type:", result.meta.message);
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
      deleteInventoryType(deleteId);
    }
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    inventoryType,
    openAlert,
    page,
    totalPage,
    setPage,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    setInventoryType,
    loading,
    error,
    success,
  };
}
