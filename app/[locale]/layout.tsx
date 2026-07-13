import { GoogleTagManager } from "@next/third-parties/google";
import "react-toastify/dist/ReactToastify.css";
import "./css/card.scss";
import "./css/globals.scss";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/helper/scroll-to-top";
import { AuthProvider } from "./components/AuthProvider";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata",
  });

  return {
    title: t("homepage_title"),
    description: t("homepage_description"),
  };
}



import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} >
      <body >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ToastContainer />
            < main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white" >
              <Navbar />
              {children}
              <ScrollToTop />
            </main>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
      < GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM}
      />
    </html >
  );
}
