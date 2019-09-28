# vue-vuex


## 安装

### cnpm install vuex —save

## main.js导入 import Vuex from 'vuex'; 

## Vue 使用 Vuex  Vue.use(Vuex);

## 创建存储常量 store

###     const store = new Vuex.Store({  
          'state': {  
              'count': 4  
          },  
          'mutations': {  
              increment (state) {  
                  state.count++;  
              }  
          }  
      })

## 在Vue实例对象中注入store

### new Vue({  
      store,  
      'render': h => h(App),  
      router  
  }).$mount('#app');

## 在子组件中使用store中的数据

### 1. 直接通过store对象获取

#### this.$store.state

### 2. 通过Vuex的mapState函数获取

#### 1. 箭头函数写法

-     'computed': mapState({  
          'count': state=>state.count,  
          'age': state=>state.age  
      }),

#### 2. 字符串写法

-     'computed': mapState({  
          'countAlias': 'count',  
          'xxx': 'age'  
      }),

#### 3. 回调函数写法, 这样可以方便使用this

-     'computed': mapState({  
          xxx(state){  
              return state.age;  
          }  
      }),

#### 4. 当要得到的属性名与state中的属性名一样是, 可以直接使用一个字符串数组来方便获取

- 'computed': mapState(['count', 'age'])

## 在子组件中修改store中的数据

### 通过store中的mutations事件来触发数据的改变

####         var that = this;  
          setTimeout(() => {  
              console.log("9999");  
              that.$store.commit('increment');  
          }, 3000);

