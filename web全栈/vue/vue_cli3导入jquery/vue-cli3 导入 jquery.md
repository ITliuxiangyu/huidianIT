# vue-cli3 导入 jquery


## 1. 安装

### cnpm install jquery --save

## 2. 导入 (在main.js中)

### import $ from ‘jquery’;

## 2.1 在 package.json 文件中 增加 env 配置

### 

## 3. 在组件中使用 jquery

### 方式一: Vue 的 全局属性

#### 1. 把 $ 做成 Vue 构造函数 的一个属性

- Vue.prototype.$ = $;

#### 2. 在任何vue组件中都能用$了

- this.$(‘.xxx’)

### 方式二: $ 全局变量的配置

#### 1. 创建 vue.config.js 文件

- 该文件和 package.json 文件 平级

- 该文件 是 当前 vue 项目的 配置文件  
  并且 还是一个可选的配置文件

#### 2. 在 1 文件中 实现 $ 全局插件的功能

- 

