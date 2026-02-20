import { PrismaPg } from '@prisma/adapter-pg';
import type { PickEntry } from './generated/prisma/client';
import { PrismaClient } from './generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Add it to your .env (e.g. in apps/pickfolio or packages/server).');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

/**
 * Returns all PickEntry records from the database.
 */
export async function fetchPicks(): Promise<PickEntry[]> {
    return prisma.pickEntry.findMany();
}

export type { PickEntry };
