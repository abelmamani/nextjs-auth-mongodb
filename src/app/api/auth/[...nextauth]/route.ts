import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*******"}
            },
            async authorize(credentials, req){
                //const user = {id: "1", fullname: "abel", email: "ahbel@gmail.com"};
                await connectDB();
                const userFound = await User.findOne({email: credentials?.email}).select("+password")
                if(!userFound){
                    throw new Error("invalid credentials");
                }
                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if(!passwordMatch){
                    throw new Error("invalid credentials");
                }
                console.log(userFound)
                return userFound;
            }
        })
    ],
    callbacks:{
        jwt({account, token, user, profile, session}){
            //console.log({account, token, user, profile, session})
            if(user) token.user  = user
            return token;
        },
        session({session, token}){
            
           //console.log(session)
            session.user = token.user as any;
            return session;
        }
    }, 
    pages: {
        signIn: '/login'
    }
})
export { handler as GET, handler as POST }