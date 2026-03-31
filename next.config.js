/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip type checking and linting during Vercel build
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: { serverComponentsExternalPackages: ["docx", "exceljs"] },
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
}
module.exports = nextConfig
