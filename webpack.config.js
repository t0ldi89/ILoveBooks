const path = require("path");
const entryFile = "index.js";

module.exports = {
    entry: ["whatwg-fetch", `./${entryFile}`],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, `/build`),
        publicPath: '/build/'
    },
    devServer: {
        contentBase: path.join(__dirname),
        publicPath: '/build/',
        compress: true,
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
