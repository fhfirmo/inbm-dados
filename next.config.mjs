/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firmoconsultoria.com.br',
      },
    ],
  },
};

export default nextConfig;
