# vue-axios


## 组件的声明周期

### created

#### 组件创建成功, 触发created函数  
  此时, this 已经确定了

### mounted

#### 组件挂载成功, 触发mounted函数  
  此时, 界面DOM元素成立, 也就意味着, window.document 可以用了

## 组件的声明周期流程告诉我们, 一个网络请求的时机, 可以放在 created方法中, 也可以放在 mounted方法中

## 准备开始使用网络请求 axios 模块

### 1. 安装 cnpm  install axios —save

### 2. 在 main.js 文件中 导入   
  import axios from ‘axios’

### 3. 把 axios 模块 放到 Vue 构造函数的原型的sb属性上  
  Vue.prototype.sb = axios

### 4. 在某一个界面(组件)里面想使用axios模块, 可以这样写:  
  this.sb.get(‘地址’).then(res=>{console.log(res)})  
  上面的这行请求代码, 要注意放在 created 或 mounted 回调函数中

### 5. 注意跨域的问题, 所以, 让 4 中的地址, 换成 node Koa 服务器中的代理服务器路由 urlAgent

### 6. 而你自己的node Koa 服务器 支持跨域吗?  不支持

#### 1. 让 自己的 node Koa 服务器支持跨域

#### 2. 在node 服务器中 安装 koa-cors 模块  
  cnpm install koa-cors —save

#### 3. 在 node 服务器 app.js 中 导入该跨域模块  
  const cors = require(‘koa-cors’)

#### 4. 让 app 使用该 模块  
  app.use(cors())

#### 5. 注意: 4 使用的使用 写到 app.use(koa_body) 下面

