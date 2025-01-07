import { useEffect, useState } from "react";
import { InventoryList } from "../inventoryList";

export default function useBorrowableInventory() {
  const [borrowableInventory, setBorrowableInventory] = useState<
    InventoryList[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [pageBorrowableInventory, setPageBorrowableInventory] = useState(1);
  const [totalPageBorrowableInventory, setTotalPageBorrowableInventory] =
    useState(0);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  // Function to get all borrowable inventory list
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
        if (Array.isArray(json.data.borrowableInventory)) {
          setLoading(false);
          setBorrowableInventory(json.data.borrowableInventory);
          setTotalPageBorrowableInventory(
            json.data.totalPageBorrowableInventory,
          );
        } else {
          setLoading(false);
          console.error(
            "Expected array borrowable inventory, got:",
            json.data.borrowableInventory,
          );
          setBorrowableInventory([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setBorrowableInventory([]);
      }
    }

    fetchTitle(pageBorrowableInventory);
  }, [pageBorrowableInventory]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory?search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      const json = await response.json();
      setBorrowableInventory(json.data.borrowableInventory); // Assuming the response has an `inventory` array
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return {
    handleSearch,
    borrowableInventory,
    pageBorrowableInventory,
    totalPageBorrowableInventory,
    setPageBorrowableInventory,
    setBorrowableInventory,
    loading,
    error,
  };
}
