const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // mode: 'development',
     mode: process.env.NODE_ENV === 'production' ? 'development' : null,
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true 
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
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
      assetModuleFilename: 'assets/images/[name][ext][query]', // Preserve original file name and structure
    },
}