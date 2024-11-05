import { useEffect, useState } from "react";

export type OrganizationProps = {
  id: number;
  organizationName: string;
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
  data: OrganizationProps[];
};

export default function useOrganization() {
  const [organization, setOrganization] = useState<OrganizationProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeletId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);
    function fetchTitle() {
      fetch(`${REACT_APP_PORTAL_BE_URL}/api/organization`)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Not found!");
          }
          return response.json();
        })
        .then((json: InventoryTypeResponse) => {
          console.log("ORGANIZATION_1: " + json.data.length);
          for (let i = 0; i < json.data.length; i++) {
            console.log("ORGANIZATION_2" + i + ": " + json.data[i].id);
          }
          if (Array.isArray(json.data)) {
            setLoading(false);
            setOrganization(json.data);
          } else {
            setLoading(false);
            console.error("Expected array, got:", json.data);
            setOrganization([]);
          }
        })
        .catch((error: any) => {
          setError(`Fetch error: ${error}`);
          setOrganization([]);
        });
    }

    fetchTitle();
    return () => {};
  }, [REACT_APP_PORTAL_BE_URL]);

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
      setOrganization((organization) => organization.filter((item) => item.id !== id));
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
    openAlert,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
    loading,
    error,
  };
}
