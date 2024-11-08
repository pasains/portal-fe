import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type InventoryGroup = {
  id: number;
  inventoryGroupName: string;
  description: string;
};

export type InventoryGroupDetail = {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryGroupDetail[]>(
    [],
  );
  const [inventoryGroupDetail, setInventoryGroupDetail] =
    useState<InventoryGroup>({} as InventoryGroup);
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  console.log(`SELECTED_INVENTORY_GROUP_DETAIL_ID`, id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const inventoryGroupResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup/${id}`,
        );

        if (!inventoryGroupResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: inventoryGroupData } =
          await inventoryGroupResponse.json();
        console.log("Inventory_Group_Data", inventoryGroupData);
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
    const fetchItemData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Inventory Group Id:`, id);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory?inventoryGroupId=${id}`,
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
    inventoryGroupDetail,
    loading,
    error,
  };
}
