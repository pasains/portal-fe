import { useState } from "react";
import { useParams } from "react-router-dom";
import { BorrowerProps } from "../borrowersList";

export function useUpdateBorrower() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [borrowerUpdate, setBorrowerUpdate] = useState<BorrowerProps>(
    {} as BorrowerProps,
  );

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  const updateBorrower = async (id: any, borrowerData: any) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch(
        `${REACT_APP_PORTAL_BE_URL}/api/borrower/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(borrowerData),
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
      console.log("Updated data borrower:", data);
      setBorrowerUpdate(data);
    } catch (error: any) {
      setError(`Updating error: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { id, borrowerUpdate, success, updateBorrower, loading, error };
}
