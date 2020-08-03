
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const constants = require('./constants');
const entryPoints = require('./entryPoints');

let entries = {};
let plugins = [];
for (let i = 0; i < entryPoints.apps.length; i++) {
    const entryPoint = entryPoints.apps[i];

    entries[entryPoint.name] = entryPoint.path + '/app.tsx';
    plugins.push(new HtmlWebpackPlugin({
        inject: false,
        filename: '../../extraWebapp/rstudio-viewer.html',
        template: 'webpack/rstudioviewer.template.html'
    }))
}

plugins.push(new MiniCssExtractPlugin());

module.exports = {
    context: constants.context(__dirname),

    mode: 'production',

    devtool: 'source-map',

    entry: entries,

    output: {
        path: constants.outputPath(__dirname),
        publicPath: './', // allows context path to resolve in both js/css
        filename: '[name].js'
    },

    module: {
        rules: constants.loaders.TYPESCRIPT_LOADERS.concat(constants.loaders.STYLE_LOADERS)
    },

    resolve: {
        extensions: constants.extensions.TYPESCRIPT
    },

    plugins: plugins
};

