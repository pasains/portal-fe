import { useEffect, useState } from "react";
import { Status } from "../../borrowing/borrowingList";
import { Params, useParams } from "react-router-dom";

export type InventoryByBorrowingList = {
  id: number;
  borrowerName: string;
  organizationName: string;
  address: string;
  status: Status;
  createdAt: Date;
  invoiceNumber: string;
};

export default function useInventoryByBorrowing() {
  const { id } = useParams<Params>();
  const [inventory, setInventory] = useState<InventoryByBorrowingList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  // Fetch all inventory type
  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventory/history/${id}?page=${currentPage}&limit=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Not found!");
        }
        const json = await response.json();
        if (Array.isArray(json.data.data)) {
          setLoading(false);
          setInventory(json.data.data);
          setTotalPage(json.data.totalPages);
        } else {
          setLoading(false);
          console.error("Expected array inventory type, got:", json.data);
          setInventory([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setInventory([]);
      }
    }
    fetchTitle(page);
  }, [page]);

  return {
    inventory,
    page,
    totalPage,
    setPage,
    loading,
    error,
  };
}
