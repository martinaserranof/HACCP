/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ["puppeteer-core"] },
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
}
module.exports = nextConfig
