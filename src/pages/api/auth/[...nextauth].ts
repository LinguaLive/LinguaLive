import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";


// Need to connect to the database to store user information
// Need to import user model


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
    // // This is searching for the user in the database by their email and adding their _id from Mongo to the session object so it can be referenced globally in the app by the useSession hook
    // async session(params) {
    //   const { session } = params ;
    //   const sessionUser = await User.findOne({
    //     email: session.user.email
    //   })
    //   session.user.id = sessionUser._id.toString();
    //   return session;
    // },
    async signIn(params) {
      const { user, account, profile } = params;
      console.log(profile)
      try {
        // // check if user already exists
        // const userExists = await User.findOne({ email: profile.email });
        // // if not, create a new user
        // if (!userExists) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name.replace(" ", "").toLowerCase(),
        //     image: profile.picture
        //   })
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
}

export default NextAuth(authOptions);