import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrganizationProps } from "../organizationList";

export type OrganizationList = {
  id: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
};

type Params = {
  id: string;
};

export function useOrganizationDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizationList, setOrganizationList] = useState<OrganizationList[]>(
    [],
  );
  const [organizationDetail, setOrganizationDetail] =
    useState<OrganizationProps>({} as OrganizationProps);
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const organizationResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/organization/${id}`,
        );

        if (!organizationResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: organizationData } = await organizationResponse.json();
        console.log("Organization_Data", organizationData);
        setOrganizationDetail(organizationData);
      } catch (err) {
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const fetchItemData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Organization_Id`, id);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrower?org=${id}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setLoading(false);
        console.log("Fetched Data_:", data);
        setOrganizationList(data);
      } catch (err) {
        setLoading(false);
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchItemData();
    return () => {};
  }, [id]);

  return {
    id,
    organizationList,
    organizationDetail,
    loading,
    error,
  };
}
