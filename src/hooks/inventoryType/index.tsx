import { useEffect, useState } from "react";

export type InventoryTypeList = {
  id: number;
  inventoryTypeName: string;
  description: string;
};

type InventoryTypeRes = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: InventoryTypeList[];
};

export default function useInventory() {
  const [inventoryType, setInventoryType] = useState<InventoryTypeList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/inventorytype`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: InventoryTypeRes) => {
          console.log("INVENTORY: " + json.data.length);
          for (let i = 0; i < json.data.length; i++) {
            console.log("INVENTORY_" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setInventoryType(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setInventoryType([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setInventoryType([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);


  return {
    inventoryType,
    loading,
    error,
  };
}
