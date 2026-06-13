// import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import TwitchProvider from "next-auth/providers/twitch";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcryptjs';

export const options = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await db.users.findFirst({
                    where: {
                        AND: [
                            {
                                OR: [
                                    { username: credentials?.username, },
                                    { email: credentials?.username, },
                                ]
                            }
                        ]
                    }
                });
                if (!user) return null;
                const valid = bcrypt.compareSync(credentials.password, user.password);
                if (!valid) return null;
                // returning the bare minimum for session...
                return {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    role: user.role ?? "user",   // someday, roles might matter
                };
            },
        }),
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
        }),
    ],
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        }
    }
}