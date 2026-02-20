'use server';

import { fetchPicks } from './db';

export async function getPicks() {
    return fetchPicks();
}
