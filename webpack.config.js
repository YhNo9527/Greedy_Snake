const path = require('path');
// 该插件能自动生成一个引入该项目中所有js，css文件的html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 该插件能在每次生成新的文件前删除旧文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // 指定是开发模式还是生产模式
    mode: "production",
    // 指定入口文件
    entry: "./src/GreedySnake/index.ts",

    // 指定打包后的文件所在目录
    output: {
        // 执行打包文件的目录
        path: path.resolve(__dirname, './dist'),
        // 打包后的文件名
        filename: "main.js",

        /* // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        } */
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                test: /\.ts$/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器   
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定corejs版本
                                        "corejs": "3",
                                        // 使用corejs的方式"usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        // 清除旧的生成文件
        new CleanWebpackPlugin(),
        // 自动创建一个html文件并将js文件引入
        new HtmlWebpackPlugin(
            {
                // 可以直接设置网页属性
                // title: '这是插件自动生成的网页'

                // 按照模板生成
                template: "./src/index.html"
            }
        )
    ],
    // 告诉webpack  ts和js文件能够作为模块
    // 默认情况下，webpack认为ts不能作为模块，如果ts文件中有模块引用，解析时就会报错
    resolve: {
        extensions: ['.ts', '.js']
    }
}