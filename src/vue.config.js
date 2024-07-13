// module.exports = {
// 	chainWebpack: config => {
// 	    // ...
// 	    var externals = {
// 	      'echarts': 'echarts',
//           vue: "Vue",
//           "element-plus": "ElementPlus",
// 	    }
// 	    config.externals(externals)
// 	    config.plugins.delete("prefetch") //配置可以取消首屏渲染时对组件js文件的预加载, 实现真正的按需加载
// 	},
// 	//...
// }

// module.exports = {
//     // 设置打包文件相对路径
//     publicPath: "./",
//     // 配置使用CDN
//     configureWebpack: {
//       externals: {
//         vue: "Vue",
//         "element-plus": "ElementPlus"
//       }
//     }
//   };
  
module.exports = {
    chainWebpack: config=>{
		config.plugins.delete('prefetch')
	}
  };
  
