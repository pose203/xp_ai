const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { use } = require('react');

module.exports = {
    entry: './src/main.tsx',
    output: {
        filename: '[name].[contenthash].js', //hash 更新时，
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            [
                                '@babel/preset-typescript', {

                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"]
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                },
                generator: {
                    filename: 'assets/images/[name].[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'public')
        },
        historyApiFallback: true
    },
    optimization: {
        usedExports: true,//tree shaking注释，没有使用的代码
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    chunks: 'all',
                    name: 'common',
                    priority: 1,
                    reuseExistingChunk: true
                }
            }
        }
    }
}