import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

function CreateNewPost({}: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function handlePostCreateSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div>
      <form
        className="flex items-center justify-center flex-col gap-2"
        onSubmit={handlePostCreateSubmit}
      >
        <label htmlFor="Title">
          <span>Title</span>
          <input
            type="text"
            className="border-2"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </label>

        <label htmlFor="Content">
          <span>Content</span>
          <input
            type="text"
            className="border-2"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setContent(e.target.value);
            }}
          />
        </label>

        <label htmlFor="Description">
          <span>Description</span>
          <input
            type="text"
            className="border-2"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
          />
        </label>

        <label htmlFor="Image">
          <span>Image/video</span>
          <input
            type="file"
            className="border-2"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) setImage(e.target.files[0]);
            }}
          />
        </label>
        <button type="submit" className="border-2 border-black bg-lime-200">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreateNewPost;
