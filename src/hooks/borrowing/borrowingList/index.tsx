import { useEffect, useState } from "react";

export type BorrowingProps = {
  id: number;
  borrowerId: number;
  borrowingStatusId: number;
  organizationId: number;
  dueDate: Date;
  specialInstruction: string;
};

type BorrowingResponse = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: BorrowingProps[];
};

export default function useBorrowing() {
  const [borrowing, setBorrowing] = useState<BorrowingProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/borrowing`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: BorrowingResponse) => {
          for (let i = 0; i < json.data.length; i++) {
            console.log("BORROWING" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setBorrowing(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setBorrowing([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setBorrowing([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);

  const deleteBorrowing = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrowing/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "aplication/json",
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      }
      console.log(result);
      setBorrowing((borrowing) => borrowing.filter((item) => item.id !== id));
    } catch (error: any) {
      setError(`Deleting error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: any) => {
    setOpenAlert(true);
    setDeletId(id);
  };

  const handleConfirmDelete = () => {
    deleteBorrowing(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    borrowing,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
  };
}
