import { GoogleTagManager } from "@next/third-parties/google";
import "react-toastify/dist/ReactToastify.css";
import "./css/card.scss";
import "./css/globals.scss";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/helper/scroll-to-top";

export const metadata: Metadata = {
  title: "Portfolio of Abu Said - Software Developer",
  description:
    "This is the portfolio of Abu Said. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};



export default function RootLayout({ children }) {
  return (
    <html lang={"en"} >
      <body >
        <ToastContainer />
        < main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white" >
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
      </body>
      < GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM}
      />
    </html >
  );
}
