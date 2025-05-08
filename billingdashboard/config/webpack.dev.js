// config/webpack.dev.js
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8085,
        historyApiFallback: {
            index: '/index.html',
        },
        open:false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    output: {
        publicPath: 'http://localhost:8085/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'billingdashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './BillingDB': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
