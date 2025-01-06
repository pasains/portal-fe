import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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

  //Download list data to xlsx
  const handleDownload = async () => {
    const response = await fetch(
      `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );
    const json = await response.json();
    const data = json.data.inventoryGroup;
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Group");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "inventoryGroup_list.xlsx");
  };
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup?search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      const json = await response.json();
      setInventoryGroup(json.data.inventorygroup); // Assuming the response has an `inventory` array
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return {
    inventoryGroup,
    page,
    totalPage,
    handleDownload,
    setPage,
    openAlert,
    handleSearch,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
    success,
  };
}
