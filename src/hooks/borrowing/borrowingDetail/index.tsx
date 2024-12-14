import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BorrowingProps } from "../borrowingList";

type Params = {
  id: string;
};

export function useBorrowingDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [borrowingDetail, setBorrowingDetail] = useState<BorrowingProps>(
    {} as BorrowingProps,
  );

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrowing/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data Borrower Detail:", data);
        setBorrowingDetail(data);
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

  return {
    id,
    borrowingDetail,
    loading,
    error,
  };
}
