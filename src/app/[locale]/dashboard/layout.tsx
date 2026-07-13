import { getServerSession } from "next-auth/next";
import { redirect } from "@/i18n/routing";
import { authOptions } from "@/utils/authOptions";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await getServerSession(authOptions);
  const locale = (await params).locale;

  if (!session) {
    redirect({ href: "/login", locale });
  }

  return (
    <div className="flex min-h-screen bg-[#060813] text-white">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-gradient-to-br from-[#0a0d17] to-[#0d1224] shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
