/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['assets.coingecko.com', 'cdn.iconscout.com', 'upload.wikimedia.org', 'images.revain.org'],
    },
}

module.exports = nextConfig
