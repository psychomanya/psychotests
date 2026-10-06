/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Node native modules like node:sqlite
  serverExternalPackages: ['node:sqlite'],
};

export default nextConfig;
