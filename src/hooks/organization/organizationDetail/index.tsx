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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [organizationList, setOrganizationList] = useState<OrganizationList[]>(
    [],
  );
  const [organizationDetail, setOrganizationDetail] =
    useState<OrganizationProps>({} as OrganizationProps);
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const organizationResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/organization/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        if (!organizationResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: organizationData } = await organizationResponse.json();
        console.log("ORGANIZATION DATA:", organizationData);
        setOrganizationDetail(organizationData);
      } catch (err) {
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const fetchItemData = async (currentPage: number) => {
      setLoading(true);
      setError(null);
      console.log(`Organization_Id`, id);
      try {
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/borrower?org=${id}&page${currentPage}&limit=10`,
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
        const json = await response.json();
        if (Array.isArray(json.data.borrower)) {
          setLoading(false);
          console.log(
            "Fetched Data Borrower from organization:",
            json.data.borrower,
          );
          setOrganizationList(json.data.borrower);
          setTotalPage(json.data.totalPage);
        } else {
          setLoading(false);
          setError(`Fetching error: ${error} `);
          setOrganizationList([]);
        }
      } catch (error: any) {
        setError(`Fetching error: ${error} `);
        setOrganizationList([]);
      }
    };
    fetchItemData(page);
  }, [page]);

  return {
    id,
    page,
    totalPage,
    setPage,
    organizationList,
    organizationDetail,
    loading,
    error,
  };
}
