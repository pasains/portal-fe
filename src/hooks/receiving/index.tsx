import { useEffect, useState } from "react";

export type ReceivingProps = {
  id: number;
  userId: number;
  notes: string;
  status: string;
};

type ReceivingResponse = {
  meta: {
    message: string;
    status: string;
    dataType: string;
  };
  data: ReceivingProps[];
};

export default function useReceiving() {
  const [receiving, setReceiving] = useState<ReceivingProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/receiving`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: ReceivingResponse) => {
          for (let i = 0; i < json.data.length; i++) {
            console.log("RECEIVING" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setReceiving(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setReceiving([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setReceiving([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);

  const deleteReceiving = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/receiving/delete/${id}`,
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
      setReceiving((borrowing) => borrowing.filter((item) => item.id !== id));
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
    deleteReceiving(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    receiving,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
  };
}
