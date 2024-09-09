import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type InventoryListDetail = {
  id: number;
  inventoryName: string;
  refId: string;
  description: string;
  inventoryTypeName: string;
  isBorrowable: boolean;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  quantity: number;
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory/${id}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data:", data);
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
    return () => {};
  }, [id]);

  return { id, inventoryDetail, loading, error };
}
