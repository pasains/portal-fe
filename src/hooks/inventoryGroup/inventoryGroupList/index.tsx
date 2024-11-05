import { useEffect, useState } from "react";

export type InventoryGroupProps = {
  inventoryId: number;
  inventoryTypeId: string;
};

type InventoryGroupResponse = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: InventoryGroupProps[];
};

export default function useInventoryGroup() {
  const [inventoryGroup, setInventoryGroup] = useState<InventoryGroupProps[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/inventorygroup`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: InventoryGroupResponse) => {
          for (let i = 0; i < json.data.length; i++) {
            console.log("INVENTARY GROUP" + i + ": " + json.data[i]);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setInventoryGroup(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setInventoryGroup([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setInventoryGroup([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);

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
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      }
      console.log(result);
      setInventoryGroup((item) =>
        item.filter((item) => item.inventoryId !== id),
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
    deleteInventoryGroup(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    inventoryGroup,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
  };
}
