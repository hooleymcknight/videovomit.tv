import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma ?? new PrismaClient();

// only cache in dev — prod makes exactly one and never hot-reloads
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}