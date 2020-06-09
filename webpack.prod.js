const htmlWebPackPlugin        = require('html-webpack-plugin');
const miniCssExtractPlugin     = require('mini-css-extract-plugin');
const OptimizerCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin               = require('copy-webpack-plugin');
const MinifyPlugin             = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }   = require('clean-webpack-plugin');


module.exports = {

    mode: 'production',
    optimization: {
       minimizer: [new OptimizerCssAssetsPlugin()] 
    },

    output: {
        filename: 'main.[contentHash].js'

    },
    module: {
        rules: [
            { test: /\.js$/,
                 exclude: /node_modules/,
                 use:['babel-loader']  
                }
          ]
          
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
            filename:'[name].[contentHash].css',
            ignoreOrder: false


        }),

        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' }
              
            ]
          }),
          new MinifyPlugin(),
          new CleanWebpackPlugin(),
          
        ]
      }