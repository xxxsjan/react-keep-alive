# Context

- 上下文 -> Provider -> 子组件们提供公共的属性或者方法
- 缓存的是什么？ -> 真实DOM
- 组件的视图渲染 -> 一定建立在append 真实DOM的基础上

- 缓存是怎么做的？-> 一定在保存在一个对象
  - id: { nodes, ReactElement, status }

## 结构

  Provider => 方法 属性
    组件 => nodes => 设置缓存的方法
        => nodes => 组件的渲染

## 思路

KeepAlive 需要包着 被缓存的组件‘

首先，需要缓存的数据应该要什么

需要: 1 react组件 2 id,因为同一个组件可能会有多个

所以需要在渲染前保存原来的react组件，useEffect明显做不到

故只要把他当参数，用另一个函数包一层的思路，也就是keepAliveTransfer

接受两个参数，ReactElement和id

下一步

keepAliveTransfer 应该怎么缓存传进来的ReactElement和id，放到哪里

这时可以想到的是用useReducer创建状态管理去维护缓存组件的信息

然后问题就到了，缓存组件的数据结构长什么样

这里，数据结构定义为

```typeScript
{
  [id:string]:{
      nodes:HTMLElement[], 
      ReactElement:Symbol(react.element), 
      status :"CREATING"|"CREATED"
  }
}

```

然后问题就来到reducer这边，哪里去写这个

明显reducer的用法就是provider的形式，keepAliveTransfer通过context就可以拿到对应设置转态的方法

所以需要在顶层写reducer，也就是keepAlive组件

现在的结构是  KeepAlive > keepAliveTransfer> ReactElement

## 技巧

KeepAlive中div ref的作用，通过{reactElement}给ref渲染子节点，然后在ref的回调中拿到reactElement渲染后的真实节点
