import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../../container/alert";
import PostForm from "../../../container/postForm";
import { useUpdatePost } from "../../../hooks/post/updatePost";
import { usePostDetail } from "../../../hooks/post/postDetail";

const UpdatePostContent = () => {
  const { updatePost, loading, success, error } = useUpdatePost();
  const { id, postDetail } = usePostDetail();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePost = async (postData: any) => {
    setIsSubmitting(true);
    if (id) {
      const result = await updatePost(id, postData);
      setIsSubmitting(false);
      console.log(result);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
    }
  }, [id]);

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Update Post
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <PostForm
        onSubmit={handleUpdatePost}
        initialData={postDetail}
        isEditMode={true}
        isSubmitting={isSubmitting}
        success={success}
      />

      <div className="fixed z-9999 top-10 right-10">
        {success && (
          <TimedAlert message={success} duration={5000} color="green" />
        )}
      </div>
      <div className="fixed z-9999 top-4 right-4">
        {error && <TimedAlert message={error} duration={5000} color="red" />}
      </div>
    </div>
  );
};

export default UpdatePostContent;
