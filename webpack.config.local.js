const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    mode: 'development',
    entry: [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?noInfo=true",
        "./src/frontend/main.js"
    ],
    output: {
        path: path.resolve(__dirname, 'public/javascript'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties"],
                            ['react-hot-loader/babel']
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
        modules: ['node_modules', './src']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({"process.env": {NODE_ENV: '"local"'}})
    ]
};
