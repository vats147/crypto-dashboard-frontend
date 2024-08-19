import withLess from 'next-plugin-antd-less';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withLess({
  lessVarsFilePath: './src/styles/variables.less', // Path to your Less variables file
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },
});
