import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { createCliente, getCliente } from "../controller/userController";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "online",
          response_type: "code",
        },
      },
      style: {
        bg: "#fca5a5",
      },
    }),
  ],

  session: {
    strategy: "jwt",
    secret: process.env.JWT_SECRET,
  },
 
  callbacks: {
    async signIn({ account, profile }) {
            
        const isNewUser = await getCliente(profile.email)
        if(isNewUser) return true
        if(!isNewUser) {
            const newUser = await createCliente(profile)
            return true
        }
        return false
    }
  },

  secret: process.env.NEXT_AUTH_SECRET,
});
