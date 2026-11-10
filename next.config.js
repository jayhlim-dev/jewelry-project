/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.cloud.google.com',
        pathname: '/**',
      }
    ],
  },

  redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://docs.netlify.com/frameworks/next-js/overview/',
        permanent: false,
      },
      {
        source: '/old-blog/:slug',
        destination: '/classics',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/netlify-templates/next-platform-starter',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  rewrites() {
    return [
      {
        source: '/blog',
        destination: '/classics',
      },
    ];
  },
};

export default nextConfig;
