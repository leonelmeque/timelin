const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: 'src/index.tsx',
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js'
    },
    devTools: 'inline-source-map',
    devServer: {
        static: './dist'
    },
    module:{
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.tsx','.ts','.js'],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}