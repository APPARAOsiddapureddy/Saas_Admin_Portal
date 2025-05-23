const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 
            'Access-Control-Allow-Headers': 'Content-Type', 
          },
        historyApiFallback: {
            index: '/index.html',
        },
    },
    output: {
        publicPath: 'http://localhost:8080/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
                usermanagement: 'usermanagement@http://localhost:8084/remoteEntry.js',
                billingdashboard:'billingdashboard@http://localhost:8085/remoteEntry.js'
            },
            shared: packageJson.dependencies,
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);
