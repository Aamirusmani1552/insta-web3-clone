import BottomNavBar from "@/components/BottomNavBar";
import ConnectWithCyberConnect from "@/components/ConnectWithCyberConnect";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import useCreateEssence from "@/hooks/useCreateEssence";
import { useAddress } from "@thirdweb-dev/react";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdOutlinePermMedia } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

type Props = {};

const Create = (props: Props) => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { createEssence, status } = useCreateEssence();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const address = useAddress();
  const [open,setOpen] = useState<boolean>(false);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) {
      toast("⚠ connect your wallet first");
      return;
    }
    if (preview?.length == 0 || title.length == 0 || description.length == 0) {
      toast("Please provide all details", {
        icon: "⚠",
      });
      return;
    }

    setLoading(true);
    await createEssence({ description, nftFile: image, title });
    setLoading(false);
    setTitle("");
    setImage(undefined);
    setDescription("");
    setPreview("");
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"w-full"}>
        <Header />
        <div className="flex">
          <Sidebar />

          <div className="w-full flex min-h-full  px-0 md:px-20 flex-1">
            <div className=" w-full px-2 md:px-0 pb-12">
              <div className="py-4 md:flex items-center justify-end hidden ">
                <ConnectWithCyberConnect setOpen={setOpen} />
              </div>

              <form
                className=" h-fit py-2 flex flex-col gap-4 max-w-[500px] pt-4 pb-8"
                onSubmit={(e) => handleSubmit(e)}
              >
                <h3 className="md:text-3xl text-xl font-semibold">
                  Create New Post
                </h3>
                <label
                  htmlFor="select_image"
                  className="border-dashed border-2 min-h-[200px] p-4 w-full  rounded-md flex items-center justify-center cursor-pointer flex-col"
                >
                  {preview && preview.length > 0 && (
                    <div
                      className="w-full flex items-center justify-end text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview("");
                      }}
                    >
                      <RxCross2 />
                    </div>
                  )}
                  <input
                    type="file"
                    name="select_image"
                    id="select_image"
                    className="hidden"
                    disabled={preview ? preview?.length > 0 : false}
                    onChange={(e) => {
                      if (e.target.files) {
                        setImage(e.target.files[0]);
                      }
                    }}
                  />

                  {preview && preview.length > 0 && (
                    <div className="w-[200px] h-[200px] relative ">
                      <Image
                        src={preview}
                        alt="preview_image"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}

                  {!preview && (
                    <div className="text-5xl font-gray-500 flex">
                      <MdOutlinePermMedia />
                    </div>
                  )}
                </label>

                {/* title */}
                <label
                  htmlFor="title"
                  className="w-full  flex flex-col text-xs md:text-sm gap-2"
                >
                  <span className="text-gray-500">Title</span>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="border-2 disabled:opacity-75 focus:border-black px-4 py-2  md:text-base rounded-md  outline-none"
                    value={title}
                    disabled={loading}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </label>

                <label
                  htmlFor="description"
                  className="w-full  flex flex-col text-xs md:text-sm gap-2"
                >
                  <span className="text-gray-500">Caption</span>
                  <textarea
                    name="description"
                    id="description"
                    className="border-2 disabled:opacity-75 focus:border-black px-4 py-2  md:text-base rounded-md resize-none  outline-none"
                    rows={4}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    disabled={loading}
                  />
                </label>

                <button
                  type="submit"
                  className="bg-black flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md"
                >
                  <span>{status}</span>
                  {loading && (
                    <span className="block w-4 h-4 border-2 border-b-transparent animate-spin rounded-full"></span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <BottomNavBar />
      </main>
    </>
  );
};

export default Create;
