const path = require("path");
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './mainTs.ts'
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
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    }
};