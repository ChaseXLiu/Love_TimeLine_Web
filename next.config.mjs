/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.myqcloud.com',
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;