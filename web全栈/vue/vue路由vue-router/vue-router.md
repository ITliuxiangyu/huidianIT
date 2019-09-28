# vue-router


## 路由

### 1. 开始

#### HTML

- 

#### JS

- 

#### 路由注册后, 我们就可以在vue的实例对象中通过   
  this.$router 来访问 路由对象router ,   
  this.$route 来访问 路由参数信息

### 2. 动态路由匹配

#### 1. 注册路由的时候, “:”绑定动态参数名

- 

#### 2. 在对应的组件中, 参数会放在 route对象的params属性中(切记, 是route, 不是router)

- 

#### 3. 多动态路由参数

- 

#### 4. 检测动态参数改变

- 监听 beforeRouteUpdate 函数

	- 

#### 5. 匹配通用路由

- 1. 全部通配

	- 

- 2. 部分通配

	- 

- 3. 通配符得到的信息在参数 $route.params.pathMatch 中

	- 

### 3. 层级路由

#### 路由之中嵌套子路由  
  比如, 用户 user路由中想嵌套不同的自己路由, 用来显示不同的用户名称

- 

#### 在user路由中增加自己路由: children

- 

### 4. 函数式编程

#### 

### 5. 给路由命名

#### 

#### 用 router-link 通过路由名 来跳转到该路由

- 

#### 用函数式编程, 通过 路由名 来跳转到该路由

- 

### 6. 给router-view 命名  
  注意: 是components, 不是 component

#### 

#### 

### 7. 路由重定向和别名

#### 1. 通过路径重定向

- 

#### 2. 通过路由名 name 重定向

- 

#### 3. 通过函数 进行动态编程 重定向

- 

#### 4. 路由别名

- 

### 8. 路由传值

#### 1. 参考2, 动态路由传值

#### 2. 路由属性传值

- 对象模式传值

	- const router = new VueRouter({  
	    routes: [  
	      { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }  
	    ]  
	  })

- 函数模式传值

	- const router = new VueRouter({  
	    routes: [  
	      { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }  
	    ]  
	  })

