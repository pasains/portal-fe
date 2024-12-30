import { useState } from "react";
import { useParams } from "react-router-dom";
import { StatusItem } from "../itemDetail";

interface Item {
  id: number;
  status: StatusItem;
  postCondition: string | "";
  quantity: number;
}

export function useUpdateItem() {
  const { borrowingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [itemsUpdate, setItemsUpdate] = useState<Item[]>([]);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  const updateItem = async (borrowingId: any) => {
    console.log(`BORROWING ID`, borrowingId);
    setLoading(true);
    setSuccess(null);
    setError(null);
    if (!borrowingId) {
      setError("Borrowing ID is missing.");
      return;
    }
    console.log(`Items Update`, itemsUpdate);
    const partialItems: Item[] = itemsUpdate.map((itm) => ({
      id: itm.id,
      status: itm.status,
      postCondition: itm.postCondition || "",
      quantity: itm.quantity,
    }));
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/item/updateall/${borrowingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ items: partialItems }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        console.log(`UPDATE`, data.message);
        setLoading(false);
        setError(data.message);
      } else {
        setSuccess(data.message);
        setLoading(false);
      }
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    borrowingId,
    setItemsUpdate,
    itemsUpdate,
    updateItem,
    success,
    loading,
    error,
  };
}
