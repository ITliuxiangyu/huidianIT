# 03_stream数据流


## 事件监听

### var fs = require('fs')  
  var readable = fs.createReadStream('sample.txt');  
  // fs.createWriteStream('sample.txt');  
    
  readable.on('data', (chunk) => {  
      console.log('----从流里面读出来--')  
      console.log(chunk.toString());  
  });  
  readable.on('end', () => {  
      console.log('数据读完了');  
  });

## 通过stream流压缩文件

### var fs = require('fs')  
  var zlib = require('zlib')  
    
  //创建一个可读流  
  var r = fs.createReadStream('sample.txt');  
  var z = zlib.createGzip();//压缩的方法  
  //创建一个可写流  
  var w = fs.createWriteStream('file.txt.gz');  
    
  r.pipe(z).pipe(w);

