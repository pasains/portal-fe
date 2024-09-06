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

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
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
            setInventory(json.data);
          } else {
            console.error("Expected array, got:", json.data);
            setInventory([]);
          }
        })
        .catch((error: any) => {
          console.log("Fetch error:", error);
          setInventory([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);

  const createInventory = () => {
    fetch(`${REACT_APP_PORTAL_BE_URL}/api/inventory/?createinventory`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not Found");
        }
        return response.json();
      })
      .then((json) => setInventory(json));
  };
  return {
    inventory,
    createInventory,
  };
}
