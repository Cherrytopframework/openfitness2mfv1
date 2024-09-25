import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');


export default defineConfig({
    entry: './src/index.ts',
    context: __dirname,
    // Javascript / Typescript support
    module: {
        rules: [
        {
            test: /\.jsx$/,
            use: {
            loader: 'builtin:swc-loader',
            options: {
                jsc: {
                parser: {
                    syntax: 'ecmascript',
                    jsx: true,
                },
                transform: {
                    react: {
                    pragma: 'React.createElement',
                    pragmaFrag: 'React.Fragment',
                    throwIfNamespace: true,
                    development: false,
                    useBuiltins: false,
                    },
                },
                },
            },
            },
            type: 'javascript/auto',
        },
        ],
    },
    output: {
        // set uniqueName explicitly to make HMR works
        uniqueName: 'openfitness',
    },
    // React support
    plugins: [
        pluginReact()
    ],
    server: {
        port: 3003
    },
    dev: {
        // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
        assetPrefix: true,
    },
    // Module federation support
    tools: {
        rspack: {
            output: {
                // You need to set a unique value that is not equal to other applications
                uniqueName: 'openfitness'
            },
            plugins: [
                // new HtmlWebpackPlugin(),
                new ModuleFederationPlugin({
                    name: 'openfitness',
                    exposes: {
                        './App': './src/Entry.tsx',
                    },
                    remotes: {
                        // production
                        mf2: 'mf2@https://cherrytopframeworktester.netlify.app/remoteEntry.js',
                    },
                    shared: ['react', 'react-dom'],
                }),
                new ReactRefreshPlugin(),
            ],
        },
    },
    devServer: { port: 3003 }
});
