import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";


export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await dbConnect()
            .then(() => "Connected to MongoDB Database")
            .catch((error) => {
              error: 'Connection Failed...!';
            })
  
          // // check if user already exists
          const userExists = await User.findOne({ email, password });
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(/\s/g, '').toLowerCase(),
              profile_pic: profile.picture
            })
          }
          return true;
        } catch (error) {
          throw new Error('credentials invalid')
        }
      }
    }),
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
  pages: {
    signIn: '/auth/login' 
  },
  callbacks: {
    async signIn(params) {
      const { user, account, profile } = params;

      try {
        await dbConnect()
        .then(() => "Connected to MongoDB Database")
        .catch((error) => {
          error: 'Connection Failed...!';
        })
        console.log(profile)
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

function authorize(credentials: any, req: any): any {
  throw new Error("Function not implemented.");
}
