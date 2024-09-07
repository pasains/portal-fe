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

export default function GetInventory() {
  const [inventory, setInventory] = useState<InventoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  // Function to gey all inventory list
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

  const createInventory = async (formData: any) => {
    console.log("SUSI WAS HERE");
    setLoading(true);
    setError(null);
    try {
      console.log("SUSI 1 " + JSON.stringify(formData));
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventory/createinventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to create inventory");
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError("Failed to create inventory");
      throw err;
    }
  };

  return {
    inventory,
    createInventory,
    loading,
    error,
  };
}
