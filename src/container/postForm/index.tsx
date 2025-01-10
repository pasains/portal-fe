import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useDebounceRef from "../../hooks/debounceRef";
import { PostType } from "../../hooks/post/postList";

interface PostProps {
  initialData?: any;
  onSubmit: (postData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const PostForm: React.FC<PostProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [postData, setPostData] = useState({
    title: "",
    type: "",
    headerPhoto: "",
    place: "",
    writer: "",
    date: "",
    generation: "",
    firstParagraph: "",
    secondParagraph: "",
    thirdParagraph: "",
    fourthParagraph: "",
    firstImage: "",
    secondImage: "",
    thirdImage: "",
    captionFirstImage: "",
    captionSecondImage: "",
    captionThirdImage: "",
    photoCollage: [],
    captionPhotoCollage: "",
    quote: "",
    nameQuote: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setPostData({
        title: initialData.title || "",
        type: initialData.type || "",
        headerPhoto: initialData.headerPhoto || "",
        place: initialData.place || "",
        writer: initialData.note || "",
        date: initialData.date || "",
        generation: initialData.generation || "",
        firstParagraph: initialData.firstParagraph || "",
        secondParagraph: initialData.secondParagraph || "",
        thirdParagraph: initialData.thridParagraph || "",
        fourthParagraph: initialData.fourthParagraph || "",
        firstImage: initialData.firstImage || "",
        secondImage: initialData.secondImage || "",
        thirdImage: initialData.thirdImage || "",
        captionFirstImage: initialData.captionFirstImage || "",
        captionSecondImage: initialData.captionSecondImage || "",
        captionThirdImage: initialData.captionThirdImage || "",
        photoCollage: initialData.photoCollage || [],
        captionPhotoCollage: initialData.captionPhotoCollage || "",
        quote: initialData.quote || "",
        nameQuote: initialData.nameQuote || "",
      });
    }
  }, [initialData, isEditMode]);

  //Console log the data
  useEffect(() => {
    setPostData(postData);
    console.log(`POST_DATA: `, postData);
  }, [postData]);

  useEffect(() => {
    if (success) {
      setPostData({
        title: "",
        type: "",
        headerPhoto: "",
        place: "",
        writer: "",
        date: "",
        generation: "",
        firstParagraph: "",
        secondParagraph: "",
        thirdParagraph: "",
        fourthParagraph: "",
        firstImage: "",
        secondImage: "",
        thirdImage: "",
        captionFirstImage: "",
        captionSecondImage: "",
        captionThirdImage: "",
        photoCollage: [],
        captionPhotoCollage: "",
        quote: "",
        nameQuote: "",
      });
    }
  }, [success]);

  //Handle input for every paragraph use React Quill
  const handleInputParagraphChange = useDebounceRef(
    (name: string, value: string) => {
      setPostData((postData) => ({
        ...postData,
        [name]: value,
      }));
    },
    500,
  );

  //Handle general input
  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type === "number" ? +value : value;

    setPostData({
      ...postData,
      [name]: finalValue,
    });
  };

  //Handle select type post
  const handleTypePostChange = (value: string) => {
    setPostData((prev) => ({
      ...prev,
      type: value as PostType,
    }));
  };

  //Handle single header photo upload
  const handleHeaderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // Temporary URL for preview
      setPostData((prev) => ({
        ...prev,
        headerPhoto: url,
      }));
    }
  };

  //Handle cancel image for header photo upload
  const handleCancelHeaderPhoto = () => {
    setPostData((prev) => ({
      ...prev,
      headerPhoto: "",
    }));
  };

  //Handle single first image  upload
  const handleFirstImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // Temporary URL for preview
      setPostData((prev) => ({
        ...prev,
        firstImage: url,
      }));
    }
  };

  //Handle cancel image for first image upload
  const handleCancelFirstImage = () => {
    setPostData((prev) => ({
      ...prev,
      firstImage: "",
    }));
  };

  //Handle single second image  upload
  const handleSecondImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // Temporary URL for preview
      setPostData((prev) => ({
        ...prev,
        secondImage: url,
      }));
    }
  };

  //Handle cancel image for second image upload
  const handleCancelSecondImage = () => {
    setPostData((prev) => ({
      ...prev,
      secondImage: "",
    }));
  };

  //Handle single third image  upload
  const handleThirdImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // Temporary URL for preview
      setPostData((prev) => ({
        ...prev,
        thirdImage: url,
      }));
    }
  };

  //Handle cancel image for third image upload
  const handleCancelThirdImage = () => {
    setPostData((prev) => ({
      ...prev,
      thirdImage: "",
    }));
  };

  //Handle multiple image upload for photo collage
  const handlePhotoCollageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // Convert FileList to Array
      const urls = files.map((file) => URL.createObjectURL(file)); // Generate URLs for each file

      setPostData((prev: any) => ({
        ...prev,
        photoCollage: [...prev.photoCollage, ...urls], // Append new URLs to the existing array
      }));
    }
  };

  //Handle cancel selected image from photo collage upload
  const handleCancelPhotoCollage = (url: string) => {
    setPostData((prev) => {
      const updateImages = prev.photoCollage.filter((image) => image !== url); // Remove the specific URL
      return { ...prev, photoCollage: updateImages };
    });
    URL.revokeObjectURL(url);
  };

  //Handle submit form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(postData);
  };

  return (
    <div className="w-full mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-10 justify-center">
          <section className="w-1/3 p-5 mb-10 border border-b rounded-lg">
            <label>
              <Typography variant="h6">Post Type</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Choose the post type!
              </Typography>
              <div className="w-52">
                <Select
                  label="Post Type"
                  className="w-52"
                  value={postData.type || ""}
                  animate={{ mount: { y: 0 }, unmount: { y: 25 } }}
                  onChange={(value: any) =>
                    handleTypePostChange(value as PostType)
                  }
                >
                  <Option value={PostType.ARTICLE}>ARTICLE</Option>
                  <Option value={PostType.REPORT}>TRIP REPORT</Option>
                  <Option value={PostType.TRAINING}>TRAINING</Option>
                </Select>
              </div>
            </label>
            <br />

            <label>
              <Typography variant="h6">Header Photo</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Image must be wide for the top of your post!
              </Typography>
              <div className="w-52">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeaderPhotoUpload}
                  className="w-52"
                />
                {postData.headerPhoto && (
                  <div className="relative">
                    <img
                      src={postData.headerPhoto}
                      alt="Preview"
                      style={{ width: "200px" }}
                      className="mt-2 h-auto border rounded shadow-lg"
                    />
                    <button
                      onClick={handleCancelHeaderPhoto}
                      className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </label>
            <br />

            <label>
              <Typography variant="h6">Fisrt Image</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                The position of the photo is below the first paragraph!
                <br />
                <span className="font-semibold">
                  NB: This field is optional.
                </span>
              </Typography>
              <div className="w-52">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFirstImageUpload}
                  className="w-52"
                />
                {postData.firstImage && (
                  <div className="relative">
                    <img
                      src={postData.firstImage || ""}
                      alt="Preview"
                      style={{ width: "200px" }}
                      className="mt-2 h-auto border rounded shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={handleCancelFirstImage}
                      className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </label>
            <br />

            <label>
              <Typography variant="h6">Caption First Image</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Give your best caption! <br />
                <span className="font-semibold">
                  NB: If you not upload the first image, you can skip this
                  field.
                </span>
              </Typography>
              <Textarea
                color="orange"
                label="Caption First Image "
                maxLength={150}
                name="captionFirstImage"
                variant="outlined"
                value={postData.captionFirstImage || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Second Image</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                The position of the photo is below the second paragraph!
                <br />
                <span className="font-semibold">
                  NB: This field is optional.
                </span>
              </Typography>
              <div className="w-52">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSecondImageUpload}
                  className="w-52"
                />
                {postData.secondImage && (
                  <div className="relative">
                    <img
                      src={postData.secondImage}
                      alt="Preview"
                      style={{ width: "200px" }}
                      className="mt-2 h-auto border rounded shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={handleCancelSecondImage}
                      className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </label>
            <br />

            <label>
              <Typography variant="h6">Caption Second Image</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Give your best caption! <br />
                <span className="font-semibold">
                  NB: If you not upload the second image, you can skip this
                  field.
                </span>
              </Typography>
              <Textarea
                color="orange"
                label="Caption Second Image"
                maxLength={150}
                name="captionSecondImage"
                variant="outlined"
                value={postData.captionSecondImage || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              <Typography variant="h6">Third Image</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                The position of the photo is below the third paragraph!
                <br />
                <span className="font-semibold">
                  NB: This field is optional.
                </span>
              </Typography>
              <div className="w-52">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThirdImageUpload}
                  className="w-52"
                />
                {postData.thirdImage && (
                  <div className="relative">
                    <img
                      src={postData.thirdImage}
                      alt="Preview"
                      style={{ width: "200px" }}
                      className="mt-2 h-auto border rounded shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={handleCancelThirdImage}
                      className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </label>
            <br />

            <label>
              <Typography variant="h6">Caption Third Image</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Give your best caption! <br />
                <span className="font-semibold">
                  NB: If you not upload the third image, you can skip this
                  field.
                </span>
              </Typography>
              <Textarea
                color="orange"
                label="Caption Third Image"
                name="captionThirdImage"
                maxLength={150}
                variant="outlined"
                value={postData.captionThirdImage || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Photo Collage</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                The position of the photo is below the fourth paragraph!
                <br />
                <span className="font-semibold">
                  NB: You have to upload 2 or 4 photos. The photos will be
                  portraits so adjust your photos accordingly.
                </span>
              </Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoCollageUpload}
                className="file-input"
              />

              <div className="flex gap-4 flex-wrap">
                {postData.photoCollage.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      style={{ width: "200px" }}
                      className="mt-2 h-auto border rounded shadow-lg"
                    />
                    <button
                      onClick={() => handleCancelPhotoCollage(url)}
                      className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            </label>
            <br />

            <label>
              <Typography variant="h6">Caption Photo Collage</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Give your best caption!
              </Typography>
              <Textarea
                color="orange"
                label="Caption Photo Collage"
                name="captionPhotoCollage"
                maxLength={150}
                variant="outlined"
                value={postData.captionPhotoCollage || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Quote</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Give a quote related to your post!
              </Typography>
              <Input
                className="w-full"
                color="orange"
                label="Quote"
                type="text"
                name="quote"
                variant="outlined"
                size="md"
                value={postData.quote || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography className="mb-2" variant="h6">
                Quote Author
              </Typography>
              <Input
                color="orange"
                label="Quote Author"
                type="text"
                variant="outlined"
                maxLength={50}
                name="quoteName"
                value={postData.nameQuote || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
          </section>

          <section className="w-1/2 p-5 mb-10 border border-b rounded-lg">
            <label>
              <Typography variant="h6">Title</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Give an interisting title!
              </Typography>
              <Textarea
                color="orange"
                label="Title"
                maxLength={150}
                name="title"
                variant="outlined"
                size="md"
                value={postData.title || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Place</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                Place of activity according to the post.
                <br />
                <span className="font-semibold">
                  Example: <br />
                  <li>Gunung Everest</li>
                  <li>Goa Veryovkina</li>
                  <li>Nepal</li>
                </span>
              </Typography>
              <Input
                color="orange"
                label="Place"
                type="text"
                maxLength={50}
                variant="outlined"
                name="place"
                value={postData.place || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Writer</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                <span className="font-semibold">
                  Example: <br />
                  <li>1: Weleh</li>
                  <li>2: Buncis & Godok</li>
                  <li>3: Mantol, Suratmi, & Kemiri</li>
                  <li>dst.</li>
                </span>
              </Typography>
              <Input
                color="orange"
                label="Writer"
                type="text"
                maxLength={50}
                variant="outlined"
                name="writer"
                value={postData.writer || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Time</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                The date of the activity in your post.
                <br />
                <span className="font-semibold">
                  Example: <br />
                  <li>Februari 2024</li>
                  <li>November - Desember 2024</li>
                  <li>April & September 2024</li>
                </span>
              </Typography>
              <Input
                color="orange"
                label="Time"
                type="text"
                variant="outlined"
                maxLength={50}
                name="date"
                value={postData.date || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography variant="h6">Generation</Typography>
              <Typography color="gray" className="mb-1 font-normal">
                <span className="font-semibold">Example: PASAINS 18</span>
              </Typography>
              <Input
                color="orange"
                label="Generation"
                type="text"
                maxLength={50}
                variant="outlined"
                name="generation"
                value={postData.generation || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              <Typography className="mb-2" variant="h6">
                Fisrt Paragraph
              </Typography>
              <ReactQuill
                className="w-full"
                placeholder="Fisrt Paragraph"
                value={postData.firstParagraph || ""}
                onChange={(content) =>
                  handleInputParagraphChange("firstParagraph", content)
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                  ],
                }}
              />
            </label>
            <br />

            <label>
              <Typography className="mb-2" variant="h6">
                Second Paragraph
              </Typography>
              <ReactQuill
                className="w-full"
                placeholder="Second Paragraph"
                value={postData.secondParagraph || ""}
                onChange={(content) =>
                  handleInputParagraphChange("secondParagraph", content)
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                  ],
                }}
              />
            </label>
            <br />

            <label>
              <Typography className="mb-2" variant="h6">
                Third Paragraph
              </Typography>
              <ReactQuill
                className="w-full"
                placeholder="Third Paragaraph"
                value={postData.thirdParagraph || ""}
                onChange={(content) =>
                  handleInputParagraphChange("thirdParagraph", content)
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                  ],
                }}
              />
            </label>
            <br />

            <label>
              <Typography className="mb-2" variant="h6">
                Fourth Paragraph
              </Typography>
              <ReactQuill
                className="w-full"
                placeholder="Fourth Paragraph"
                value={postData.fourthParagraph || ""}
                onChange={(content) =>
                  handleInputParagraphChange("fourthParagraph", content)
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                  ],
                }}
              />
            </label>
            <br />

            <Button type="submit" disabled={isSubmitting}>
              {isEditMode ? "Update Post" : "Create Post"}
            </Button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
