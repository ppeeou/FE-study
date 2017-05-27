const webpack = require('webpack');
const path = require('path'); 
const appPath = path.resolve(__dirname, 'app'); 
const config = {

    context: path.resolve(appPath, 'src'),

    entry: './app.js',

    output: {
        path: path.resolve(appPath, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/app/dist/'
    },

    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /(node_modules)/,
                include: path.resolve(appPath, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', { modules: false }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            } 
        ]
    }
     
}

module.exports = config;