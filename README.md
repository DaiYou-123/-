## 项目介绍

    该项目是为了满足公司🚩内部产品管理🚩的需求而开发的，以web端为主，
    使用**vue3**框架开发了一个能够有效进行双向控制和跟踪的产品管理系统。
    主要包括用户管理、产品管理、产品新增、订单管理以及查询修改数据等功能。  
    技术架构：Vue3+TypeScript, axios, Element-plus, vue-router, ECharts, pinia
---
#### 安装element-plus
使用element-plus进行页面的布局，包括：     
菜单导航、面包屑导航、树形控件、表单、按钮、弹出消息框、图片上传等
```javascript
 1.npm install element-plus --save
 2.引入
    (1)全导入
        // main.ts
        import ElementPlus from 'element-plus'
        import 'element-plus/dist/index.css'
        app.use(ElementPlus)
        app.mount('#app')
    (2)按需导入(为了优化首屏渲染时间和性能--本项目选择了按需导入)
        1. 下载依赖包
            npm install -D unplugin-vue-components unplugin-auto-import
        2. 配置vite.config文件 
```
#### 安装其他依赖
```javascript
npm i normalize.css -S
npm i axios -S  
npm i querystring -S
npm i echars -S
    按需导入
    import * as echarts from 'echarts/core';
    需要将使用的echarts组件注册 在组件中使用时引用
npm i pinia
npm install @wangeditor/editor --save
npm install @wangeditor/editor-for-vue@next --save
npm install xlsx file-saver -S
```

<style>
pre {
  white-space: pre-wrap; /* 自动换行 */
  word-wrap: break-word; /* 强制长单词换行 */
}
</style>
#### 项目打包优化
```javascript
项目使用vite进行打包
npm run build
打包后使用lighthouse进行测试发现渲染时间太慢了，就对打包过程进行了优化
为了让用户等待过程中，减少焦虑，做了首屏的骨架屏
1.骨架屏
    我最初想使用 Vue 3 中的 Suspense 内置组件来处理组件加载。
    我认为 App.vue 作为整个页面最先挂载和执行的组件，是组件的入口，而首屏加载的组件应该在这里进行加载。
    我计划将首屏加载的组件作为异步组件，在加载时使用 Suspense 组件提供的插槽功能来分别判断加载中和
    加载后的状态，并对不同状态进行内容呈现，从而实现异步加载时显示骨架屏幕。
    然而，这种方法行不通。事实上，App.vue 确实是项目的根组件，而 src/main.ts 是项目的入口文件，会将这个根组件进行挂载。
    挂载过程如下：
    当 createApp(App).mount('#app') 被调用时，Vue 会创建一个新的 Vue 实例，并将 App.vue 组件的内容渲染到 index.html 中的 #app 元素内。
    之后，Vue 的响应式系统会开始工作，监听数据的变化并更新 DOM。

    也就是说，首次加载时，只有当main.ts里的app.use的组件挂载完毕之后，
    渲染后的内容才会取代index.html中的#app，内容才会在页面中呈现。
    因此，在 #app 挂载之前，可以先将它的CSS样式设置为骨架屏，
    当内容渲染成功之后，骨架屏的样式会被实际内容取代。

2.拆分小代码块打包
----vite比webpack好，它已经分块好了，vue3默认打包时自带tree-shaking
    
    为什么要分包？
        1.浏览器在请求静态资源时，只要静态资源的名称不变，它就不会重新请求 xxx.js资源。
        在我们修改代码后进行打包时，很多代码块/静态资源是不需要进行重新渲染的，
        所以我们将这部分资源单独打包，分包出来，再次打包时，它们的资源名称不会改变，就不会重新被渲染。
        2.减少初始加载时间，将应用程序的代码拆分成多个较小的包，可以减少初始加载时需要下载的代码量，从而提高页面的加载速度
    
    在vite.config中对build进行配置    
    build: {
        rollupOptions: {
        treeshake: true, // (默认开启)开启 Tree Shaking，消除未使用的代码，减小最终的包大小
        output: { // 资源分包
            chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称 name输出名字 hash内容的哈希值
            entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称 
            assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等 ext-表示文件扩展名

            manualChunks(id) {
            if (id.includes('node_modules')) {
                //rollup的output.manualChunks这一配置可以实现分包策略
                return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
            },
        }
        }
    }
3.代码压缩成GIZP格式
（需要服务器也进行gizp的压缩，这样才能加载前端打包好的gizp到服务器里面使用）
（配置nginx）（让浏览器访问的是一个从服务器发送的压缩文件）
 常见的图片（JPEG、PNG、GIF）都属于非文本类型，gzip 都不支持压缩

**在本地设置gizp压缩**
    下載依賴
    npm i vite-plugin-compression -D
    在vite.config中plugins引入
        import viteCompression from 'vite-plugin-compression'
        
        //在plugins配置数组里添加gzip插件
        viteCompression({
            verbose: true, // 默认即可
            disable: false, // 开启压缩(不禁用)，默认即可
            deleteOriginFile: false, // 删除源文件
            threshold: 5120, // 压缩前最小文件大小
            algorithm: 'gzip', // 压缩算法
            ext: '.gz' // 文件类型
        })


**在nginx服務端部署gizp压缩**
    # 开启或者关闭gzip模块(on|off)
    gzip on;
    # 允许压缩的页面最小字节数, 默认值是0，不管页面多大都压缩。建议设置成大于1k的字节数，小于1k可能会越压越大
    gzip_min_length 1k;
    # 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。例如 4 4k 代表以4k为单位，按照原始数据大小以4k为单位的4倍申请内存。
    gzip_buffers 4 16k;
    # 识别http的协议版本。由于早期的一些浏览器或者http客户端，可能不支持gzip自解压，用户就会看到乱码，所以做一些判断还是有必要的。
    #gzip_http_version 1.0;
    # gzip压缩比，1压缩比最小处理速度最快，9 压缩比最大但处理最慢（传输快但比较消耗cpu）。
    gzip_comp_level 2;
    # 匹配MIME类型进行压缩，（无论是否指定）"text/html"类型总是会被压缩的。
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    # 和http头有关系，加个vary头，给代理服务器用的
    gzip_vary off;
    # 表示IE6及以下禁止压缩
    gzip_disable "MSIE [1-6]\.";


 **在nginx服务端中其他配置**
        #解决问题1：刷新页面404
        #无法匹配资源时候，把index.html重定向出来，js有响应后，程序正常执行
        location / {
            root   D:\front_end_temp\dist_2_gizp;
            index  index.html index.htm; 
            try_files $uri $uri/ /index.html; 
        }
        #解决问题2：后端接口数据拿不到问题
        # 配置代理服务失效，需要自己配置反向代理
        location /api/ {
            # 设置代理目标
            proxy_pass http://localhost:6688/; # 我的后端数据在本地上
        }
            #error_page  404              /404.html;
            # redirect server error pages to the static page /50x.html
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
            root   html;
        }

4.使用内容分发网络（CDN）
     需要将依赖的插件资源从别的网站上面下载下来，但是这个网站不一定稳定（不知道访问的人多不多、以及服务器会不会挂），
     所以为了稳定和安全性，最好不用。
     实际上，我使用CDN主要还是请求element和echarts的数据，这两个依赖很大都达到了2MB以上，
     所以正常传输时间会很长，但是使用CDN还是很好的解决这个问题，反而是按需引用后分包加载更有效。
     所以最后也没有使用这个方法。   
```
#### 其他需要注意的点
```javascript
**引入echarts进行可视化展示时，刷新/换页面不执行的问**
 // 旧代码
 // let myChartPei = echarts.init(document.getElementById("box1"));

 // 移除了_echarts_instance属性， 然后在该元素上初始化了一个新的ECharts实例
 let dsiab_com = document.getElementById("box1")
 dsiab_com.removeAttribute('_echarts_instance_')
 var myChartPei = echarts.init(dsiab_com);

**使用element-plus弹出消息框时，需要引入css样式，不然没有效果**
 import { ElMessage, ElMessageBox } from 'element-plus'
 ElMessageBox.confirm(
    '你确定删除当前行的数据，确认删除是不可逆的操作?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )

**跳转路由链接，焦点会丢失，需要加上activeMenu**
   在路由下添加meta元信息 
   meta:{ // 附带元信息，可以传递 activeMenu
        activeMenu:'/product/list', //写上值 防止失去焦点
        title:'产品操作'
        }
   在menu.vue组件的默认激活属性上 加上
   :default-active="$router.currentRoute.value.meta.activeMenu || $router.currentRoute.value.path"
   router=true

**上传图片，图片地址的拼接、多组图片上传、JSON格式转换**
    url = host+'/'+ response.url.slice(7);

    ruleForm.image.push(url);

    JSON.stringify(image);
    arr = JSON.parse(image) // image需要url地址转化成图片格式

**持久化数据**
    将用户输入的数据 账户、密码 传入服务器的后台做验证，得到响应token和用户名
    将登录的用户信息存储到pinia， 并开启数据持久化
    
    安装依赖 npm i pinia-plugin-persistedstate 
    Main.ts中
    import piniapluginpersistedstate from 'pinia-plugin-persistedstate' 
    pinia.use(piniapluginpersistedstate);
    pinia中开启  persist: true 

```