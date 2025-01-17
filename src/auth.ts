import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import AppError from "./lib/utils/app-error";
import { cookies } from "next/headers";
import GithubProvider from "next-auth/providers/github";
import GoogleProfile from "next-auth/providers/google";
import FacebookProfile from "next-auth/providers/facebook";
import TwitterProfile from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    
  },
  providers: [

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProfile({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProfile({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    TwitterProfile({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),


    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });


        const payload: APIResponse<LoginResponse> = await response.json();

        // If login was successful, return the user data alongside the token
        if (payload.message === "success") {
          // Save the token in cookies separately
          cookies().set("token", payload.token, {
            httpOnly: true,
          });
        
          // Return user data alongside the token
          return {
            token: payload.token,
            ...payload.user,
          };
        }

        // Otherwise, throw the error returned from the backend
        throw new AppError(payload.message, payload.statusCode);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
       
        token.token = user.token;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token._id = user._id
       
     
      
        
      }

      return token;
    },
    session: ({ session, token }) => {
      session.username = token.username;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email;
      session.phone = token.phone;
      session.role = token.role;
      session._id = token._id
      

     
      
      return session;
    },
  },
};
