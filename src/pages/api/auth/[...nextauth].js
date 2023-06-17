import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

export default NextAuth({
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                authorization:{
                    params:{
                        prompt:'consent',
                        access_type :'offline',
                        response_type : 'code'
                    }
                }
            })
        ],
        session:{

            strategy: "jwt",
            secret: process.env.JWT_SECRET
        },

        callbacks:{
            async signIn({account,profile,}) {
                
                if(account.provider === 'google'){
                    console.log(profile);
                    return profile.email_verified
                }

                return false
            }
        },
        secret: process.env.NEXT_AUTH_SECRET,
})