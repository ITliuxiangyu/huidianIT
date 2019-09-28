# node_mongoDB


## mongoDB

### 简介

#### 一、什么是MongoDB ?  
  1、MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。在高负载的情况下，添加更多的节点，可以保证服务器性能。  
  2、MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。  
  3、MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。  
  二、历史  
  1、2007年10月，MongoDB由10gen团队所发展。2009年2月首度推出。  
  2、2012年05月23日，MongoDB2.1 开发分支发布了! 该版本采用全新架构，包含诸多增强。  
  3、2012年06月06日，MongoDB 2.0.6 发布，分布式文档数据库。  
  4、2013年04月23日，MongoDB 2.4.3 发布，此版本包括了一些性能优化，功能增强以及bug修复。  
  5、2013年08月20日，MongoDB 2.4.6 发布，是目前最新的稳定版。  
  三、主要特点  
  1、MongoDB的提供了一个面向文档存储，基本的思路就是将原来“行”的概念换成更加灵活的“文档”模型。一条记录可以表示非常复杂的层次关系。  
  2、Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。  
  ￼  
  3、非常容易扩展。面对数据量的不断上涨，通常有两种方案，一种是购买更好的硬件，别一种是分散数据，进行分布式的扩展，前者有着非常大的缺点，因 为硬件通常是有物理极限的，当达到极限以后，处理能力就不可能再进行扩展了。所以建议的方式是使用集群进行扩展。MongoDB所采用的面向文档的数据模 型使其可以自动在多台服务器之间分割数据。它还可以平衡集群的数据和负载，自动重排文档。  
  4、MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。  
  5、丰富的功能。包括索引、存储JavaScript、聚合、固定集合、文件存储等。  
  6、方便的管理，除了启动数据库服务器之外，几乎没有什么必要的管理操作。管理集群只需要知道有新增加的节点，就会自动集成和配置新节点。  
  		

### 安装

#### brew install mongodb

#### http://blog.sina.com.cn/s/blog_7c8dc2d50101lwka.html

### 概念

#### 

#### 

#### 一、数据库  
  1、一个mongodb中可以建立多个数据库。  
  2、MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。  
  3、数据库也通过名字来标识。数据库名可以是满足以下条件的任意UTF-8字符串。  
  1.不能是空字符串（””)。  
  2.不得含有’ ‘（空格)、.、$、/、\和\0 (空宇符)。  
  3.应全部小写。  
  4.最多64字节。  
  4、有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。  
  1.admin： 从权限的角度来看，这是”root”数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。  
    
  2.local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合   
    
  3.config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

#### 二、文档  
  文档是mongodb中的最核心的概念，是其核心单元，我们可以将文档类比成关系型数据库中的每一行数据。  
  多个键及其关联的值有序的放置在一起就是文档。MongoDB使用了BSON这种结构来存储数据和网络数据交换。  
  BSON数据可以理解为在JSON的基础上添加了一些json中没有的数据类型。  
  如果我们会JSON，那么BSON我们就已经掌握了一半了，至于新添加的数据类型后面我会介绍。  
  文档例子如下：  
  {name:”张三”,age:20,hobby:[“看书”,”旅游”,”唱歌”]}  
  需要注意的是：  
  1. 文档中的键/值对是有序的。  
  2. 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌人的文档)。  
  3. MongoDB区分类型和大小写。  
  4. MongoDB的文档不能有重复的键。  
  5. 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。  
  文档键命名规范：  
  1 键不能含有\0 (空字符)。这个字符用来表示键的结尾。  
  2 .和$有特别的意义，只有在特定环境下才能使用。  
  3 以下划线”_”开头的键是保留的(不是严格要求的)。  
  三、集合  
  集合就是一组文档的组合。如果将文档类比成数据库中的行，那么集合就可以类比成数据库的表。  
  在mongodb中的集合是无模式的，也就是说集合中存储的文档的结构可以是不同的，比如下面的两个文档可以同时存入到一个集合中：  
  {“name”:”tangcaiye”}  
  {“Name”:”tangcaiye”,”sex”:”nan”}  
  注：当第一个文档插入时，集合就会被创建。  
  合法的集合名  
  1. 集合名不能是空字符串””。  
  2. 集合名不能含有\0字符（空字符)，这个字符表示集合名的结尾。  
  3. 集合名不能以”system.”开头，这是为系统集合保留的前缀。  
  4. 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。　  
  四、 MongoDB 数据类型  
  下表为MongoDB中常用的几种数据类型。  
  		

#### 

### 终端中启动

#### 首先需要指定数据库的地址：

- mongod —dbpath=数据库地址

- 再在终端中键入mongo

- 在启动之后可以通过可视化数据库管理工具操作

	- 推荐：Robomongo

### 操作mongodb基础

#### 1.创建数据库

- use database_name      database_name代表数据库的名字  
  注：如果数据库不存在，则创建数据库，否则切换到指定数据库

#### 2.查看所有数据库

- show dbs  
  注：我们刚创建的数据库 person 如果不在列表内， 要显示它，我们需要向 person 数据库插入一些数据 db.person.insert({name:”zhangSan”,age:30})

#### 5.断开连接

- exit

#### 3.查看当前使用的数据库

- db 或 db.getName()    
  注：db代表的是当前数据库 也就是person这个数据库

#### 6.查看命令api

- help

#### 4.删除数据库

- db.dropDatabase() 

### 操作集合

#### 操作集合方法  
  查看帮助api  
  语法  
  db.worker.help()  
  ￼  
  查看当前数据库下有哪集合（collection）  
  语法  
  show collections  
  ￼  
  创建集合（collection）  
  1. 使用 db.createCollection(collection_Name)方法  
  语法  
  db.createCollection(“collection_Name”)     collection_Name集合的名称  
  2. 使用 db.collection_Name.insert(document)方法  
  语法  
  db.collection_Name.insert(document)    collection_Name集合的名称    document要插入的文档  
  ￼  
  注：两者的区别在于前者创建了一个空的worker集合 后者创建了一个空的worker集合并添加了一个Document数据  
  删除当前数据库中的集合（collection）  
  语法  
  db.collection_Name.drop()    collection_Name 集合的名称

### 文档操作

#### 插入文档  
  1、 使用insert()方法插入文档  
  语法  
  db.collection_name.insert(document)   collection_name集合的名字    document插入的文档  
  实例  
  db.worker.insert({name:’zpx’,age:6}) 向worker集合添加一个{name:’zpx’,age:6}的Document   
  ￼  
  db.worker.insert([{name:’wangWu’,age:50},{name:’xiaoMing’,age:60}]) 向worker集合添加多个[{name:’wangWu’,age:50},{name:’xiaoMing’,age:60}] 的Document  
  ￼  
  2、 使用save()方法插入文档  
  语法  
  db.collection_name.save(document)   collection_name集合的名字    document插入的文档  
  注：如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。   
  实例  
  db.person.save({name:”xiaoHong”,age:50})  
  ￼  
  db.person.save({_id:ObjectId(“562c9caf671c978b6596e825”),name:”xiaoHong”,age:10})  
  ￼

### 文档更新

#### MongoDB 更新文档  
  1.update()方法用于更新已存在的文档  
  语法  
  db.collection.update(  
     <query>,  
     <update>,  
     {  
       upset: <boolean>,  
       multi: <boolean>,  
       writeConcern: <document>  
     }  
  )  
  参数说明：  
  query : update的查询条件，类似sql update查询内where后面的。  
  update : update的对象和一些更新的操作符（如$set,$inc...）等 $inc在原基础上累加后更新   $set直接更新  
  upsert  : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。  
  multi  : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。  
  writeConcern  :可选，抛出异常的级别。  
  实例  
  db.worker.update({name:’liSi’},{$set:{name:’liSi_update’}}) 将document数据中name是liSi 的数据的name修改为liSi_update  
  注：如果有多条name是liSi的数据只更新一条  
  ￼  
  db.worker.update({name:’liSi_update’}, {$set: {age:40}},{multi:true}) 将document数据中name是liSi_update 的数据的age修改为 40  
  注：如果有多条name是liSi的数据这些数据全部更新  
  ￼  
  db.worker.update({name:’liSi_update’},{$inc:{age:1}}) 将document数据中name是lliSi_update 的数据的age在原来的基础上加1  
  ￼  
  2.save()方法通过传入的文档来替换已有文档  
  语法  
  db.collection.save(  
  <document>,  
  {  
  writeConcern: <document>  
  }  
  参数说明：  
    document : 文档数据。  
    writeConcern  :可选，抛出异常的级别。  
  实例  
  db.person.save({_id:ObjectId(“562c9caf671c978b6596e825”),name:”xiaoHong”,age:10})  
  ￼

### 查询条件and和or

#### 查询条件and和or  
  1.MongoDB AND 条件  
  MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开  
  语法  
  db.col.find({key1:value1, key2:value2}).pretty()    
  实例  
  db.worker.find({name:’tangcaiye’,age:30}) 查询name是tangcaiye并且age是30的数据  
  ￼  
  2.MongoDB OR 条件  
  MongoDB OR 条件语句使用了关键字 $or,语法格式如下：  
  语法  
  db.col.find(  
     {  
        $or: [  
           {key1: value1}, {key2:value2}  
        ]  
     }  
  )  
  实例  
  db.worker.find({$or:[{age = 30},{age = 50}]}) 查询age = 30 或者 age = 50  的数据  
  ￼  
  3.AND 和 OR 联合使用  
  语法  
  db.col.find(  
     {  
       key1:value1,   
       key2:value2,  
       $or: [  
           {key1: value1},   
           {key2:value2}  
       ]  
     }  
  )  
  实例  
   查询 name是tangcaiye 并且 age是30 或者 age是 50 的数据  
   db.worker.find({name:’tangcaiye’,$or:[{age:30},{age:50}]})

### 文档删除

#### MongoDB 删除文档  
  remove()方法是用来移除集合中的数据。  
  注：在执行remove()函数前先执行find()命令来判断执行的条件是否正确，这是一个比较好的习惯。  
  语法  
  db.collection.remove(  
     <query>,  
     <justOne>  
  )  
  如果你的 MongoDB 是 2.6 版本以后的，语法格式如下：  
  db.collection.remove(  
     <query>,  
     {  
       justOne: <boolean>,  
       writeConcern: <document>  
     }  
  )  
  参数说明：  
  query :（可选）删除的文档的条件。  
  justOne : （可选）如果设为 true 或 1，则只删除一个文档。  
  writeConcern  :（可选）抛出异常的级别。  
  实例  
  db.worker.remove({name:’fJianZhou’}) 删除worker集合里name是fJianZhou的所有Document数据  
  ￼  
  db.person.remove({name:”xiaoHong”},1)  删除person集合里name是xiaoHong的第一条数据  
  ￼

### limit和skip方法

#### MongoDB Limit与Skip方法  
  1.MongoDB Limit() 方法 读取指定数量的数据记录  
  语法  
  db.collectionName.find().limit(number)    collectionName集合    number读取的条数  
  实例  
  db.worker.find().limit(3) 查询前3条数据  
  ￼  
  2.MongoDB Skip() 方法 跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数。  
  语法  
  db.collectionName.find().skip(number)    collectionName集合    number跳过的条数  
  实例  
  db.worker.find().skip(3) 查询3条以后的数据  
  ￼  
  3.MongoDB Skip()方法和Limit()方法混合使用  
  注： 通常用这种方式来实现分页功能  
  语法  
  db.collectionName.find().limit(number).skip(number)    
  实例  
  db.worker.find().sort({age:-1}) 查询在4-6之间的数据

### 查询文档

#### MongoDB 查询文档  
  1.find()方法  
  语法  
  db.collection_name.find()  collection_name 集合的名字  
  实例  
  db.worker.find()  查询worker下所有的document数据  
  ￼  
  2.find()方法 查询指定列  
  语法  
  db.collection_name.find({queryWhere},{key:1,key:1}) collection_name 集合的名字 key要显示字段  1表示显示  queryWhere参阅查询条件操作符  
  实例  
  db.worker.find({},{age:1}) 查询指定列   
  ￼  
  3.pretty()方法以格式化的方式来显示所有文档。  
  语法  
  db.collection_name.find().pretty()   collection_name 集合的名字  
  实例  
   db.worker.find().pretty()  
  ￼  
  4.findOne()方法查询匹配结果的第一条数据  
  语法  
  db.collection_name.findOne()  collection_name 集合的名字  
  实例

### 查询条件操作符

#### 查询条件操作符  
  描述：条件操作符用于比较两个表达式并从mongoDB集合中获取数据。  
  ￼  
  1.MongoDB (>) 大于操作符 - $gt  
  语法  
  db.collectionName.find({<key>:{$gt:<value>}}) collectionName集合名词    key字段    value值  
  实例  
  db.worker.find({age:{$gt:30}}) 查询age 大于 30的数据  
  ￼  
  2.MongoDB（>=）大于等于操作符 - $gte  
  语法  
  db.collectionName.find({<key>:{$gte:<value>}}) collectionName集合名词    key字段    value值  
  实例  
  db.worker.find({age: {$gte: 30}}) 查询age 3大于等于30 的数据  
  ￼  
  3.MongoDB (<) 小于操作符 - $lt  
  语法  
  db.collectionName.find( {<key>:{$lt:<value>}}) collectionName集合名词    key字段    value值  
  实例  
  db.worker.find({age: {$lt: 30}}) 查询age 小于30的数据  
  ￼  
  4.MongoDB (<=) 小于等于操作符 - $lte  
  语法  
   db.collectionName.find({<key>:{$lte:<value>}}) collectionName集合名词    key字段    value值  
  实例  
  db.worker.find({age: {$lte: 30}}) 查询age 小于等于30的数据  
  ￼  
  5.MongoDB 使用 (>=) 和 (<=) 查询 - $gte 和 $lte  
  语法  
   db.collectionName.find({<key>:{$gte:<value>},<key>:{$lte:<value>}}) collectionName集合名词    key字段    value值  
  实例  
  db.worker.find({age: {$gte: 30, $lte: 50}}) 查询age 大于等于 30 并且 age 小于等于 50  的数据  
  ￼  
  6.MongoDB 等于（==）  
  语法  
   db.collectionName.find({<key>:<value>,<key>:<value>})   collectionName集合名词    key字段    value值  
  实例  
  db.worker.find({"age": 30})`查询age = 30的数据  
  ￼  
  7.MongoDB 使用 _id进行查询  
  语法  
  db.collectionName.find({"_id" : ObjectId("value")})  value _id的值  
  实例  
  db.worker.find({"_id" : ObjectId("562af23062d5a57609133974")}) 查询_id是 562af23062d5a57609133974 数据  
  ￼  
  8.MongoDB 查询某个结果集的数据的条数  
  语法  
  db.collectionName.find().count()   collectionName集合名称  
  实例  
  db.worker.find().count()   
  ￼  
  9.MongoDB 查询某个字段的值当中是否包含另一个值  
  语法  
  db.collection.find({key:/value/})   collectionName集合名称 key 字段  value值  
  实例  
  db.worker.find({name:/value/}) 查询name里包含zhang的数据  
  ￼  
  10.MongoDB 查询某个字段的值当中是否以另一个值开头  
  语法  
  db.collection.find({key:/^value/})   collectionName集合名称 key 字段  value值  
  实例  
  db.worker.find({name:/^zhang/})

### 排序

#### 排序  
  MongoDB sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。  
  语法  
  db.collectionName.find().sort({KEY:1}) 或者 db.collectionName.find().sort({KEY:-1})  collectionName集合  key表示字段     
  实例  
  db.worker.find().sort({age:1}) 查询出并升序排序 {age:1}  age表示按那个字段排序 1表示升序  
  ￼  
  db.worker.find().sort({age:-1})  查询出并降序排序  {age:-1} age表示按那个字段排序 -1表示降序  
  ￼

## mongoose

### 简介

#### Mongoose是MongoDB的一个对象模型工具，是基于node-mongoldb-native开发的MongoDB nodes驱动，可以在异步的  
  环境下执行。同时它也是针对MongoDB操作的一个对象模型库，封装了MongoDB对文档的的一些增删改查等常用方法，让Node  
  JS操作Mongodb数据库变得更加灵活简单。

#### 2.Mongoose能做什么？  
  Mongoose，因为封装了对MongoDB对文档操作的常用处理方法，让NodeJS操作Mongodb数据库变得更加容易。

### 安装

#### 安装使用mongoose：  
  	1.	安装mongoose： nam install mongoose  
  	  
  	2.	引用mongoose： var mongoose = require(“mongoose”);  
  	  
  	3.	使用”mongoose”连接数据库： var db = mongoose.connect(“[mongodb://user:pass@localhost:port/database](mongodb://user:pass@localhost:port/database)”);  
  	  
  	4.	执行下面代码检查默认数据库test，是否可以正常连接成功? var mongoose = require("mongoose");  
  var db = mongoose.connect("mongodb://127.0.0.1:27017");  
  db.connection.on("error", function(error) {  
      console.log("数据库连接失败：" + error);  
  });  
  db.connection.on("open", function() {  
      console.log("数据库连接成功");  
  }); 

### 集合

#### MongoDB —— 是一个对象数据库，没有表、行等概念，也没有固定的模式和结构，所有的数据以Document(以下简称文档)的形式存储(Document，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。)，后面我们会学习如何创建文档并插入内容。  
  在MongoDB中，多个Document可以组成Collection(以下简称集合)，多个集合又可以组成数据库。  
  我们想要操作MongoDB数据，那就得先要具备上面所说的包含数据的“文档”，文档又是什么意思呢，请看如下介绍。  
  文档 —— 是MongoDB的核心概念，是键值对的一个有序集，在JavaScript里文档被表示成对象。同时它也是MongoDB中数据的基本单元，非常类似于关系型数据库管理系统中的行，但更具表现力。  
  集合 —— 由一组文档组成，如果将MongoDB中的一个文档比喻成关系型数据库中的一行，那么一个集合就相当于一张表。  
  如果我们要通过Mongoose去创建一个“集合”并对其进行增删改查，该怎么实现呢，到这里我们就要先了解Schema(数据属性模型)、Model、Entity了。

### Schema

#### Schema —— 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架。

#### 基本属性类型有：字符串、日期型、数值型、布尔型(Boolean)、null、数组、内嵌文档等。

#### //集合的数据模型定义,定义了字段名和字段的类型, 默认值  
  var PersonSchema = new mongoose.Schema({  
      name: { type: String },  
      age: { type: Number, default: 0 },  
      time: { type: Date, default: Date.now },  
      email: { type: String, default: "" }  
  }, {  
      collection: "jihe"  
  });

### model

#### 介绍

- Model —— 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类

#### 代码

- //创建model  model(集合名称,集合的数据模型)  
  var Model = db.model("jihe",PersonSchema);

### Entity

#### 介绍

- Entity —— 由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。

#### 代码

- //创建model  model(集合名称,集合的数据模型)  
  var Model = db.model("jihe", PersonSchema);  
  //创建一个文档  
  var jiheEntity = new Model({  
      name: "tangcaiye",  
      age: 8,  
      email: "641418330@qq.com"  
  });  
  console.log(jiheEntity.name);  
  console.log(jiheEntity.time);  
  jiheEntity.save(function(error, doc) {  
      if (error) {  
          console.log(error);  
      } else {  
          console.log(doc);  
      }  
  });

### 保存

#### Model.create({  
      name: "zhangsan",  
      age: "15"  
  }, function(err, doc) {  
      if (err) {  
          console.log(err);  
      } else {  
          console.log(doc);  
      }  
  });

### 更改

#### 请注意如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}

#### var query = {  
      name: "zhangsan"  
  };  
  var update = { $set: { age: 100 } };  
  Model.find(query, function(err, doc) {  
      console.log(doc);  
  });  
  Model.update(query, update, function(error) {  
      if (error) {  
          console.log(error);  
      } else {  
          console.log("更新成功 ");  
      }  
  })

#### PersonModel.update(conditions, update, { multi: true }, function(error) {  
      if (error) {  
          console.log(error);  
      } else {  
          console.log(‘Update success!’);  
      }  
  });

### 删除数据

#### var query = { name: "zhangsan" };  
  Model.remove(query, function(err) {  
      if (err) {  
          console.log(err);  
      } else {  
          console.log("删除成功 ");  
      }  
  })

### 简单查询

#### 属性过滤 �find(Conditions,field,callback);  
  解释: field省略或为Null，则返回所有属性。  
  eg:�//返回只包含name、age两个键的所有记录  
  Model.find({},{name:1, age:1, _id:0}，function(err,docs){  
     //docs 查询结果集  
  })�  
  说明：我们只需要把显示的属性设置为大于零的数就可以，�当然1是最好理解的，_id是默认返回，�如果不要显示加上(“_id”:0)，�但是，对其他不需要显示的属性且不是_id，�如果设置为0的话将会抛异常或查询无果。  
    
    
  findOne(查询单条)  
  与find相同，但只返回单个文档，�也就说当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果。�  
  1.单条数据 findOne(Conditions,callback);�eg:  
  TestModel.findOne({ age: 6}, function (err, doc){  
     // 查询符合age等于6的第一条数据  
     // doc是查询结果  
  });  
  说明:findOne方法，只返回第一个符合条件的文档数据。�  
  findById(按ID单条数据)  
  与findOne相同，但它只接收文档的_id作为参数，返回单个文档。�eg:  
  按ID单条数据 findById(_id, callback);  
  PersonModel.findById(person._id, function (err, doc){  
   //doc 查询结果文档  
  }); 

### 高级查询

#### //大于  
  Model.find({ "age": { "$gt": 6 } }, function(err, doc) {  
      console.log(doc);  
  });  
  //小于  
  Model.find({ "age": { "$lt": 9 } }, function(err, doc) {  
      console.log(doc);  
  });  
  //不等于  
  Model.find({ "age": { "$ne": 8 } }, function(err, doc) {  
      console.log(doc);  
  })

#### // $or(或者)  
  // $or操作符，可以查询多个键值的任意给定值，只要满足其中一个就可返回，  
  // 用于存在多个条件判定的情况下使用，如下示例：  
  Model.find({ "$or": [{ "name": "慧点科技" }, { "age": 6 }] }, function(error, docs) {  
      //查询name为tangcaiye或age为6的全部文档  
  });  
    
  // $exists(是否存在)  
  // $exists操作符，可用于判断某些关键字段是否存在来进行条件查询。如下示例：  
  Model.find({ name: { $exists: true } }, function(error, docs) {  
      //查询所有存在name属性的文档  
  });  
    
  Model.find({ email: { $exists: false } }, function(error, docs) {  
      //查询所有不存在email属性的文档  
  });

### 游标操作

#### 简介  
  数据库使用游标返回find的执行结果。客户端对游标的实现通常能够对最终结果进行有效的控制。可以限制结果的数量，略过部分结果，根据任意键按任意顺序的组合对结果进行各种排序，或者是执行其他操作。  
  最常用的查询选项就是限制返回结果的数量(limit函数)、忽略一点数量的结果(skip函数)以及排序(sort函数)。所有这些选项一点要在查询被发送到服务器之前指定。  
  limit函数的基本用法  
  在查询操作中，有时数据量会很大，这时我们就需要对返回结果的数量进行限制，那么我们就可以使用limit函数，通过它来限制结果数量。  
    
  // 限制数量：find(Conditions,fields,options,callback);  
  Model.find({}, null, { limit: 20 }, function(err, docs) {  
      console.log(docs);  
  });  
  // 如果匹配的结果不到20个，则返回匹配数量的结果，  
  // 也就是说limit函数指定的是上限而非下限。  
    
    
  // skip函数的基本用法  
  // skip函数和limit类似，都是对返回结果数量进行操作，  
  // 不同的是skip函数的功能是略过指定数量的匹配结果，返回余下的查询结果。  
  // 如下示例：  
  // 跳过数量：find(Conditions,fields,options,callback);  
  Model.find({}, null, { skip: 4 }, function(err, docs) {  
      console.log(docs);  
  });  
  // 如果查询结果数量中少于4个的话，则不会返回任何结果。  
    
  //sort函数的基本用法  
  // sort函数可以将查询结果数据进行排序操作，该函数的参数是一个或多个键/值对，  
  // 键代表要排序的键名，值代表排序的方向，1是升序，-1是降序。  
  // 结果排序：find(Conditions,fields,options,callback);  
  Model.find({}, null, { sort: { age: -1 } }, function(err, docs) {  
      //查询所有数据，并按照age降序顺序返回数据docs  
  });  
  // sort函数可根据用户自定义条件有选择性的来进行排序显示数据结果

