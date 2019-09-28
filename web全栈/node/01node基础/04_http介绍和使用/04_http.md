# 04_http


## 监听客户端失败事件

### server.on('clientError', (err, socket) => {  
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');  
  });

## 端口监听回调函数

### server.listen(port,function(){  
      console.log('监听在'+port )  
  });

## 请求流

### 监听客户端数据

#### req.on('data',function(data){  
       console.log('请求的数据:'+data)  
  });

### 监听数据结束

#### req.on('end',function(data){  
    
  })

### 请求的资源路径

#### req.url

### 请求头

#### req.headers

### 请求方法

#### req.method

## 响应流

### 响应给客户端

#### res.end()

### 设置编码格式

#### res.setHeader('content-type','text/html;charset=utf-8')

### 设置location

#### res.setHeader('Location','http://baidu.com');

### 设置过期时间

#### var date = Date.now()+ 6000;  
  res.setHeader('Expires',date)

### 设置状态码

#### res.statusCode = 302;

## mime

### mime:文件的内容类型,举例:text/html,text/plain,application/json,iamge/jpeg.

## 简单的小爬虫

### 爬取某一个网址

#### http.get("地址" , function (res) {  
      res.on("data" , function (data) {  
    
      })  
      res.on("end" , function () {  
            
      })  
  })

### 正则匹配html中的img标签

#### var images = []  
  var imgReg = /<img.*src="(.+?)".*?>/g  
          html.replace(imgReg, function(a, b) {  
              imgs.push(b);  
          })

### 网络图片地址保存到本地

#### var filename = url.match(/[^\/]+$/)[0];  
    
          //对图片进行请求  
          http.get(url, function(res) {  
              //res:服务器响应的数据。  
    
              res.on('data', function(data) {  
                  fs.appendFile('./imgs/' + filename, data);  
              })  
              res.on('end', function() {  
                  console.log(filename + '请求完成');  
              })  
          })

