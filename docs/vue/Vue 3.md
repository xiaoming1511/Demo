## Vue 3



1. **内容渲染指令**
   1. v-text	渲染文本，会覆盖默认值
   2. v-html	渲染代码，
   3. {{}} 插值表达式
2. **属性绑定指令**
   1. v-bind		简写  **:**  	绑定属性值
3. **事件绑定指令**
   1. v-on		简写	**@**	绑定事件
   2. $event    事件对象    当事件需要传参时还需要使用事件对象使用
   3. **事件修饰符**
      1. .prevent	阻止默认行为
      2. .stop          阻止事件冒泡
   4. **按键修饰符**
      1. keyup.enter	配合按键触发
      2. keyup.esc
4. **双向绑定指令**
   1. **v-model**	双向绑定	配合表单使用
      1. .number	转换为数值
      2. .trim    过滤首尾空白字符
      3. .lazy    在  **‘change’**  时而非  **'input'**  时更新，当改变完值后才进行更新
5. **列表渲染指令**
   1. **v-for (user in item)    /    (user, index 索引) in item**
   2. **:key**
      1. 只能字符与数字
      2. 唯一性
      3.  id 做为 key 值





## Vite  项目的创建

1. 创建项目

   ```
   npm init vite-app 项目名称
   ```

2. 进入到项目文件安装依赖

   ```
   npm install
   ```

3. 运行项目

   ```
   npm run dev
   ```

4. main.js文件配置

   ```javascript
   // 1.从 vue 中导入 createApp 函数
   import { createApp } from 'vue'
   // 2.导入需要渲染的组件
   import App from './App.vue'
   
   // 调用 createApp 函数, 创建实例
   const app = createApp(App)
   
   // 调用 mount 方法把 App 组件的模板结构渲染到指定的 el 区域 index.html 中 id app
   app.mount('#app')
   ```

5. 安装 less 

   ```
   npm i less -D
   ```

6. 注册全局组件

   ```js
   // 1.从 vue 中导入 createApp 函数
   import { createApp } from 'vue'
   // 2.导入需要渲染的组件
   import App from './App.vue'
   import Add from './components/add.vue'
   
   
   // 调用 createApp 函数, 创建实例
   const app = createApp(App)
   
   // 调用 component('自定义名称', 导入的组件名) 方法 注册全局组件
   app.component('my-add', Add)
   
   // 调用 mount 方法把 App 组件的模板结构渲染到指定的 el 区域 index.html 中 id app
   app.mount('#app')
   ```

7. props 的使用

   ```vue
   <!--传递-->
   <hello-world :num="age"> </hello-world>
   ```

   ```js
   //接收
   props: ["num"],
   ```

   ```js
   //使用对象接收并且指定接收数据类型
   props: {
       title: String,
       bgcolor: String,
       color: String,
   },
   ```

   ```javascript
   // required	true 必须传入一个数据进来
   // default 给定一个默认值
   props: {
       A:{
         type:Number,
         required:true,
         default:100,
       }
     },
   ```

   ```vue
   <!-- 自定义验证 -->
   <!-- B 不用绑定 -->
   <Header :title="title" :bgcolor="bgcolor" :color="color" B="a"></Header>
   
   <script>
   export default {
     props: {
       B:{
         //接收的值必须在 validator 函数中有定义，否者报错  
         validator(value){
           return ['a','b','c'].indexOf(value) !== -1
         }
       }
     },
   };
   </script>
   ```

   

8. 动态绑定 class 类名

   ```vue
   <!--方法一-->
   <h1 :class=" isitalic ? 'i' : ''">
       hello World.vue 中的 qwe ----来自App.vue 的 age {{ num }}</h1>
   ```

   ```vue
   <!--方法二-->
   <h1 :class="[isitalic ? 'i' : '', isdelete ? 'd' : '',]">
       <!--以数组的形式绑定多个 class 类名-->
       hello World.vue 中的 qwe ----来自App.vue 的 age {{ num }}</h1>
   ```

   ```vue
   <!--方法三-->
   <h1 :class="classObj">
       hello World.vue 中的 qwe ----来自App.vue 的 age {{ num }}</h1>
     <button @click="classObj.i = !classObj.i">改变样式</button>
   
   <script>
   export default {
     data() {
       return { 
         classObj:{
           i:true,//类名==属性名
         }
       }
     },
   };
   </script>
   
   <style>
   .i{
     font-style: italic;
   }
   </style>
   ```

   ```vue
   <!--方法四-->
   <div :style="{ color: a, fontSize: b + 'px', backgroundColor: c }">h3</div>
   
   <script>
       export default{
           data(){
               return{
                   a: "red",
         			b: 40,
         			c: "pink",
               }
           }
       }
   </script>
   ```

9. 计算属性

   ```vue
   <h3>app.vue ---plus 返回的值是 {{ plus }}</h3>
   
   <script>
   export default {
     name: "Myadd",
     data() {
       return {
         a: 3,
       };
     },
       // 在 computed 中定义计算属性的方法
     computed: {
       plus() {
         return this.a * 2;
       },
     },
   };
       //计算属性必须是一个函数
       //计算属性必须有返回值
       //计算属性必须当普通属性使用
       //计算属性会缓存计算的结果，性能更好
   </script>
   ```

10. 自定义事件

   ```vue
   <!-- 子组件 -->
   <template>
     <h3>app.vue ---plus 返回的值是 {{ plus }}</h3>
   	<!-- 自定义事件绑定 -->
     <button @click="onClick">+10</button>
   </template>
   
   <script>
   export default {
     name: "Myadd",
     data() {
       return {
         a: 3,
       };
     },
       // 1.在子组件定义 emits 监听
     emits: ["change"],
     methods: {
         // 2. 定义监听函数
       onClick() {
         this.a += 3;
         this.$emit("change", this.a);
       },
     },
   };
   </script>
   ```

   ```vue
   <!--根组件-->
   <template>
     <h1>App根组件 ----</h1>
     <hr />
   	<!-- 2.绑定触发函数 -->
     <Myadd @change="getA"></Myadd>
   </template>
   
   <script>
   export default {
     name: "App",
     components: {
       Header,
     },
     methods: {
         // 1.定义触发函数
       getA(val) {
         console.log("触发了,输出结果是：" + val);
       },
     },
   };
   </script>
   ```

11. 组件上的 v-model 

    ```vue
    <!-- v-model 实现子向父同步 -->
    
    <template>
      <h3>app.vue --- number 的值是 {{ number }}</h3>
    	<!-- 绑定按钮 -->
      <button @click="changeNumber">+1</button>
    </template>
    
    <script>
    export default {
      name: "Myadd",
        // 1. 定义 props 接收值
      props: ["number"],
        // 2. emits :[ 'update: 接收值'] 实现双向绑定，update 固定写法
      emits: ["update:number"],
      methods: {
          // 3. 定义监听函数
        changeNumber() {
          this.$emit("update:number", this.number + 1);
        },
      },
    };
    </script>
    ```

    ```vue
    <!-- 根组件 -->
    <template>
      <h1>App根组件 ---- a 的值是 {{ a }}</h1>
      <hr />
    	<!-- 使用 v-model 属性 将 a 双向绑定-->
      <Myadd v-model:number="a"></Myadd>
    </template>
    
    <script>
    export default {
      name: "App",
      data() {
        return {
          a:10,
        };
      },
    };
    </script>
    ```

12. watch 侦听器

    ```vue
    <!-- 侦听数值的变化 -->
    <template>
      <h1>App根组件 ---- </h1>
      <hr />
    	<!-- 双向绑定 -->
      <input type="text" v-model.trim="user">
    </template>
    
    <script>
    export default {
      name: "App",
      data() {
        return {
            // 1.定义一个变量
          user:'',
        };
      },
      watch:{
          // 定义侦听，第一个参数是改变后的新值，第二个是改变前的旧值
        user(newVal,oldVal){
          console.log(newVal,oldVal);
        },
      }
    };
    </script>
    ```

    ```javascript
    watch: {
        "info.username": {
            //handler 方法 固定写法 当info.username 发生改变时调用
          handler(newVal, oldVal) {
            console.log(newVal, oldVal);
          },
          // immediate : true 表示立即触发侦听
          immediate: true,
          // deep : true 启用对对象侦听
          deep:true,
        },
      },
    ```

    ```tex
    计算属性 与 侦听器
    1.计算属性和侦听器的应用场景不同
    计算属性侧重监听多个数据的变化，最终返回一个新值
    侦听器侧重监听单个数据的变化，最终执行特定的业务处理，不需要返回值
    ```

13. 生命周期

    ```vue
    <script>
    export default {
      // 组件在内存中创建完毕了
      created(){
          //常用于发送 ajax 请求
        console.log('触发了创建的声明函数');
      },
      // 组件第一次被渲染到页面
      mounted(){
          //常用于操作 DOM 元素
        console.log('触发了可以使用 DOM 的生命函数');
      },
      //组件销毁完毕
      unmounted(){
        console.log('触发了销毁的生函数');
      },
      //当数据更新后，页面重新渲染时触发
      updated(){
        console.log(this.a);
      }
    }
    </script>
    ```

    全部的生命函数

    beforeCreate

    **created**

    beforeMount

    **mounted**

    beforeUpdate

    **updated**

    beforeunmount

    **unmounted**

14. 组件数据共享

    **父向子**

    ```
    props
    ```

    **子向父**

    ```
    自定义事件
    ```

    **兄弟组件之间共享**

    ```js
    1.安装 mitt 依赖包
    2.新建一个 EventBus.js 
    	//1.导入 mitt 包
        import mitt from 'mitt'
        //2.创建 bus 实例对象
        const bus = mitt()
        //3.将 bus 实例共享出去
        export default bus
    3.导入 EventBus.js
    ```

    ```vue
    <!-- 发送数据方 -->
    <template>
      <h3>app.vue --- {{ a }}</h3>
      <button @click="addNum">+1</button>
    </template>
    
    <script>
        // 1.导入 eventbus 
    import bus from '../js/EventBus'
    export default {
      name: "Myadd",
      data() {
        return {
          a: 3,
        };
      },
      //发送数据方
      methods:{
        addNum(){
          this.a++
          // 2.调用 bus.emit('事件名称',发送值) 方法共享数据
          bus.emit('changeNum',this.a)
        }
      }
    };
    </script>
    ```

    ```vue
    <!-- 数据接收方 -->
    <template>
      <div :style="{ color: color, backgroundColor: bgcolor }">
        {{ title || "Myheader" }}
          <i>{{ Num1 }}</i>
      </div>
    </template>
    
    <script>
        // 1. 导入 eventbus 
    import bus from '../js/EventBus'
    export default {
      name: "Myheader",
      data() {
        return {
          Num1:2023,
        }
      },
      created(){
        //数据接收方
        //2.调用 bus.on('事件名称',事件函数) 方法注册自定义事件
        bus.on('changeNum',(Num) => {
          this.Num1 = Num
        })
      }
    };
    </script>
    ```

    **后代关系数据共享**

    ```js
    根节点
    
    // 通过 provide 函数的 return 对象定义需要向后代共享的数据
    // 注意 provide 共享的数据不是响应式的
      provide() {
        return {
          user: this.info.username,
        };
      },
          
          
          
    改进
    1.导入 computed
    import { computed } from "vue";
    
    provide(){
        return
            // 2.使用 computed 函数把共享的数据包装成响应式的数据
          user:computed(() => this.info.username)
        }
      },
    ```

    ```js
    后代节点
    <p> app 组件的后代组件 ----来自App {{ user }} </p>
    
    props:[''],
    // 使用 inject 数组 接收祖先节点共享的数据
    inject:['user'],
        
        
    改进
    //改进后使用以.value的形式使用
    <p> app 组件的后代组件 ----来自App {{ user.value }} </p>
    ```

15. **vue 3 配置 axios**

    ```js
    1.安装 axios npm i axios
    2.在 main.js 导入 axios 
    // 调用 createApp 函数, 创建实例
    const app = createApp(App)
    
    3.配置 axios 链接
    axios.defaults.baseURL = '目标链接'
    4.挂在到 app 上 添加自定义属性 $属性名
    app.config.globalProperties.$http = axios
    
    // 调用 mount 方法把 App 组件的模板结构渲染到指定的 el 区域 index.html 中 id app
    app.mount('#app')
    ```

    ```js
    async A(){//返回的是对象 需要加 async 和 await
        const {结构赋值:自定义名字} = await this.$http.post('具体路径',{提交参数})
    }
    ```

16. ref 引用 可以不依赖Jquery 获得 DOM 元素和组件的引用

    ```vue
    <template>
      <h3 ref="wenzi">
        ref 中的文字---
      </h3>
      <button @click="getRef()">获取 Ref</button>
    </template>
    
    <script>
    export default {
        methods:{
          getRef(){
            console.log(this.$refs.wenzi);
            this.$refs.wenzi.style.color = 'red'
          }
        }
    }
    </script>
    ```

    ```vue
    <!-- 通过ref 调用其他组件的方法 -->
    
    <template>
      <h1>App根组件 ----</h1>
      <h3>111</h3>
      <hr />
    	<!-- 1.给组件添加 ref 属性 -->
      <Ref ref="getR"></Ref>
    	<!-- 2.添加按钮 -->
      <button @click="getRef">get App.vue this Ref</button>
    </template>
    
    <script>
    // import Header from "./components/header.vue";
    import Ref from './components/ref.vue'
    import { computed } from "vue";
    
    export default {
      name: "App",
      methods:{
          // 定义触发函数
        getRef(){
          this.$refs.getR.getRef()
        }
      },
    </script>
    ```

    自动获取焦点

    ```vue
    <template>
      <input type="text" v-if="isInput" ref="ipt"/>
      <button type="button" v-else @click="showInput">
        显示搜索框
      </button>
    </template>
    
    <script>
    export default {
      name: "Myref",
      data() {
        return {
            // 1.定义一个布尔值改变按钮状态
          isInput: false,
        };
      },
      methods: {
        showInput() {
          this.isInput = true
          // this.$refs.ipt.focus()
          this.$nextTick(()=>{
            // 调用 $nextTick(函数方法) 将函数推迟到下一个周期之后执行
            this.$refs.ipt.focus()
          })
        }
      },
    };
    </script>
    ```

17. 动态组件

    ```vue
    <template>
      <h1>App根组件 ----</h1>
      <button @click="comName = 'Home'">Home</button>
      <button @click="comName = 'Home2'">Home2</button>
      <hr>
    	<!-- 动态组件 component 标签 通过 is 指向组件名 -->
      <component :is="comName"></component>
    </template>
    
    <script>
    import Home from './components/home.vue'
    import Home2 from './components/home2.vue'
    
    export default {
      name: "App",
      data() {
        return {
          comName:'Home',
        };
      },
      components:{
        Home,
        Home2,
      },
    };
    </script>
    ```

    保留组件数据

    ```vue
    <template>
      <h1>App根组件 ----</h1>
      <button @click="comName = 'Home'">Home</button>
      <button @click="comName = 'Home2'">Home2</button>
      <hr />
    
      <keep-alive>
          <!-- 在动态组件外面加上 keep-alive 标签 -->
        <component :is="comName"></component>
      </keep-alive>
    </template>
    ```

18. 插槽

    ```vue
    <template>
      <h1>App根组件 ----</h1>
      <hr />
      <Home>
        <h1>我是App组件中传的插槽</h1>
      </Home>
    </template>
    
    <template>
      <h3>Home 的组件 --{{ con }}</h3>
      <button @click="con++">+1</button>
      <hr>
    	<!-- slot 插槽 在根组件中传进来的会替换掉 slot 占位符，当根组件中没有传进来， slot 就会显示默认内容-->
      <slot> 默认内容 </slot>
    </template>
    ```

    具名插槽

    ```vue
    <template>
      <slot name="top"> 默认内容 top </slot>
      <slot> 默认内容 </slot>
      <slot name="footer"> 默认内容 footer </slot>
    </template>
    
    <template>
      <h1>App根组件 ----</h1>
    
      <Home>
          <!-- 具名插槽 需要用 template 标签，加上 v-slot: 简写 # 属性绑定 具名的插槽  -->
        <template v-slot:top>
          <h1> 李白 </h1>
        </template>
    
        <template #default>
          <p>君不见，黄河之水天上来，</p>
          <p>君不见，黄河之水天上来。</p>
        </template>
    
        <template v-slot:footer>
          <p>10点36分</p>
        </template>
      </Home>
    </template>
    ```

    作用域插槽

    ```vue
    <template>
      <h1>App根组件 ----</h1>
      <button @click="comName = 'Home'">Home</button>
      <button @click="comName = 'Home2'">Home2</button>
      <hr />
    
      <home-2>
          <!-- 方法一 -->
        <template #default="scope">
            <!-- 定义 scope 参数接收值并使用 -->
          <h3>{{ scope.info }}</h3>
        </template>
    	<!-- 方法二 结构赋值 -->
    	<template #default="{info,msg}">
          <h2>{{ info.address }}</h2>
          <p>{{ msg }}</p>
    	</template>
      </home-2>
    </template>
    
    <template>
      <h3> Home2 的组件 ---{{ con }}</h3>
      <button @click="con++">+1</button>
      <hr>
    	<!-- 在 slot 中绑定属性传值 -->
      <slot :info="info.address" :msg="mes"></slot>
    </template>
    
    <script>
    export default {
        name:'MyHome2',
        data() {
            return {
                con:1,
                info:{
                    nun:123,
                    address:'111',
                },
                mes:'123',
            }
        },
    }
    </script>
    ```

19. 自定义指令

    ```vue
    <template>
      <h1>App根组件 ----</h1>
      <hr />
    	<!-- 1.定义一个 v-focus 自定义指令 -->
      <input type="text" v-focus>
    
    </template>
    
    <script>
    export default {
      name: "App",
        // 2.在directives 中声明 focus 指令，
      directives:{
        focus:{
            // 3.当绑定的元素插入 DOM 中，自动触发
          mounted(el) {
            el.focus()
          },
        }
      }
    };
    </script>
    ```

    全局自定义指令

    ```js
    //在 main.js 中声明
    const app = createApp(App)
    //注册全局 v-focus 自定义指令 方法一
    app.directive('focus',{
        mounted(el){
            el.focus()
        },
        updated(el){
            el.focus()
        }
    })
    
    app.directive('focus',(el)=>{
        // 方法二 简写 当 mounted 和 updated 需用调用同一种方法时，可以进行简写
        el.focus()
    })
    ```

    自定义指令传值

    ```vue
    <!-- 使用 v-color 传值 需要带引号 -->
    <input type="text" v-focus v-color="'pink'">
    
    <script>
        const app = createApp(App)
        
        app.directive('color',(el,binding)=>{
            el.style.color = binding.value 
        })
        
        app.mount('#app')
    </script>
    ```

20. **路由**

    ```js
    // 获取hash地址 window.onhashchange = location.hash
    ```

    安装 vue-router 4.x 

    ```
    npm i vue-router@4
    ```

    配置 vue-router

    1. 创建router.js

       ```js
       // 导入 createRouter,createWebHashHistory
       // createRouter 用于创建路由的实例对象,
       // createWebHashHistory 用于指定路由的工作模式 (hash 模式)
       import { createRouter, createWebHashHistory } from "vue-router";
       // 导入组件需加上后缀名，否则报错
       import Home from './Myhome.vue'
       import Movie from './Mymovie.vue'
       import About from './Myabout.vue'
       
       const router = createRouter({
           // history 指定路由工作模式
           history: createWebHashHistory(),
       
           routes: [
               // 配置路由规则,path 是 hash 地址, component 是 组件
               { path: '/home', component: Home },
               { path: '/movie', component: Movie },
               { path: '/about', component: About },
           ],
       })
       
       export default router
       ```

    2.  在 main.js 中挂载路由

       ```js
       import { createApp } from 'vue'
       import App from './App.vue'
       // 导入 router.js 
       import router from './components/luyou/router.js'
       
       const app = createApp(App)
       
       
       // 挂载路由模块
       app.use(router)
       
       app.mount('#app')
       ```

    声明路由链接和占位符 

    ```vue
    <template>
      <h2>App1 根组件</h2>
    
      <!-- 路由链接 -->
      <router-link to="/home">Home</router-link>
      <router-link to="/movie">Movie</router-link>
      <router-link to="/about">About</router-link>
    
      <!-- 路由占位符 -->
      <router-view></router-view>
    </template>
    ```

21. 路由重定向

    ```js
    routes: [
            //redirect 重定向 指定一个新的路由地址
            { path: '/', redirect: '/home' },
            { path: '/home', component: Home },
        ],
    ```

22. 路由高亮

    ```css
    方法一 激活的路由默认应用 router-link-active 类名
    <style lang="less" scoped>
    .router-link-active{
      color: red;
    }
    </style>
    ```

    ```js
    // 方法二 自定义激活路由的类名
    linkActiveClass:'router-active',
    routes:[],
    ```

23. 嵌套路由

    ```vue
    <template>
    	<!-- 在子组件中声明路由链接和占位符 -->
      <h3> Myabout 组件</h3>
      <hr>
      <router-link to="/about/about1"> about 1</router-link>&nbsp;
      <router-link to="/about/about2"> about 2</router-link>
    
      <router-view></router-view>
    </template>
    ```

    ```js
    // 导入 createRouter,createWebHashHistory
    // createRouter 用于创建路由的实例对象,
    // createWebHashHistory 用于指定路由的工作模式 (hash 模式)
    import { createRouter, createWebHashHistory } from "vue-router";
    
    import About from './Myabout.vue'
    //在 router.js 中导入嵌套组件
    import About1 from './about1.vue'
    import About2 from './about2.vue'
    
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: '/about',
                component: About,
                // 添加 children 属性 添加嵌套路由地址
                children: [
                    { path: 'about1', component: About1 },
                    { path: 'about2', component: About2 },
                ],
            },
        ],
    })
    
    export default router
    ```

    嵌套路由重定向

    ```js
    const router = createRouter({
        history: createWebHashHistory(),
        //自定义激活路由的类名
        linkActiveClass: 'router-active',
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: Home },
            { path: '/movie', component: Movie },
            {
                path: '/about',
                component: About,
                // 在路由链接中添加 redirect 重定向
                redirect: '/about/about1',
                children: [
                    { path: 'about1', component: About1 },
                    { path: 'about2', component: About2 },
                ],
            },
        ],
    })
    ```

24. 动态路由

    ```vue
    <template>
      <h1>App根组件 ----</h1>
      <!-- 路由链接 在 movie 后面加上id -->
      <router-link to="/movie/1">Movie1</router-link>&nbsp;
      <router-link to="/movie/2">Movie2</router-link>&nbsp;
      <router-link to="/movie/3">Movie3</router-link>&nbsp;
      <hr />
      <!-- 路由占位符 -->
      <router-view></router-view>
    </template>
    ```

    ```js
    // 导入 createRouter,createWebHashHistory
    // createRouter 用于创建路由的实例对象,
    // createWebHashHistory 用于指定路由的工作模式 (hash 模式)
    import { createRouter, createWebHashHistory } from "vue-router";
    
    import Home from './Myhome.vue'
    import Movie from './Mymovie.vue'
    import About from './Myabout.vue'
    
    import About1 from './about1.vue'
    import About2 from './about2.vue'
    
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
    
            { path: '/', redirect: '/home' },
            { path: '/home', component: Home },
            //在 movie 后面加上 id，动态匹配 
            { path: '/movie/:id', component: Movie },
        ],
    })
    
    export default router
    ```

    动态路由取值

    ```vue
    <template>
    	<!-- 通过 $route.params.id 获取 router.js 中的 id 值-->
      <h3> Mymovie 组件 ---{{ $route.params.id }}</h3>
    </template>
    ```

    使用 props 接收参数

    ```js
    //开启 props 
    { path: '/movie/:id', component: Movie, props: true },
    ```

    ```vue
    <template>
      <h3> Mymovie 组件 ---{{ $route.params.id }} props ---{{ id }}</h3>
    </template>
    
    <script>
    export default {
        //接收值
      props:['id'],
    }
    </script>
    ```

25. 编程式导航

    ```vue
    <template>
      <h3>Myhome 组件</h3>
      <button @click="gotoMovie(1)">go to Movie</button>
    </template>
    
    <script>
    export default {
      methods: {
        gotoMovie(id) {
            //跳转到 push ('指定的 hash 地址')
          this.$router.push("/movie/" + id)
            // go (数值) 正数前进，负数后退
            this.$router.go(1),
        },
      },
    };
    </script>
    ```

26. 命名路由

    ```js
    //添加 neme 属性
    { path: '/movie/:id', component: Movie, props: true,name:'mov' },
    ```

    ```vue
    <router-link :to="{ name: 'mov', params: { id: 3 } }">
    	go to movie
    </router-link>
    ```

    ```vue
    <template>
      <h3>Myhome 组件</h3>
      <button @click="gotoMovie(1)">go to Movie</button>
      <hr />
    
      <router-link :to="{ name: 'mov', params: { id: 3 } }">
        go to movie</router-link
      >
    </template>
    
    <script>
    export default {
      methods: {
        gotoMovie(id) {
          this.$router.push({ name: "mov", params: { id: 2 } });
        },
      },
    };
    </script>
    ```

27. 导航守卫

    ```js
    router.beforeEach((to,from,next)=>{
        // to 前往的路由对象
        // from 离开的路由对象
        // next 函数,表示放行,但是声明了不调用表示不允许访问任何路由
        next()
        console.log(to,from);
    })
    ```

    next 函数的使用

    ```js
    router.beforeEach((to,from,next)=>{
        // 需要前往 movie2 next(false) 表示禁止跳转强制停留在当前页面
        if(to.path === '/movie/2'){
            next(false)
        }else{
            next()
        }
    })
    ```

    ```js
    router.beforeEach((to,from,next)=>{
        // 需要前往 movie2 next('/home') 表示跳转到指定页面
        if(to.path === '/movie/2'){
            next('/home')
        }else{
            next()
        }
    })
    ```

    ```js
    // 获取 token
    const token = localStorage.getItem('token')
    ```

28. vue-cli

    安装

    ```
    npm i -g @vue/cli
    
    # 查看版本号
    
    vue --version
    ```

    创建

    ```
    vue create 项目名
    # OR 
    vue ui
    ```
    
    
