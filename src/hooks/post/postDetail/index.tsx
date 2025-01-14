import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostProps } from "../postList";

type Params = {
  id: string;
};

export function usePostDetail() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [postDetail, setPostDetail] = useState<PostProps>({} as PostProps);
  const REACT_APP_PORTAL_BE_URL = process.env.REACT_APP_PORTAL_BE_URL;
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const postResponse = await fetch(
          `${REACT_APP_PORTAL_BE_URL}/api/post/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        if (!postResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const { data: postData } = await postResponse.json();
        console.log("POST DATA:", postData);
        setPostDetail(postData);
      } catch (err) {
        setError(`Fetching error: ${err} `);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    id,
    page,
    postDetail,
    setPage,
    loading,
    error,
  };
}
