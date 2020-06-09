const htmlWebPackPlugin    = require('html-webpack-plugin');

const miniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizerCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
       minimizer: [new OptimizerCssAssetsPlugin()] 
    },
    module: {
        rules: [
            {
            test: /\.css$/,
            exclude: /style\.css$/,
            use: [
                'style-loader',
                'css-loader'

            ]
            },
            {
                test: /style\.css$/,
            use: [
                miniCssExtractPlugin.loader,
                'css-loader'
            ]
            },

            {

            test: /\.html$/i,
             loader: 'html-loader',
                    options: {
                        attributes: false,
                        minimize: false
                    },
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false
                }

            }]
        },
          
    ]


    },
    

    plugins: [
        new htmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'


        }),
        new miniCssExtractPlugin({
            filename:'[name].css',
            ignoreOrder: false


        }),

        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },
              
            ],
          }),
        ],
      };