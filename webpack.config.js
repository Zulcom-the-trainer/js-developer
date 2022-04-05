const path = require("path");
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.js'
    ],
    devtool: 'source-map',
    mode: 'development',
    output: {
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    }
};