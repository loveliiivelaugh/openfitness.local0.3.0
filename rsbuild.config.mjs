import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

// const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
// most modern module federation plugin
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');


export default defineConfig({
  // Javascript / Typescript support
  module: {
    rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.css$/, use: ["postcss-loader"], type: "css" },
        { test: /\.(js|jsx)$/, use: 'babel-loader' },
        { test: /\.(ts|tsx)$/, use: 'ts-loader' },
    ],
  },
  resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolves these extensions
      alias: {
          "@": path.resolve(__dirname, "./src"),
          "@/lib": path.resolve(__dirname, "./src/lib"),
          "@lib": path.resolve(__dirname, "./src/lib"),
          "@api": path.resolve(__dirname, "./src/utilities/api"),
          "@graphql": path.resolve(__dirname, "./src/utilities/api/graphql"),
          "@database": path.resolve(__dirname, "./src/utilities/database"),
          "@store": path.resolve(__dirname, "./src/utilities/store"),
          "@scripts": path.resolve(__dirname, "./src/utilities/scripts"),
          "@helpers": path.resolve(__dirname, "./src/utilities/helpers"),
          "@styles": path.resolve(__dirname, "./src/utilities/styles"),
          "@components": path.resolve(__dirname, "./src/components"),
          // "@framework": "mf2/*",
      },
  },
  plugins: [pluginReact()],
  server: {
    port: 3005,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin"
    }
  },
  // Module federation support
  tools: {
    rspack: {
        output: {
            // You need to set a unique value that is not equal to other applications
            uniqueName: 'openfitness'
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'openfitness',
                exposes: {},
                remotes: {},
                shared: {}
            }),
            // new ReactRefreshPlugin()
        ]
    }
  }
});
