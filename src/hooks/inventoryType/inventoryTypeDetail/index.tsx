import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";

export type InventoryType = {
  id: number;
  inventoryTypeName: string;
  description: string;
};

export type InventoryTypeDetail = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeIdRel: InventoryType;
  inventoryTypeId: number;
  inventoryTypeName: string;
  isBorrowable: boolean;
};

type Params = {
  id: string;
};

export function useInventoryTypeDetail() {
  const { id } = useParams<Params>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryTypeDetail[]>(
    [],
  );
  const [inventoryTypeDetail, setInventoryTypeDetail] = useState<InventoryType>(
    {} as InventoryType,
  );

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const inventoryTypeResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        if (!inventoryTypeResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: inventoryTypeData } = await inventoryTypeResponse.json();
        setInventoryTypeDetail(inventoryTypeData);
      } catch (err) {
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Fetch inventory items based on selected inventory type
    const fetchItemData = async (currentPage: number) => {
      setLoading(true);
      setError(null);
      console.log(`Inventory Type Id:`, id);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryTypeId=${id}i&page=${currentPage}&limit=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        if (Array.isArray(json.data.inventory)) {
          setLoading(false);
          setInventoryItems(json.data.inventory);
          setTotalPage(json.data.totalPageInventory);
        } else {
          setLoading(false);
          setInventoryItems([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setInventoryItems([]);
      }
    };
    fetchItemData(page);
  }, [id, page]);

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
        console.log(`Deleted inventory from inventory type:`, result);
        setInventoryItems((inventory) =>
          inventory.filter((item) => item.id !== id),
        );
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

  //Download list data to xlsx
  const handleDownload = async () => {
    const response = await fetch(
      `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryTypeId${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );
    const json = await response.json();
    const data = json.data.inventory;
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "inventory.xlsx");
  };

  return {
    id,
    page,
    totalPage,
    setPage,
    handleDownload,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    openAlert,
    inventoryItems,
    inventoryTypeDetail,
    loading,
    error,
    success,
  };
}
