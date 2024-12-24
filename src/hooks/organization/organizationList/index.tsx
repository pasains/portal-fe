import { useEffect, useState } from "react";

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
      console.log("Delete item", result);
      setOrganization((organization) =>
        organization.filter((item) => item.id !== id),
      );
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
    deletedOrganization(deleteId);
    setOpenAlert(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return {
    organization,
    setOrganization,
    page,
    totalPage,
    setPage,
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
  };
}
