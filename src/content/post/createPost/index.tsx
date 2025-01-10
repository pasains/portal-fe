import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import PostForm from "../../../container/postForm";
import TimedAlert from "../../../container/alert";
import useCreatePost from "../../../hooks/post/createPost";

const CreatePostContent = () => {
  const { createPost, success, loading, error } = useCreatePost();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async (postData: any) => {
    setIsSubmitting(true);
    const result = await createPost(postData);
    console.log(result);
    setIsSubmitting(false);
  };

  return (
    <div className="pb-10">
      <Typography className="pt-10 pb-2 text-center" variant="h2">
        CREATE POST
      </Typography>
      <Typography
        color="gray"
        className="w-fit mb-10 mx-auto text-center font-normal"
      >
        Share the incredible moments of your journey with us!
        <br /> Post your experiences, memories, and stories, and let the world
        see your adventures unfold.
        <br /> Your post will be featured on our awesome website{" "}
        <a className="text-blue-300" href="https://pasains.org" target="_blank">
          pasains.org
        </a>
        , and you can even check out existing posts on our web post page for
        some inspiration.
        <br /> So, what are you waiting for? Let's make your journey
        unforgettable!
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <PostForm
        onSubmit={handleCreatePost}
        isEditMode={false}
        isSubmitting={isSubmitting}
        success={success}
      />

      <div className="fixed z-9999 top-4 right-4">
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

export default CreatePostContent;
