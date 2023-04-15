import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNavBar from "@/components/BottomNavBar";
import MainContent from "@/components/MainContent";
import CreateProfileModal from "@/components/CreateProfileModal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={""}>
        <Header />
        <div className="flex">
          <Sidebar />
          <MainContent />
        </div>
        <BottomNavBar />
        <CreateProfileModal />
      </main>
    </>
  );
}
