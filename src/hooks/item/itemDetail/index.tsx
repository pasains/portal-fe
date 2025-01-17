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
  description: string;
  inventoryTypeId: number;
  inventoryTypeName: string;
  inventoryGroupId: number;
  inventoryGroupName: string;
  borrowingId: number;
  status: StatusItem;
  statusBorrowing: Status;
  quantity: number;
  preCondition: string;
  postCondition: string | "";
};

type Params = {
  id: string;
};

export function useItemDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Items[]>([]);
  const [borrowingDetail, setBorrowingDetail] = useState<BorrowingProps>(
    {} as BorrowingProps,
  );
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrowing/${id}`,
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

  const fetchItemData = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/item?borrowingId=${id}&page=${currentPage}&limit=10`,
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
      const json = await response.json();
      if (Array.isArray(json.data.item)) {
        setLoading(false);
        console.log("Fetched items data that borrowing:", json.data.item);
        setItem(json.data.item);
        setTotalPage(json.data.totalPage);
      } else {
        setLoading(false);
        setError(`Fetching error: ${error} `);
        setItem([]);
      }
    } catch (error: any) {
      setError(`Fetch error: ${error}`);
      setItem([]);
    }
  };
  useEffect(() => {
    fetchData();
    fetchItemData(page);
  }, [id]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/item?borrowingId=${id}&search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      const json = await response.json();
      setItem(json.data.item); // Assuming the response has an `inventory` array
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return {
    id,
    item,
    setItem,
    page,
    handleSearch,
    totalPage,
    setPage,
    refreshData: fetchData,
    setBorrowingDetail,
    borrowingDetail,
    loading,
    error,
  };
}
