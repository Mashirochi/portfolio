"use client";

import { Link, usePathname } from "i18n/routing";
import { MdDashboard, MdSchool, MdWork, MdCode, MdPerson, MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", icon: <MdDashboard className="w-5 h-5 mr-3" /> },
    { href: "/dashboard/educations", label: "Educations", icon: <MdSchool className="w-5 h-5 mr-3" /> },
    { href: "/dashboard/experiences", label: "Experiences", icon: <MdWork className="w-5 h-5 mr-3" /> },
    { href: "/dashboard/projects", label: "Projects", icon: <MdCode className="w-5 h-5 mr-3" /> },
    { href: "/dashboard/personal-data", label: "Personal Data", icon: <MdPerson className="w-5 h-5 mr-3" /> },
  ];

  return (
    <aside className="w-64 bg-[#0a0d17]/80 backdrop-blur-md border-r border-[#1f223c] hidden md:flex flex-col shadow-2xl relative z-10">
      <div className="p-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 tracking-tight">
          Admin
        </h2>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4 mt-2">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-fuchsia-400 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  : "text-gray-400 hover:bg-[#1a1443]/50 hover:text-white"
              }`}
            >
              <span className={isActive ? "text-fuchsia-400" : "text-gray-500 group-hover:text-violet-400 transition-colors"}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto border-t border-[#1f223c]">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 font-medium"
        >
          <MdLogout className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
