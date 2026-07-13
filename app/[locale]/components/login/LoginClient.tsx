"use client";

import { signIn } from "next-auth/react";
import { FaGoogle as GoogleIcon } from "react-icons/fa";

interface LoginClientProps {
  locale: string;
}

export default function LoginClient({ locale }: LoginClientProps) {
  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: `/${locale}/dashboard`,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d1224] px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-[#2a2a5a] bg-[#1a1443] p-8 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Admin Login
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to access the dashboard.
          </p>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:from-violet-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            <GoogleIcon className="mr-3 h-5 w-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}