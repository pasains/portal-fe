import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export enum Status {
  "DONE" = "DONE",
  "PENDING" = "PENDING",
}

export type BorrowingProps = {
  id: number;
  invoiceNumber: string;
  borrowerId: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationId: string;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  dueDate: Date;
  status: Status;
  specialInstruction: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function useBorrowing() {
  const [borrowing, setBorrowing] = useState<BorrowingProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    async function fetchTitle(currentPage: number) {
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrowing?page${currentPage}&limit=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Not found!");
        }
        const json = await response.json();
        if (Array.isArray(json.data.borrowing)) {
          setLoading(false);
          setBorrowing(json.data.borrowing);
          setTotalPage(json.data.totalPage);
        } else {
          setLoading(false);
          console.error("Expected array borrowing detail, got:", json.data);
          setBorrowing([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setBorrowing([]);
      }
    }

    fetchTitle(page);
  }, [page]);

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
            Authorization: `${token}`,
          },
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        setLoading(false);
        setError(result.meta.message);
      } else {
        console.log(`Deleted borrowing:`, result);
        setBorrowing((borrowing) => borrowing.filter((item) => item.id !== id));
        setSuccess(result.meta.message);
      }
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

  //Download list data to xlsx
  const handleDownload = async () => {
    const response = await fetch(`${REACT_APP_PORTAL_BE_URL}/api/borrowing`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    const data = json.data.borrowing;
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Borrowing");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "borrowing_list.xlsx");
  };
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrowing?search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      const json = await response.json();
      setBorrowing(json.data.borrowing); // Assuming the response has an `inventory` array
    } catch (error) {
      console.error("Error fetching borrowing:", error);
    }
  };

  return {
    borrowing,
    openAlert,
    page,
    setPage,
    handleDownload,
    handleSearch,
    totalPage,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
    success,
  };
}
