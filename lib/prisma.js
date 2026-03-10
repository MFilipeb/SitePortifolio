import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_qR6hZPInN2JX@ep-odd-dawn-ac27xw8w.sa-east-1.aws.neon.tech/neondb?sslmode=require"
            }
        }
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
