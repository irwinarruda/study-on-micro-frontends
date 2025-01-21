const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
// const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js',
    // Clean dist file before build
    clean: true,
    publicPath: 'http://localhost:3000/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      dts: false,
      experiments: {
        federationRuntime: 'hoisted',
      },
      remotes: {
        host: 'host@http://localhost:3000/remoteEntry.js',
        reactApp: 'react@http://localhost:3001/remoteEntry.js',
        vue: 'vue@http://localhost:3002/remoteEntry.js',
        svelte: 'svelte@http://localhost:3003/remoteEntry.js',
      },
      exposes: {
        './Store': './src/providers/Store',
      },
      shared: {
        // './src/providers/Store': {
        //   singleton: true,
        // },
        ...PackageJsonDeps,
        mobx: {
          singleton: true,
          version: PackageJsonDeps.mobx,
        },
        ['mobx-state-tree']: {
          singleton: true,
          version: PackageJsonDeps['mobx-state-tree'],
        },
        react: {
          singleton: true,
          version: PackageJsonDeps.react,
        },
        ['react-dom']: {
          singleton: true,
          version: PackageJsonDeps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      minify: true,
      // Injects the script tag to the body instead of the head
      inject: 'body',
      // Prevents the defer
      scriptLoading: 'blocking',
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  resolve: {
    alias: TsConfigPaths,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // Open on yarn dev
    open: false,
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
