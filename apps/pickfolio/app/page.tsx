'use client';

import { useEffect, useState } from 'react';
import { getPicks, type PickEntry } from '@pickfolio/server';

export default function Home() {
    const [entries, setEntries] = useState<PickEntry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPicks()
            .then((e) => setEntries(e))
            .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Welcome to Pickfolio
                    </h1>

                    {loading && <p className="text-zinc-500 dark:text-zinc-400">Loading entry…</p>}
                    {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
                    {!loading && !error && entries && (
                        <>
                            {entries?.map((entry: PickEntry) => (
                                <article
                                    key={entry.id}
                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                        {entry.artistName}
                                        {entry.bandName && ` — ${entry.bandName}`}
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {entry.location}
                                        {entry.eventName && ` · ${entry.eventName}`}
                                    </p>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </p>
                                    {entry.description && (
                                        <p className="mt-2 text-zinc-700 dark:text-zinc-300">{entry.description}</p>
                                    )}
                                </article>
                            ))}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
