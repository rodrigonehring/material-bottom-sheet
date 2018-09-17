const commonPaths = require('./paths')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')
// const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  output: {
    filename: `${commonPaths.jsFolder}/[name].[hash].js`,
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
      root: commonPaths.root,
    }),
    // new ManifestPlugin({ fileName: 'asset-manifest.json' }),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: false,
}
