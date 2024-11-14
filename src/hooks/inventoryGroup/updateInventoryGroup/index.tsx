import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type InventoryGroupList = {
  id: number;
  inventoryGroupName: string;
  description: string;
};

type Params = {
  id: string;
};

export function useUpdateInventoryGroup() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [inventoryGroupDetail, setInventoryGroupDetail] =
    useState<InventoryGroupList>({} as InventoryGroupList);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorygroup/${id}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data:", data);
        setInventoryGroupDetail(data);
      } catch (err) {
        setLoading(false);
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {};
  }, [id]);

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
            "Content-Group": "application/json",
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
      console.log("Updated data:", data);
      setInventoryGroupDetail(data);
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    inventoryGroupDetail,
    success,
    updateInventoryGroup,
    loading,
    error,
  };
}
