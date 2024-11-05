import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

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
  inventoryTypeId: number;
  inventoryTypeName: string;
  isBorrowable: boolean;
};

type Params = {
  id: string;
};

export function useInventoryTypeDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryTypeDetail[]>(
    [],
  );
  const [inventoryTypeDetail, setInventoryTypeDetail] = useState<InventoryType>(
    {} as InventoryType,
  );
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  console.log(`SELECTED_INVENTORY_TYPE_DETAIL_ID`, id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const inventoryTypeResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/${id}`,
        );

        if (!inventoryTypeResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: inventoryTypeData } = await inventoryTypeResponse.json();
        console.log("JAmpes", inventoryTypeData);
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
    const fetchItemData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Inventory Type Id:`, id);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryTypeId=${id}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data_:", data);
        setInventoryItems(data);
      } catch (err) {
        setLoading(false);
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchItemData();
    return () => {};
  }, [id]);

  return {
    id,
    inventoryItems,
    inventoryTypeDetail,
    loading,
    error,
  };
}
