import { useState, FC, ReactElement, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { BsPersonSquare } from "react-icons/bs";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import useCreateCCProfile from "@/hooks/auth/useCreateCCProfile";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type CreateProfileInput = {
  to: string; //owner of CC profile
  handle: string;
  avatar: string;
  metadata: string;
  operator?: string;
};

const CreateProfileModal: FC<Props> = ({ open, setOpen }): ReactElement => {
  const [handle, setHandle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const { createCCProfile } = useCreateCCProfile();

  const createPreview = async () => {
    if (typeof window == undefined) return;
    if (!image) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(image);
  };

  useEffect(() => {
    if (!image) return;
    createPreview();
  }, [image]);

  const handleCreate = async () => {
    if (handle.length === 0 || !image) {
      toast("⚠ Please provide all details");
      return;
    }

    await createCCProfile(handle, image, description);
  };

  return (
    <Dialog
      open={open}
      onClose={() => !loading && setOpen(false)}
      className={
        "fixed top-0 z-50 bottom-0 bg-[#a5a5a541] left-0 right-0 backdrop-blur-sm flex items-center justify-center p-4"
      }
    >
      <Dialog.Panel className="bg-white shadow-xl w-full max-w-[500px] p-4 rounded-md flex flex-col gap-4">
        <Dialog.Title className="text-2xl font-bold">
          Create Profile
        </Dialog.Title>
        <Dialog.Description className="text-sm text-gray-500">
          Enter Necessary Details
        </Dialog.Description>

        <div className="text-sm flex flex-col gap-2">
          {preview.length > 0 && (
            <div className="w-full flex justify-end items-center text-xl">
              <span
                onClick={() => {
                  setPreview("");
                  setImage(undefined);
                }}
                className="cursor-pointer"
              >
                <RxCross2 />
              </span>
            </div>
          )}
          <label
            htmlFor="profile_photo"
            className="flex border-dashed border-2 min-h-[120px] rounded-md px-4 py-2 flex-col gap-2 items-center justify-center cursor-pointer"
          >
            {preview ? (
              <div className="relative h-[120px] w-[120px]">
                <Image
                  src={preview}
                  alt="profile_preview"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : (
              <span className="text-gray-500 text-3xl flex flex-col items-center justify-center gap-2">
                <BsPersonSquare />
                <span className="text-xs">Select Profile Picture</span>
              </span>
            )}

            <input
              type="file"
              name="profile_photo"
              id="profile_photo"
              className="hidden"
              disabled={loading || preview.length > 0}
              onChange={(e) => {
                e.target.files && setImage(e.target.files[0]);
              }}
              accept="image/*"
            />
          </label>
          <label htmlFor="handle" className="flex flex-col gap-2">
            <span className="text-gray-500">Handle</span>
            <input
              type="text"
              name="handle"
              id="handle"
              className=" px-4 py-2 border-2 rounded-md disabled:opacity-75"
              disabled={loading}
              value={handle}
              onChange={(e) => {
                setHandle(e.target.value);
              }}
            />
          </label>

          <label htmlFor="description" className="flex flex-col gap-2">
            <span className="text-gray-500">Description (optional)</span>
            <input
              type="text"
              name="description"
              id="description"
              className=" px-4 py-2 border-2 rounded-md disabled:opacity-75"
              value={description}
              disabled={loading}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-4 font-semibold">
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="text-sm disabled:opacity-75 bg-white border-2 border-gray-500 px-4 py-2 rounded-md text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={async (e) => {
              setLoading(true);
              await handleCreate();
              setLoading(false);
            }}
            disabled={loading}
            className="text-sm flex gap-2 items-center bg-black px-4 py-2 rounded-md text-white border-black border-2"
          >
            <span>{loading ? "Creating" : "Create"}</span>
            {loading && (
              <span className="block w-3 h-3 disabled:bg-gray-500 border-2 border-b-transparent animate-spin border-white rounded-full"></span>
            )}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default CreateProfileModal;
