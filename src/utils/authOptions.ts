import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/utils/env";
import dbConnect from "@/utils/db";
import { User } from "@/utils/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email === "dungne1132@gmail.com") {
        await dbConnect();
        
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            role: "admin",
          });
        }
        
        return true;
      }
      return false; // Deny login for other emails
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/login', 
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
};
