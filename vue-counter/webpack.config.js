const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
// const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TsConfig = require('./tsconfig.json');
const PackageJson = require('./package.json');
const path = require('path');

// Dependencies from package.json
const PackageJsonDeps = PackageJson.dependencies;

// Uses tsconfig paths dynamicly to create webpack aliases
const TsConfigPaths = Object.entries(TsConfig.compilerOptions.paths).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key.replace('/*', '')]: path.resolve(value[0].replace('/*', '').replace('*', '')),
  }),
  {},
);

/** @type {import('webpack').Configuration}  */
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js',
    clean: true,
    publicPath: 'http://localhost:3002/',
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'vue',
      filename: 'remoteEntry.js',
      dts: false,
      experiments: {
        federationRuntime: 'hoisted',
      },
      shared: {
        ...PackageJsonDeps,
        mobx: {
          singleton: true,
          version: PackageJsonDeps.mobx,
        },
      },
      remotes: {
        host: 'host@http://localhost:3000/remoteEntry.js',
      },
      exposes: {
        './render': './src/utils/render',
      },
    }),
    new HtmlWebpackPlugin({
      minify: true,
      template: path.join(__dirname, 'public', 'index.html'),
      scriptLoading: 'blocking',
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true, // optional
            },
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true, // optional
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      ...TsConfigPaths,
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: false,
    hot: 'only',
    liveReload: true,
    port: 3002,
    historyApiFallback: true,
    liveReload: true,
    watchFiles: './src',
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
