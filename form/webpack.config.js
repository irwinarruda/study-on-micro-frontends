const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
const PackageJson = require('./package.json');
const path = require('path');

// Dependencies from package.json
const PackageJsonDeps = PackageJson.dependencies;

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
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'form',
      filename: 'remoteEntry.js',
      shared: {
        ...PackageJsonDeps,
        mobx: {
          singleton: true,
          requiredVersion: PackageJsonDeps.mobx,
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
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
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
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: 'only',
    liveReload: true,
    port: 3002,
    historyApiFallback: true,
  },
};
