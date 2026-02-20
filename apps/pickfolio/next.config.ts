import { Dotenv } from 'dotenv-mono';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: Object.fromEntries(
        Object.entries(
            [1, 2, 3].reduce((dotenv) => (dotenv.loadFile(), (dotenv.cwd += '/..'), dotenv), new Dotenv()).env,
        ).filter((k) => !/^(__|NODE_)/.test(k[0])),
    ),
    reactCompiler: true,
    transpilePackages: ['@pickfolio-monorepo/server', '@pickfolio-monorepo/ui'],
};

export default nextConfig;
