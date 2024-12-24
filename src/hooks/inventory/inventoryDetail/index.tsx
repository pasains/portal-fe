import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type InventoryListDetail = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeId: number;
  inventoryTypeName: string;
  isBorrowable: boolean;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  currentQuantity: number;
  totalQuantity: number;
};

type Params = {
  id: string;
};

export function useInventoryDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inventoryDetail, setInventoryDetail] = useState<InventoryListDetail>(
    {} as InventoryListDetail,
  );

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data Inventory Detail:", data);
        setInventoryDetail(data);
      } catch (err) {
        setLoading(false);
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { id, inventoryDetail, loading, error };
}
