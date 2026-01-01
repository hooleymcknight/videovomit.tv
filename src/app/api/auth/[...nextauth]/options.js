// import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

export const options = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "guildiebot" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const allAccounts = await db.users.findFirst({
                    where: {
                        AND: [
                            {
                                OR: [
                                    { username: credentials?.username, },
                                    { email: credentials?.username, },
                                ]
                            },
                            {
                                type: 'admin'
                            }
                        ]
                    }
                });

                const isMatch = bcrypt.compareSync(credentials?.password, allAccounts?.password);
                if (allAccounts && isMatch) {
                    return allAccounts;
                }
                else if (allAccounts && !isMatch && credentials?.password === allAccounts?.password) {
                    console.log('you need to change your password.')
                    allAccounts.needsReset = true;
                    console.log(allAccounts.needsReset)
                    return allAccounts;
                }
                else {
                    return null;
                }

                // retrieve user data to verify
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = { id: "812", name: "hooleymcknight", password: "nothankyou" }
                // // the above is hard-coded, please dear god replace this after you read the above docs.
                // console.log(user);

                // if (credentials?.username === user.name && credentials?.password === user.password) {
                //     return user;
                // }
                // else {
                //     return null;
                // }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }
    }
}