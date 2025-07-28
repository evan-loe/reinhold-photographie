/** @type {import('next').NextConfig} */

const nextConfig = {
  // Comment out static export for now since we're using API routes
  // output: 'export',
  // trailingSlash: true,
  images: {
    // unoptimized: true, // Only needed for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;