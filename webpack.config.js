var path=require('path');
var fs=require('fs');
var webpack=require('webpack');
var baseurl=path.resolve(process.cwd(),'src');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//�������·��
module.exports = {
    debug: false,
    entry: genEntries(),
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
        chunkFilename:"[name].chunk.js"
    },
    module: {
        loaders: [ {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test: /\.(jpg|png|gif)$/,
            loader: "file-loader?name=images/[hash].[ext]"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0', 'react']
    },
    resolve: {
        // requireʱʡ�Ե���չ�����磺require('module') ����Ҫmodule.js
        extension: ['', '.js']
    },
    plugins: [
        //�ṫ��js��common.js�ļ���
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        //����ʽͳһ������style.css��
        new ExtractTextPlugin("style.css", {
            allChunks: true,
            disable: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: '#source-map'
};
function genEntries() {
    var jsDir = path.resolve(baseurl);
    var names = fs.readdirSync(jsDir);
    var map = {};

    names.forEach(function (name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';
        if (entry) map[entry] = [entryPath];
    });
    return map;
}