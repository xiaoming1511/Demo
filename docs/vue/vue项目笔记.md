### vue 项目笔记

运行自动打开浏览器

```js
// 在 package.json 文件
"scripts": {
  	//"serve": "vue-cli-service serve", 加上 --open
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

关闭 eslint 校验

```js
// 在 vue.config.js 文件
module.exports = defineConfig({
  lintOnSave:false
})
```

src 文件 @ 简写

```js
// jsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

路由传参

```js
methods: {
    goSearch() {
      this.$router.push(
        // 第一种方式传参 字符串形式
        // "/search/" + this.searchValue + "?k=" + this.searchValue.toUpperCase()
        // 第二种方式传参 模板字符串
        // `/search/${this.searchValue}?s=${this.searchValue.toUpperCase()}`
        // 第三种方式传参 对象
        {
          name:'search',
          params:{
            searchValue:this.searchValue
          },
          query:{
            sv:this.searchValue.toUpperCase()
          }
        }
      );
    },
  },
```

