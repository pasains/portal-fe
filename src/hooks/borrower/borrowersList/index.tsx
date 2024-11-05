import { useEffect, useState } from "react";

export type BorrowerProps = {
  id: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationName: string;
  organizationId: number;
  address: string;
  organizationStatus: string;
  note: string;
};

type InventoryTypeResponse = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: BorrowerProps[];
};

export default function useBorrower() {
  const [borrower, setBorrower] = useState<BorrowerProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/borrower`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: InventoryTypeResponse) => {
          console.log("BORROWER_1: " + json.data.length);
          for (let i = 0; i < json.data.length; i++) {
            console.log("BORROWER_2" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setBorrower(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setBorrower([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setBorrower([]);
        });
    }

    fetchTitle();
    return () => {};
  }, []);

  const deletedBorrower = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrower/delete/${id}`,
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
      console.log("Delete item", result);
      setBorrower((borrower) => borrower.filter((item) => item.id !== id));
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
    deletedBorrower(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    borrower,
    setBorrower,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
  };
}
