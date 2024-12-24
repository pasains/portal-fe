import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type InventoryTypeList = {
  id: number;
  inventoryTypeName: string;
  description: string;
};

type Params = {
  id: string;
};

export function useUpdateInventoryType() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [inventoryTypeDetail, setInvenntoryTypeDetail] =
    useState<InventoryTypeList>({} as InventoryTypeList);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data inventory type:", data);
        setInvenntoryTypeDetail(data);
      } catch (err) {
        setLoading(false);
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateInventoryType = async (id: any, inventoryTypeData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/inventorytype/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(inventoryTypeData),
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
      setInvenntoryTypeDetail(data);
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    inventoryTypeDetail,
    success,
    updateInventoryType,
    loading,
    error,
  };
}
