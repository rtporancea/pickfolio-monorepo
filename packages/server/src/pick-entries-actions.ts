'use server';

import type { PickEntry } from './generated/prisma/client';
import { prisma } from './prisma';

export async function getPicks(): Promise<PickEntry[]> {
    return prisma.pickEntry.findMany();
}

export async function createPick(
    pick: Pick<PickEntry, 'artistName' | 'bandName' | 'location' | 'eventName' | 'date' | 'description'>,
): Promise<PickEntry> {
    return prisma.pickEntry.create({
        data: pick,
    });
}
