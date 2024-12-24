import { useState } from "react";
import { useParams } from "react-router-dom";
import { BorrowingProps } from "../borrowingList";

export function useUpdateBorrowing() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [borrowingDetail, setBorrowingDetail] = useState<BorrowingProps>(
    {} as BorrowingProps,
  );

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const updateBorrowing = async (id: any, borrowing: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrowing/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(borrowing),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(data.meta.message);
      } else {
        setSuccess(data.meta.message);
        setLoading(false);
      }
      console.log("Updated data borrowing:", data);
      setBorrowingDetail(data);
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    borrowingDetail,
    setBorrowingDetail,
    success,
    updateBorrowing,
    loading,
    error,
  };
}
