import { APP_NAME } from '@pickfolio/server';

export default function AdminHome() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16">
                <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">{APP_NAME} Admin</h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Admin app — shared code lives in{' '}
                    <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">packages/shared</code>.
                </p>
            </main>
        </div>
    );
}
