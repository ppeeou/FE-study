const path = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const appPath = path.resolve(__dirname,'app');

const extractPlugin = new extractTextWebpackPlugin({
    filename: 'main.css'
})

const config = {
    context: path.resolve(appPath),

    entry: './src/app.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(appPath, 'dist'),
        publicPath: '/app/dist/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [ 'css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractPlugin
    ],
    devServer: {
        contentBase: path.join(appPath),
        publicPath: "/app/dist/",
        port: 8080
    }
}

module.exports = config;
