import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export type OrganizationProps = {
  id: number;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
};

export default function useOrganization() {
  const [organization, setOrganization] = useState<OrganizationProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
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
          `${REACT_APP_PORTAL_BE_URL}/api/organization?page=${currentPage}&limit=10`,
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
        if (Array.isArray(json.data.organization)) {
          setLoading(false);
          setOrganization(json.data.organization);
          setTotalPage(json.data.totalPage);
        } else {
          setLoading(false);
          console.error("Expected array organization, got:", json.data);
          setOrganization([]);
        }
      } catch (error: any) {
        setError(`Fetch error: ${error}`);
        setOrganization([]);
      }
    }

    fetchTitle(page);
  }, [page]);

  const deletedOrganization = async (id: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/organization/delete/${id}`,
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
      }
      console.log("Delete organization", result);
      setOrganization((organization) =>
        organization.filter((item) => item.id !== id),
      );
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
      deletedOrganization(deleteId);
    }
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  //Download list data to xlsx
  const handleDownload = async () => {
    const response = await fetch(
      `${REACT_APP_PORTAL_BE_URL}/api/organization`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
    );
    const json = await response.json();
    const data = json.data.organization;
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Organization");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "organization_list.xlsx");
  };
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/organization?search=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      const json = await response.json();
      setOrganization(json.data.organization); // Assuming the response has an `inventory` array
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  return {
    organization,
    setOrganization,
    page,
    totalPage,
    setPage,
    success,
    openAlert,
    handleSearch,
    handleDelete,
    handleConfirmDelete,
    handleDownload,
    handleCloseAlert,
    loading,
    error,
  };
}
