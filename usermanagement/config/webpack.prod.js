// config/webpack.prod.js
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common'); // Fixed from webpack.config
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/user/latest/', 
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'usermanagement',
            filename: 'remoteEntry.js',
            exposes: {
                './UserApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);