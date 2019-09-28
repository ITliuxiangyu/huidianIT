# vue_滚动监听插件使用


## 1. 安装 vue-scrollwatch

### cnpm install vue-scrollwatch —save

### 1.1 在main.js中先导入一次, 让Vue认识这个模块

#### import vueScorllWatch from ‘vue-scrollwatch’;  
  Vue.use(vueScorllWatch);

## 2. 在需要用到的组件界面中导入

### import vueScrollwatch from 'vue-scrollwatch';

## 3. 在组件 created 回调函数中, 设置需要滚动的容器

### vueScrollwatch.setContainer('#scrollDom'); 

## 4. 在界面上实现左右结构, 进行滚动监听就行

### 左

####        <ul class="nav-center">  
              <li>  
                  <a :class="{active:activeMenu == 'a'}" @click="scrollTo('a')">Section 1</a>  
              </li>  
              <li>  
                  <a :class="{active:activeMenu == 'b'}" @click="scrollTo('b')">Section 2</a>  
              </li>  
              <li>  
                  <a :class="{active:activeMenu == 'c'}" @click="scrollTo('c')">Section 3</a>  
              </li>  
              <li>  
                  <a :class="{active:activeMenu == 'd'}" @click="scrollTo('d')">Section 4</a>  
              </li>  
          </ul>

### 右

####         <div class="main" id="scrollDom" key='1'>  
              <div class="section section-a" v-scrollWatch="{name:'a',offset:0,callback:watchScroll}"><h1>section 1</h1></div>  
              <div class="section  section-b" v-scrollWatch="{name:'b',offset:0,callback:watchScroll}"><h1>section 2</h1></div>  
              <div class="section  section-c" v-scrollWatch="{name:'c',offset:0,callback:watchScroll}"><h1>section 3</h1></div>  
              <div class="section  section-d" v-scrollWatch="{name:'d',offset:0,callback:watchScroll}"><h1>section 4</h1></div>  
          </div>

## 5. 在组件的methods部分实现代码

### 左侧点击事件代码

####    'methods': {  
            
          scrollTo(name) {  
              vueScrollwatch.scrollTo(name);  
          }  
      }

### 右侧滚动监听代码

####   'methods': {  
          watchScroll(node) {  
              if (this.activeMenu !== node.name){  
                  this.activeMenu = node.name;  
              }  
          }  
      }

## 6. 在组件数据data 部分准备一个变量, 方便数据绑定

###     data() {  
          return {  
              'activeMenu': 1  
          };  
      },

## 7. 样式表内容, 仅供参考

### <style scoped>  
  .nav-center {  
        
      position: fixed;  
      top: 50px;  
      z-index: 999;  
        
  }  
  h1{  
      margin:0;  
  }  
  .main{  
      margin-top:50px;  
      padding-left:200px;  
     background: rgba(0,0,0,0.1);  
      height:800px;  
      overflow:auto;  
  }  
  .section {  
      height: 1000px;  
      text-align:center;  
  }  
  .section.section-a {  
      background:#67C23A  
  }  
  .section.section-b {  
      background:#E6A23C  
  }  
  .section.section-c {  
      background:#909399  
  }  
  .section.section-d {  
      background:#F56C6C  
  }  
  .active {  
      font-size: 20px;  
      color: white;  
  }  
  </style>

