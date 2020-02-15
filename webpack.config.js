const path = require('path');
const webpack = require('webpack');
const services = require('./services.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
    const isProduction = env === 'production';
    const ExtractCss = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill', './src/app.tsx'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    test: /\.s?css$/,
                    use: ExtractCss.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        plugins: [
            ExtractCss,
            new webpack.DefinePlugin({
                'process.env.BASE_SERVICE_URL': JSON.stringify(process.env.BASE_SERVICE_URL),
                SERVICES: Object.keys(services).reduce(
                    (serializedMap, serviceKey) =>
                        Object.assign({}, serializedMap, {
                            [serviceKey]: JSON.stringify(services[serviceKey])
                        }),
                    {}
                )
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4000',
                'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
                'Access-Control-Allow-Credentials': 'true'
            }
        }
    };
};


