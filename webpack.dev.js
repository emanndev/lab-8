const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true // Clean the output directory before emitting files.
    },
       devtool: 'inline-source-map',
       devServer: {
         static: './dist',
         hot: true,
         open: true,
         port: 3000,
       },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: 'ts-loader', 
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
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}