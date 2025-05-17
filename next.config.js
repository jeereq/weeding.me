/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    fontLoaders: [
      { loader: 'default', options: { timeout: 15000 } }
    ]
  }
};

module.exports = nextConfig;