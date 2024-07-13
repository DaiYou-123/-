// webpack.skeleton.conf.js

const path = import('path')
const nodeExternals = import('webpack-node-externals')
const VueSSRServerPlugin = import('vue-server-renderer/server-plugin') 
    //vue-server-renderer 是 Vue.js 的一个包，它提供了在 Node.js 服务器端进行渲染的功能1。这个包主要用于 Vue.js 的服务器端渲染 (Server-Side Rendering, SSR)。

    module.exports = {
        target: 'node',
        devtool: '#source-map',
        entry: './src/router/content/skeleton/skeleton.entry.js',
        output: {
            // path: path.resolve(__dirname, '../dist'),
                publicPath: '/dist/',
                    filename: '[name].js',
                        libraryTarget: 'commonjs2'
  },
module: {
    noParse: /es6-promise\.js$/,  // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
},
performance: {
    hints: false
},
externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
}),
    plugins: [
        // 这是将服务器的整个输出构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json`
        new VueSSRServerPlugin({
            filename: 'skeleton.json'
        })
    ]
}
