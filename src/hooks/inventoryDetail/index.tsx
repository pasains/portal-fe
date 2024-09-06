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

export function GetInventoryDetail() {
  const { id } = useParams<Params>();
  const [inventoryDetail, setInventoryDetail] = useState<InventoryListDetail>(
    {} as InventoryListDetail,
  );

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory/${id}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        console.log("Fetched Data:", data);
        setInventoryDetail(data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
    return () => {};
  }, [id]);
  return { inventoryDetail };
}
