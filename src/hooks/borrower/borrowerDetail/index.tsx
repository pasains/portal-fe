import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type BorrowerListDetailProps = {
  id: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  borrowerOrganizationRel: {
    organizatioName: string;
    address: string;
    organizationStatus: string;
    note: string;
  };
};

type Params = {
  id: string;
};

export function useBorrowerDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [borrowerDetail, setBorrowerDetail] = useState<BorrowerListDetailProps>(
    {} as BorrowerListDetailProps,
  );

  const token = localStorage.getItem("access_token");
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrower/${id}`,
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
        console.log("Fetched Data borrower detail by id:", data);
        setBorrowerDetail(data);
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

  return { id, borrowerDetail, loading, error };
}
