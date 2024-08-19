import withLess from 'next-plugin-antd-less';

const nextConfig = {
  reactStrictMode: true,
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
        }
      ],
  },
};

export default withLess({
  ...nextConfig,
  lessVarsFilePath: './src/styles/variables.less', // Path to your Less variables file
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },
});
