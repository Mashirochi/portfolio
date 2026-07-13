import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import LoginClient from "../components/login/LoginClient";
import { getServerSession } from "next-auth";
import { env } from "@/utils/env";

export default async function LoginPage() {
  const session = await getServerSession();
  const locale = await getLocale();
  if (session?.user?.email === env.ADMIN_EMAIL) {
    redirect(`/${locale}/dashboard`);
  }

  return <LoginClient locale={locale} />;
}