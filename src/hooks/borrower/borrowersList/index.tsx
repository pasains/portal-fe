import { useEffect, useState } from "react";

export type BorrowerProps = {
  id: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationId: number;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
};

export default function useBorrower() {
  const [borrower, setBorrower] = useState<BorrowerProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrower?page=${currentPage}&limit=10`,
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
        if (Array.isArray(json.data.borrower)) {
          setLoading(false);
          setBorrower(json.data.borrower);
          setTotalPage(json.data.totalPage);
        } else {
          setLoading(false);
          console.error("Expected array borrower, got:", json.data);
          setBorrower([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setBorrower([]);
      }
    }

    fetchTitle(page);
  }, [page]);

  const deletedBorrower = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrower/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      }
      console.log("Delete borrower", result);
      setBorrower((borrower) => borrower.filter((item) => item.id !== id));
      setSuccess(result.meta.message);
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
    if (deleteId !== null) {
      deletedBorrower(deleteId);
    }
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    borrower,
    page,
    setPage,
    totalPage,
    setBorrower,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
    success,
  };
}
