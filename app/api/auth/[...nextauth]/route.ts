import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url === baseUrl) {
                return '/dashboard';
            }
            return url;
        },
    },
})

export { handler as GET, handler as POST };
