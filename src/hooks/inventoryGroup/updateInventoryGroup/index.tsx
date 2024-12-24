import { useState } from "react";
import { useParams } from "react-router-dom";
import { InventoryGroupProps } from "../inventoryGroupList";

type Params = {
  id: string;
};

export function useUpdateInventoryGroup() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [inventoryGroupUpdate, setInventoryGroupUpdate] =
    useState<InventoryGroupProps>({} as InventoryGroupProps);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  const updateInventoryGroup = async (id: any, inventoryGroupData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(inventoryGroupData),
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
      console.log("Updated inventory group data:", data);
      setInventoryGroupUpdate(data);
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    inventoryGroupUpdate,
    success,
    updateInventoryGroup,
    loading,
    error,
  };
}
