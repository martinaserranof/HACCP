/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ["docx", "exceljs", "rss-parser"],
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
}
module.exports = nextConfig
