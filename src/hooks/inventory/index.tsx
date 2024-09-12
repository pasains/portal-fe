import { useEffect, useState } from "react";

export type InventoryList = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeName: string;
  isBorrowable: boolean;
};

type InventoryRes = {
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
  const [success, setSuccess] = useState<string | null>(null);

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
        .then((json: InventoryRes) => {
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

  const createInventory = async (inventoryData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      console.log("SUSI 1 " + JSON.stringify(inventoryData));
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventoryData),
        },
      );
      const data = await response.json();
      console.log("SUSI + ", JSON.stringify(data.meta.message));
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(data.meta.message);
      } else {
        setSuccess(data.meta.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to create inventory");
    } finally {
      setLoading(false);
    }
  };

  return {
    inventory,
    createInventory,
    success,
    loading,
    error,
  };
}
