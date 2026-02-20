import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    transpilePackages: ['@pickfolio-monorepo/server', '@pickfolio-monorepo/ui'],
};

export default nextConfig;
