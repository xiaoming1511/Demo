#### Interface 接口

- 接口重名将合并

- 接口属性必须一致，不能缺少，也不能多

- ```tsx
  interface A{
      name:String
      age:number
      // 索引签名，用于不确定接下来会用什么类型时使用，改变 any 将会把整个接口内的类型统一
      [propName:String]:any
  }
  ```

- ```tsx
  interface A{
      name:String
      age?:number
      // ? 代表这个属性变成可选，可有可无
      readonly id:number
      // readonly 将属性变为只读，不能更改，常用于 id 与函数
  }
  ```

- ```tsx
  // 继承
  interface A entends B{
      name:String
      age:number
  }
  interface B{
      xxx:String
  }
  // 继承后属性也必须保持一致
  ```

- ```tsx
  interface Fn{
  	(name:string):number[]
  }
  
  const fn:Fn = function(name:string){
      return []
  }
  // 接口定义函数类型
  ```

  

#### 定义数组

```tsx
let arr:number[] = [1,2,3]
let arr2:Array<noolean> = [false,true]

interface X{
    name:string
    age?:number
}

let arr3:X[] = [{name:'xxx'},{name:'xhm',age:16}]

//定义二维数组
let arr:number[][] = [[1],[2],[3]]
let arr:Array<Array<number>> = [[1],[2],[3]]
//如果数组里面类型复杂就定义 any[]

// 伪数组
let a:IArguments = arguments
```



#### 定于函数

```tsx
function add( a?:number, b:number ):number{
    return a + b
}

interface Obj{
    user:number[]
    add:(this:Obj,num:number)=> void
}
let obj:Obj ={
    user:[1,2,3]
    add(this:Obj,num:number){
        this.user.push(num)
    }
}
```

