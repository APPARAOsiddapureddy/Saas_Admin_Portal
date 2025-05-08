// config/webpack.dev.js
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8084,
        historyApiFallback: {
            index: '/index.html',
        },
        open:false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    output: {
        publicPath: 'http://localhost:8084/',
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

module.exports = merge(commonConfig, devConfig);
