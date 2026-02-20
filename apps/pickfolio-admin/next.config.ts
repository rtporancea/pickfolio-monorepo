import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    transpilePackages: ['@pickfolio-monorepo/shared'],
};

export default nextConfig;
