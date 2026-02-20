'use client';

import { Button } from '@pickfolio/ui';
import Link from 'next/link';

export default function AdminHome() {
    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">Pickfolio Admin</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Admin app.</p>

            <Button asChild>
                <Link href="/add-pick">Add Pick</Link>
            </Button>
        </div>
    );
}
