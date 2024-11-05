import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type UserProps = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: boolean;
  phoneNumber: string;
  address: string;
  profile: string;
  position: string;
  role: string;
  isActive: boolean;
};
type Params = {
  id: string | undefined;
};

export function useUsers() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserProps>({} as UserProps);

  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id === undefined) {
          setError("User Id is missing or invalid");
          return;
        }
        const response = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/user/profile/${id}`,
        );

        console.log(`TEST`, REACT_APP_PORTAL_BE_URL, id);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const { data } = await response.json();
        console.log("Fetched Data:", data);
        setUsers(data);
      } catch (err) {
        setError(`Fetching error: ${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {};
  }, [id]);

  return { id, users, loading, error };
}
