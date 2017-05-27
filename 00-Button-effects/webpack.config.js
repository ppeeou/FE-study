const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test : /\.js$/,
                include : path.resolve(__dirname,'src'),
                use : [{
                    loader : 'babel-loader',
                    options : {
                        presets : [
                            ['es2015', { modules : false }]
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}

module.exports = config;