const nextConfig = {
  // async redirects(test) {
  //   return [
  //     {
  //       source: '/',
  //       destination: '',
  //       permanent: false,
  //     },
  //   ];
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard pattern
      },
      {
        protocol: 'http',
        hostname: '**', // Wildcard pattern
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
