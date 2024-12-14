import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BorrowingProps, Status } from "../../borrowing/borrowingList";

export enum StatusItem {
  "IN" = "IN",
  "OUT" = "OUT",
}

export type Items = {
  id: number;
  inventoryId: number;
  inventoryName: string;
  refId: string;
  inventoryTypeId: number;
  inventoryTypeName: string;
  borrowingId: number;
  status: StatusItem;
  statusBorrowing: Status;
  quantity: number;
  preCondition: string;
  postCondition: string;
};

type Params = {
  id: string;
};

export function useItemDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Items[]>([]);
  const [borrowingDetail, setBorrowingDetail] = useState<BorrowingProps>(
    {} as BorrowingProps,
  );
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrowing/${id}`,
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      setLoading(false);
      console.log("Fetched data borrower detail:", data);
      setBorrowingDetail(data);
    } catch (err) {
      setLoading(false);
      setError(`Fetching error: ${err}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchItemData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/item?borrowingId=${id}`,
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      setLoading(false);
      console.log("Fetched items data that borrowing:", data);
      setItem(data);
    } catch (err) {
      setLoading(false);
      setError(`Fetching error: ${err} `);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchItemData();
  }, [id]);

  return {
    id,
    item,
    setItem,
    refreshData: fetchData,
    setBorrowingDetail,
    borrowingDetail,
    loading,
    error,
  };
}
