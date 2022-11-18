
// let cssConfig = {
//..."css-loader?url=false"...
//}
//The part above is very important. 

const webpack = require('webpack')

const currentTask = process.env.npm_lifecycle_event //  the npm_lifecycle_event environment variable is set to whichever stage of the cycle is being executed. 
//https://docs.npmjs.com/cli/v8/using-npm/scripts

const path = require('path') //The path module provides utilities for working with file and directory paths. 
//https://nodejs.org/api/path.html


const {CleanWebpackPlugin} = require('clean-webpack-plugin') //A webpack plugin to remove/clean your build folder(s).
//https://github.com/johnagan/clean-webpack-plugin
/*
* By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.
*/



const MiniCssExtractPlugin = require('mini-css-extract-plugin') //https://webpack.js.org/plugins/mini-css-extract-plugin/
/*
*This plugin extracts CSS into separate files. It creates a CSS file per JS file 
*which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
*/


const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') //https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#root
/*
* Use CSS nano to minimize your css
*/


const HtmlWebpackPlugin = require('html-webpack-plugin') //https://webpack.js.org/plugins/html-webpack-plugin/#root
/*
The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
*/
// course 62nd

const fse = require('fs-extra') // let's leverage this package to search for any HTML file. course 63rd

const postCSSPlugins = [
  require('postcss-import'),  //@import feature
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  // If in the future the creator of the postcss-hexrgba package
  // releases an update (it is version 2.0.1 as I'm writing this)
  // then it will likely work with PostCSS V8 so you can uncomment
  // the line below and also install the package with npm.
  //require('postcss-hexrgba'), //npm run postcss-hexrgba
  require('autoprefixer')
]



//https://webpack.js.org/contribute/writing-a-plugin/
/*
It is a class following basic plugin architecture, which contains only an apply function.
And we need to push it in the final plugins property.
*/
class RunAfterCompile{
  /*copy images... course 63rd*/
  //https://webpack.js.org/api/compiler-hooks/#done
  /*
  Executed when the compilation has completed. This hook is not copied to child compilers.
  */
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function() {
      fse.copySync('./app/assets/images', './docs/assets/images') //copy files from the lhs parameter folder to the rhs parameter
                                                                  // folder.
    })
  }
}

const cssConfig = {
  test: /\.css$/i,    //case insensitive
  use: ["css-loader?url=false",
   { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
}

const pages = fse.readdirSync('./app').filter( function(file) {
  return file.endsWith('.html')
}).map((page) => {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
}) /*
readdirSync read every single file in this folder.

map will generate a new array in this array.
we want an array with multiple html file names.
*/

pages.push(new webpack.HotModuleReplacementPlugin())  //To fully enable hot replacement


const javascriptConfig =
      //add a rule only works for JS file.
      {
        test: /\.js$/,
        exclude: /(node_modules)/, //ignore the node module folder
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'   //react part
                      //https://babeljs.io/docs/en/babel-preset-react
                      ,'@babel/preset-env']  //To transpile ES6 to backward-compatible files.
            //https://webpack.js.org/loaders/babel-loader/
            //It is an array that could have multiple presets.
          }
        }
      }

const config = {
  experiments: {
    topLevelAwait: true,
  },
  entry: './app/assets/scripts/App.js',
  plugins: pages,//course 62nd
  module: {
    rules: [cssConfig, javascriptConfig]
  }
}

if (currentTask == 'dev') {
  cssConfig.use.unshift('style-loader')
  config.output = {
    filename: 'bundled.js', //This file will be included in the index.html file.
    path: path.resolve(__dirname, 'app')
  }
  //By default, the dev-server will reload/refresh the page when file changes are detected.
  //hot be true or watchFiles must be set. 
  config.devServer = {  //With devServer, we no longer need watch:true to be explicitly set again.

    /*
    before:
    If any change happens in these supervised files, our browser will experience a full reload.
    Provides the ability to execute custom middleware prior to all other
     middleware internally within the server. This could be used to define custom handlers,
    */
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'), //tell the server where to serve content from.
    //The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
    hot: true, 
    port: 3000,
    host: '0.0.0.0'
  }
  config.mode = 'development'
}

if (currentTask == 'build') {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs')
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: {chunks: 'all'},
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]  //...: default optimizer. It means that except default optimizer, we also want css
    //-minimizer-plugin
  }

  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
                       new RunAfterCompile()
  )
}

module.exports = config
