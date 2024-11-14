import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type BorrowerListDetail = {
  id: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationId: number;
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
  const [borrowerDetail, setBorrowerDetail] = useState<BorrowerListDetail>(
    {} as BorrowerListDetail,
  );

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(`REACT`, REACT_APP_PORTAL_BE_URL);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrower/${id}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data borrower:", data);
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
