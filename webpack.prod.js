const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { output, devtool } = require('./webpack.dev');

module.exports = {
    // mode: 'production',
     mode: process.env.NODE_ENV === 'production' ? 'production' : null,
    entry: {
    main:  './src/index.ts',
    vendor: ['lodash'],
    }, 
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true 
    },
    devtool: 'source-map',
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                use: [{
                    loader: 'babel-loader',
                    options: {
                       presets: ['@babel/preset-env'],
                    },
                },
                'ts-loader',
            ],
                 exclude: /node_modules/ 
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
         {
             test: /\.(png|svg|jpg|jpeg|gif)$/i,
             type: 'asset/resource',
           },
        ]
    },
 resolve: {
         extensions: ['.tsx', '.ts', '.js'],
       },
       optimization:{
           minimize: true,
           minimizer: [
             new TerserWebpackPlugin(),
             new CssMinimizerPlugin(),
           ],
           splitChuncks: {
             cacheGroups:{
                vendor: {
                   test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                   name: 'vendors',
                   chunks: 'all',
                 },
             },
           },
       },
       plugins: [
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
           template: './src/index.html',
         }),
       ],
}