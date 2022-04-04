module.exports = {
    entry: './main.js',
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
};