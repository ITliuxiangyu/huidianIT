# node 高阶


## 回调函数

### Node.js 异步编程的直接体现就是回调

### 异步编程依托于回调来实现

### 例子1:http服务器回调

#### //引入一个http的模块  
  var http = require("http")  
    
  var server = http.createServer(function(req, res) {  
      //向前台响应内容(数据)  
      res.end("大家好,我是hello world")  
  });  
  //listen(端口,域名,成功的回调)  
  server.listen(8080, "localhost", function() {  
      console.log("服务器启动成功!")  
  });

### 例子2：读取文件操作

#### var fs = require("fs");  
  //文件模块  
  //异步的方式->当文件读取完成后执行回调函数内容,不影响其他后续程序的执行  
  var data = fs.readFile("案例2.txt", "utf8", function(err, data) {  
      console.log("读取文件成功");  
      console.log(data);  
  });  
  //同步获取文件的方式->必须读取完成以后再执行之后的程序  
  var data = fs.readFileSync("案例2.txt", "utf8");  
  console.log(data);  
  console.log("我是其他的代码");

## 常用模块讲解

### event

#### 事件概念

- 事件  
  又称为发布订阅模式  
  又称为观察者模式  
  当主题对象发生变化时,会通知所有的观察者对象,更新自己的行动

#### 获取事件模块

- var events = require("events").EventEmitter();// 老的写法,跟下面的写法是等价的  
  var events = require("events");

#### 例子：

- var events = require("events");  
  var util = require("util");  
    
  function Girl() {  
      //创建一个女神类,它拥有一些事件  
  }  
  //要让女神拥有事件方法需要先继承events模块  
  util.inherits(Girl, events);  
    
  function Boy(name, response) {  
      this.name = name;  
      this.response = response;  
  }  
  var boy1 = new Boy("备胎1", function() {  
      console.log("吃鸡腿");  
  });  
  var boy2 = new Boy("备胎2", function() {  
      console.log("吃牛肉");  
  });  
    
  var girl = new Girl();  
  girl.on("lee", boy1.response);  
  girl.addListener("lee", boy2.response);  
  girl.once("die", function() {  
      console.log("死了");  
  });  
  girl.emit("die"); //发射事件  
  girl.emit("die")

#### 事件

- 注册事件

	- on

	- addListener

	- once

- 发射事件

	- emit

- 其他方法

	- 设置最大的监听数量

		- girl.setMaxListeners(2);

	- 移除掉单个事件

		- girl.removeListener("ele", boy1.response); //移除掉单个事件

- 代码：

	- //设置最大的监听数量  
	  girl.setMaxListeners(2);  
	  //girl.on(“lee”,boy1.response);  
	  girl.removeListener("lee", boy1.response);  
	  //移除掉单个事件  
	  girl.removeAllListeners("lee");  
	  girl.emit("lee");

### buffer

#### buffer:缓存区，暂时存放在内存里的一段数据

#### JavaScript 语言自身只有字符串数据类型，没有二进制数据类型,在处理文件流时，必须使用到二进制数据，因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区

#### 由一个八位字节一个字节元素组成的数组,单位用16进制表示,取值范围为0-255

#### 创建buffer对象的方法：

- 直接创建长度为12的代码

	- var buff = new Buffer(12);  
	  //创建长度为12的数组  
	  console.log(buff);  
	  //fill(填充的值,开始位置,结束位置(没有既全部))  
	  buf1.fill(255, 0);  
	  console.log(buff)

- 通过数组

	- var buff = new Buffer([1, 255, 0xb3]);  
	  console.log(buff);

- 通过字符串

	- var buff = new Buffer("慧点科技");  
	  console.log(buff);

- 将buffer转成字符串通过toString

	- buf.toString()

- Node中推荐使用的方式

	- var buff = new Buffer([0xe5, 0x94, 0x90, 0xe8, 0x8f, 0x9c, 0xe4, 0xb9, 0x9f]);  
	  var buff = new Buffer([0xe5, 0x94, 0x90, 0xe8, 0x8f]);  
	  var buff = new Buffer([0x9c, 0xe4, 0xb9, 0x9f]);  
	  console.log(buf4.toString());  
	  console.log(buf5.toString());  
	    
	  //占用的内存高  
	  //console.log(Buffer.concat([buf4,buf5]).toString());  
	    
	  //Node中推荐使用的方式  
	  var StringDecoder = require("string_decoder").StringDecoder;  
	  var decoder = new StringDecoder();  
	  console.log(decoder.write(buff));  
	  console.log(decoder.write(buff));

### fs

#### 文件操作

- 读取文件

	- readFile

	- readFileSync

- 写入文件

	- writeFile

		- 第一个参数为写入的文件名

		- 第二个为写入的文件内容

		- 第三个为配置参数

			- {     flag:”a” }

				- a:追加

				- w:写入

				- r:读取

		- 第四个为回调函数

		- 代码：

			- var fs = require("fs");  
			  fs.writeFile("file.txt", "我是通过写入的文件内容", { flag: "a" }, function(err) {  
			      if (err) {  
			          return console.error(err);  
			      }�  
			      console.log("文件写入成功");  
			      fs.readFile("file.txt", "utf8", function(err, data) {  
			          console.log(data);  
			      })  
			  });

	- appendFile

		- fs.appendFile("file.txt", "\n最佳", function(err) {  
		      if (err) {  
		          return console.error(err);  
		      }  
		      console.log("追加成功");  
		  });

- 复制文件

	- fs.readFile("file.txt", "utf8", function(err, data) {  
	      //console.log(data);  
	      fs.writeFile("file2.txt", data, { encoding: "utf8" }, function(err) {  
	          if (err) {  
	              return console.error(err);  
	          }  
	          console.log("复制成功");  
	      })  
	  });

#### 目录操作

- 创建目录

	- fs.mkdir("test", 0777, function(err) {  
	      if (err) {  
	          console.error(err);  
	      }  
	  });

	- mode 的三个数字，分别表示:  
	      owner(所有者)，group(组用户),others(其他用户)  
	  所具有的权限。  
	  1 = x 执行 2 = w 写 4 = r 读，  
	  比如owner具有所有权限，1+2+4=7,  
	  又比如group 具有读 和执行权限 1+4 = 5

- 读取目录

	- fs.readdir("test", function(err, files) {  
	      if (err) {  
	          console.error(err);  
	      } else {  
	          console.log(files);  
	      }  
	  });

- 查看文件或者目录详情

	- fs.stat("test", function(err, stat) {  
	      if (err) {  
	          console.error(err);  
	      } else {  
	          console.log(stat);  
	      }  
	  });

- 判断文件是否存在

	- fs.exists("test/1.jpg", function(exists) {  
	      console.log(exists);  
	  })

- 相对路径获取绝对路径

	- fs.realpath("test", function(err, path) {  
	      console.log(path);  
	  });

- 修改文件名

	- fs.rename("test2", "test", function(err) {  
	      if (err) { console.error(err); }  
	  });

### util

#### 实现继承

- 例子

	- var util = require("util");  
	  //实现继承  
	  function Parent() {  
	      this.name = "老爸";  
	      this.age = 50;  
	      this.sayHello = function() {  
	          console.log("hello");  
	      }  
	  }  
	  Parent.prototype.showName = function() {  
	      console.log(this.name);  
	  }  
	    
	  function Child() {  
	      //要继承函数内部的可以使用call或者apply  
	      this.name = "儿子";  
	  }  
	  //通过这种方式可以继承父类原型中的方法和属性  
	    
	  util.inherits(Child, Parent);  
	  var parentObj = new Parent();  
	  parentObj.showName();  
	  var childObj = new Child();  
	  childObj.showName();

#### 输出对象

- console.log(util.inspect(obj));

#### 类型验证

- console.log(util.isArray([]));  
  //判断是否为一个数组  
  console.log(util.isRegExp(/\d/));  
  //判断是否为一个正则表达式

### stream

#### Stream可以算是node里的一出重头戏，与大数据处理方面有密切不可分的关系

- var fs = require("fs")  
    
  function copy(src, dest) {  
      fs.writeFileSync(dest, fs.readFileSync(src));  
  }  
  copy("data.son", "dataStream.json");

- 上面是一个对文件拷贝的代码，看似没什么问题，也的确在处理小文件的时候没什么大问题，但是一旦处理数量级很大的文件的时候可以看出，先将数据读取出来，在写入，内存作为中转，如果文件太大就会产生问题。

#### 如果是大文件就得使用file system的另外几个API，createReadStream和fs.createWriteStream，将文件作为一块一块小的数据流进行处理，而不是一整块大型数据

- // 也可能出现内存爆仓 写入数据跟不上读取速度 一直读取的文件不断放入内存中  
  // 但是两个操作速度绝对是不一样的，于是未被写入的数据在内存中不断变大，就可能会导致内存的爆仓。  
  var fs = require("fs");  
  var rs = fs.createReadStream("data.son");  
  var ws = fs.createWriteStream("dataStream.json")  
  rs.on("data", function(chunk) {  
      console.log("data chunk read ok");  
      times++;  
      ws.write(chunk, function() {  
          console.log("data chunk write ok");  
      });  
  });  
  rs.on("end", function() { console.log(times); });

- 可以先写一个129k的文件

	- var fs = require("fs");  
	  fs.writeFile("128k.txt", new Buffer(129 * 1024));

#### 对于这种情况 node里面有一个pipe的方法 连接两个数据流，犹如导管一样将数据读入写入

- function copy(src, dest) {  
      fs.createReadStream(src).pipe(fs.createWriteStream(dest));  
  }  
  copy("data.son", "dataStream.json");

### path

#### normalize:规范化字符串路径

- console.log(path.normalize("./../a///b/c/.././d//"));

#### __dirname

- 	•	获取当前路径

#### join 将多个参数值字符串结合成一个路径字符串

- console.log(path.join(__dirname, "a", "b", "..", "c"));

#### resolve:把参数解析为一个绝对路径 * 1.以应用程序的根目录为起点,根据参数的值解析出一个绝对路径 * 2. .当前目录 ..上级目录 * 3. 普通字符串代表下一级目录 * 4. 如果没有下一个参数,返回当前路径 * 5. /代表盘符的根目录

- console.log(path.resolve("/test/index.html"));  
  console.log(path.resolve("wwwroot", "static_files/png/", "../gif/image.gif"));  
  console.log(path.resolve("../7.fs/img.js"));

## http模块深入讲解

### http协议讲解

#### http:超文本传输协议,是互联网使用最广的一个协议

#### http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块

### http——api讲解

#### 创建服务器

- var http = require("http");  
  var url = require("url");  
  //创建服务器  
  //http继承自tcp  
  var server = http.createServer(function(req, res) {  
      var urlstr = req.url; //获取请求的路径  
    
      var urlMethod = req.method; //获取请求的方法  
    
      /*var urlObj = url.parse(urlstr,true);  
      console.log(urlObj);*/  
      //console.log(urlMethod);  
    
      res.end("hello");  
  });  
  server.listen(8080);

#### 对请求进行处理

- var server = http.createServer(function(req, res) {  
      var urlstr = req.url; //获取请求的路径  
      var urlMethod = req.method; //获取请求的方法  
      var urlObj = url.parse(urlstr, true);  
      console.log(urlObj);  
      console.log(urlMethod);  
      console.log(req.headers); //获取请求头  
      console.log(req.httpVersion); //获取http的版本  
      req.on("data", function(chunk) { //获取POST方式发送过来的数据  
          console.log(chunk.toString()); //chunk:数据块  
      });  
      /*res.statusCode = 404;//设置返回的状态码  
      res.setHeader("name","慧点科技");//设置返回的头*/  
      //res.setHeader(,);  
      res.writeHead(200, { name: "慧点科技", pass: "1234", "Content-Type": "text/html;charset=utf-8" });  
      res.write("hello ");  
      res.write("慧点科技-web全栈开发");  
      res.end();  
  });  
  server.listen(8080);

#### 前端发送post请求

- <!DOCTYPE html>  
  <html lang="en">  
    
  <head>  
      <meta charset="UTF-8">  
      <title>这是表单页的标题</title>  
  </head>  
    
  <body>  
      <!—  
      如果没有文件的话可以使用application/x-www-form-urlencoded  
      但是如果有文件的话一定更要用multipart/form-data  
  —>  
      <form action="/upimg" method="post" enctype="multipart/form-data">  
          用户名: <input type="text" name="user"><br>   
          密码: <input type="password" name="pass"><br>   
          上传图片: <input type="file" name="file1"><br>  
          <input type="submit" value="提交">  
      </form>  
  </body>  
    
  </html>

#### http模拟客户端

- var http = require("http");  
  //request函数允许后台发布请求,第一个参数是一个对象或者字符串  
  var options = {  
      host: "localhost",  
      port: "8080",  
      path: " /reg",  
      method: "POST",  
      headers: { "Content-Type": "application/json"� }  
  };  
  /*  
   * request :发请求  
   * http.request() 返回一个 http.ClientRequest类的实例。ClientRequest实例是一个可写流对象。  
   * 如果需要用POST请求上传一个文件的话，就将其写入到ClientRequest对象  
   * */  
    
  var request = http.request(options, function(res) {  
      console.log(res.statusCode);  
      //获取响应回来的内容  
      res.setEncoding("utf8");  
      res.on("data", function(chunk) {  
          console.log(chunk);  
      });  
  });  
  request.write('{ "user ": "huidiankeji ", "pass ": "12345 " }');  
  request.end(); //结束写请求体,真正向服务器发起请求

#### 上传文件的处理

- var http = require("http");  
  var url = require("url");  
  var fs = require("fs");  
  var query string = require("query string");  
  var formidable = require("formidable");  
  //创建服务器  
  //http继承自tcp  
  var server = http.createServer(function(req, res) {  
      //获取请求的路径  
      var urlObj = url.parse(req.url, true);  
      var pathname = urlObj.pathname;  
      if (pathname == "/upimg.html") {  
          var rs = fs.createReadStream("./upimg.html");  
          rs.pipe(res);  
      } else if (pathname == "/upimg") {  
          var form = new formidable.IncomingForm();  
          form.parse(req, function(err, fields, files) {  
              //fields->以对象格式返回字段  
              /*console.log(fields);  
              console.log(files);*/  
              //将暂存文件写入到upload文件目录中  
              fs.createReadStream(files.file1.path).pipe(fs.createWriteStream("./upload/" + files.file1.name));  
              res.setHeader("Content-Type", "text/html;charset=utf8");  
              res.write(JSON.stringify(fields));  
              res.end(‘ < img src = "/upload/‘+files.file1.name+’" > ’);  
          });  
      } else if (pathname != "/favicon.ico") {�� fs.createReadStream("." + pathname).pipe(res);� }  
  });  
  server.listen(8080);

