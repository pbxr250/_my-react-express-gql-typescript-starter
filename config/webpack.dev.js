const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development",
    entry: "./client/src/index.tsx",
    output: {
        filename: "bundle-dev.js",
        path: path.resolve(__dirname, "..", "dist/client"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", ".html"],
    },
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, "..", "client/public"),
        port: 3000,
        proxy: [
            {
                path: "/*",
                target: "http://localhost:3100"
            }
        ],
        historyApiFallback: true
    },
    devtool: "source-map",
    module: {
        rules: [
            {  
                test: /\.ts(x?)$/, 
                loader: "ts-loader",
                options:{
                    configFile: "tsconfig.client.json"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg)/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "..", "client/public") + "/index.html",
          hash: true
        })
    ]
};