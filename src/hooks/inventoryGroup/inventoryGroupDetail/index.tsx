import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { InventoryGroupProps } from "../inventoryGroupList";

export type InventoryGroupDetailProps = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  isBorrowable: boolean;
  inventoryTypeName: string;
  inventoryGroupName: string;
};

type Params = {
  id: string;
};

export function useInventoryGroupDetail() {
  const { id } = useParams<Params>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inventoryItems, setInventoryItems] = useState<
    InventoryGroupDetailProps[]
  >([]);
  const [inventoryGroupDetail, setInventoryGroupDetail] =
    useState<InventoryGroupProps>({} as InventoryGroupProps);
  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const inventoryGroupResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        if (!inventoryGroupResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: inventoryGroupData } =
          await inventoryGroupResponse.json();
        setInventoryGroupDetail(inventoryGroupData);
      } catch (err) {
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Fetch inventory items based on selected inventory group
    const fetchItemData = async (currentPage: number) => {
      setLoading(true);
      setError(null);
      console.log(`Inventory Group Id:`, id);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryGroupId=${id}&page=${currentPage}&limit=10`,
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
      } catch (err: any) {
        setError(`Fetching error: ${err} `);
        setInventoryItems([]);
      }
    };
    fetchItemData(page);
  }, [id, page]);

  //Download list data to xlsx
  const handleDownload = async () => {
    const response = await fetch(
      `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryGroupId${id}`,
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
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryGroupId${id}&search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      const json = await response.json();
      setInventoryItems(json.data.inventory); // Assuming the response has an `inventory` array
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };


  return {
    id,
    page,
    totalPage,
    handleSearch,
    handleDownload,
    setPage,
    inventoryItems,
    inventoryGroupDetail,
    loading,
    error,
  };
}
