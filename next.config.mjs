import withLess from 'next-plugin-antd-less';

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
        },
        {
            protocol: 'https',
            hostname: 's2.coinmarketcap.com',
        },
        {
            protocol : "https",
            hostname: '**'
        },
        {
          
            protocol : "http",
            hostname: '**'
        
        }
      ],
  },
};

export default withLess({
  ...nextConfig,


  webpack(config) {
    return config;
  },
});
