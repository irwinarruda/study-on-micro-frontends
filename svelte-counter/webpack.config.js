const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
// const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SveltePreprocess = require('svelte-preprocess');
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

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: mode,
  entry: {
    main: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js',
    clean: true,
    publicPath: 'http://localhost:3003/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      inject: 'body',
      scriptLoading: 'blocking',
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ModuleFederationPlugin({
      name: 'svelte',
      filename: 'remoteEntry.js',
      dts: false,
      experiments: {
        federationRuntime: 'hoisted',
      },
      exposes: {
        './render': './src/utils/render',
      },
      remotes: {
        host: 'host@http://localhost:3000/remoteEntry.js',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]s/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.svelte$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
          {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              preprocess: SveltePreprocess({}),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: { fullySpecified: false },
      },
    ],
  },
  resolve: {
    alias: TsConfigPaths,
    extensions: ['.ts', '.js', '.svelte'],
    conditionNames: ['svelte', 'require', 'node'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3003,
    open: false,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
