const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = {
    dev: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            showErrors: true
        })
    ],
    prod: [
        new CleanWebpackPlugin(['dist'])
    ]
};

const devServer = {
    hot: true,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
        color: true
    }
};

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader'}
        ]
    }
];

const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
            }
        }
    }
};

module.exports = (env, options) => {
    const prod = config => {
        config.plugins = plugins.prod;
    };

    const dev = config => {
        config.plugins = plugins.dev;
        config.devtool = 'inline-source-map';
        config.devServer = devServer;
    };

    const config = {
        entry: {
            app: ['whatwg-fetch', 'babel-polyfill', `${path.resolve(__dirname, 'src')}/index.js`]
        },
        module: {
            rules
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        optimization
    };

    options.mode === 'development' ? dev(config) : prod(config);

    return config;
};