import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";


export const authOptions:NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      const { user, account, profile } = params;

      try {
        await dbConnect()
        .then(() => "Connected to MongoDB Database")
        .catch((error) => {
          error: 'Connection Failed...!';
        })

        // // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        // // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').toLowerCase(),
            profile_pic: profile.picture
          })
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
}

export default NextAuth(authOptions);