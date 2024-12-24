import { useEffect, useState } from "react";

export type InventoryGroupProps = {
  id: number;
  inventoryGroupName: string;
  description: string;
};

export default function useInventoryGroup() {
  const [inventoryGroup, setInventoryGroup] = useState<InventoryGroupProps[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    setLoading(true);
    setError(null);
    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup?page=${currentPage}&limit=10`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Not Found.");
        }
        const json = await response.json();
        if (Array.isArray(json.data.inventoryGroup)) {
          setLoading(false);
          setInventoryGroup(json.data.inventoryGroup);
          setTotalPage(json.data.totalPage);
        } else {
          setLoading(false);
          console.error(
            "Expected array inventory group, got:",
            json.data.inventorygroup,
          );
          setInventoryGroup([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setInventoryGroup([]);
      }
    }

    fetchTitle(page);
  }, [page]);

  const deleteInventoryGroup = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "aplication/json",
            authorization: `${token}`,
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      } else {
        console.log(`Deleted inventory group:`, result);
        setInventoryGroup((item) => item.filter((item) => item.id !== id));
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
      deleteInventoryGroup(deleteId);
    }
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    inventoryGroup,
    page,
    totalPage,
    setPage,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
    success,
  };
}
