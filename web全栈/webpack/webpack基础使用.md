# webpack基础使用


## 起步

### 先建立一个文件夹，用来作为学习Webpack的项目文件夹，文件夹名随意，接着在项目使用命令行中初始化npm

#### npm init

## 1.  npm install --save-dev webpack

### webpack的核心库

## 2.  npm install --save-dev webpack-cli

### 分离出来的webpack命令行功能  
  我们需要使用webpack-cli来进行项目的打包等操作

## 3.    —save和—save-dev，两者的区别

### --save是生产环境的依赖，也就是供给用户使用的依赖

### --save-dev是开发环境的依赖，比如Webpack，在代码完成并且打包之后，就不需要再使用到它了

## **4.   不使用Webpack构建项目是的缺陷**

### 在项目文件夹中创建几个目录和文件，项目结构如下图所示，前面带加号的是需要你自己创建的文件和目录：

#### 

- src/index.js

	- function component() {  
	      var element = document.createElement('div');  
	    
	      // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的  
	      element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
	    
	      return element;  
	  }  
	    
	  document.body.appendChild(component());

- index.html

	- <!doctype html>  
	  <html>  
	    <head>  
	      <title>Getting Started</title>  
	      <script src="https://unpkg.com/lodash@4.16.6"></script>  
	    </head>  
	    <body>  
	      <script src="./src/index.js"></script>  
	    </body>  
	  </html>

		- 这里的Lodash是一个JavaScript库

		- 这里引用的意味就是给大家展示一下我们平时使用第三方JavaScript库的做法，这样的做法会产生很多问题，因为通过index.html的联系，很明显，index.js对第三方库lodash产生了隐形依赖，之所以说是隐形依赖，是因为在lodash被引用之前，index.js中的双下划线变量(lodash提供的一个变量)还是未知的，只有在lodash被引用之后，这个变量才能发挥作用，显而易见，这样做的很危险的，这样会产生很多问题：

			- 	•	无法立即体现，脚本的执行依赖于外部扩展库(external library)。  
			  	•	如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。  
			  	•	如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

		- Webpack的价值就这样体现出来了，当你的项目中引用的JavaScript文件，html页面越来越多，就会出现一些不可避免的依赖问题，而我们通过Webpack可以解决这一问题，对于一个html页面，我们可以该页面依赖的所有JavaScript文件打包在一起，构成一个JavaScript文件，这样，html页面只需要引用这一个JavaScript文件即可，上面说的问题，就可以完全被避免。当然自己打包也是可以的，不过通过Webpack这一神器，就没那么麻烦了，你只要告诉它，你需要把哪些文件打包，输出到哪里，它就可以自动分析所有JavaScript的依赖关系，然后帮你打包成一个文件。

## **5.   使用Webpack打包**

### 在打包之前，我们还需要做一点小小的调整----将开发环境和生产环境分开：

#### 

- 这样一来，src文件夹里面，放的就是我们开发的环境，所有的代码编写都在这里进行，而相对稳定的html文件就直接放入dist文件夹中，作为生产环境的文件，这样有一个好处，每一次更新src之后，只需要把src中的东西重新打包，然后供生产环境中的html文件使用，就行了，而html文件本身，几乎不用被更改。

### 因为我们用到了lodash包，所以需要在npm中安装lodash依赖：

#### npm install --save lodash

### 添加lodash依赖之后，我们就可以在js文件中导入并且使用了：

#### 

### 因为接下来我们要使用Webpack打包所有的js，这样的话，我们就不需要再自己在html引入JavaScript库了，而只需要引入打包之后的文件就行了，我们先约定以后打包的文件名叫做bundle.js，那么接下来，修改html文件：

#### dist/index.html

- 

### 在命令行输入

#### linux 环境下     ./node_modules/.bin/webpack-cli src/index.js --output dist/bundle.js

#### windows 环境下    .\node_modules\.bin\webpack-cli src/index.js --output dist/bundle.js

### 打包成功并且输出之后，你就可以打开dist/html文件看看结果了

### 每次都要自己输入巴拉巴拉一大串命令，那也太麻烦了吧，Webpack显然想到了这一点，它是支持配置文件的，你只需要在项目根目录下新建一个配置文件webpack.config.js，

#### webpack.config.js

- const path = require('path');  
    
  module.exports = {  
      entry: './src/index.js',  
      output: {  
        filename: 'bundle.js',  
        path: path.resolve(__dirname, 'dist')  
      }  
  };

### 完成配置文件之后，你需要打包时，就不需要再自己输入入口和输出了，直接这样就行了

#### // linux  
  ./node_modules/.bin/webpack-cli  
  // windows  
  .\node_modules\.bin\webpack-cli

### **NPM脚本**

#### 既然有npm，为什么不能直接让npm帮我运行呢，答案是可以的，npm支持用户自定义脚本，用户可以在npm的配置文件中添加自己的脚本内容，然后使用下面给出的指令来运行用户的脚本

- npm run 脚本名

#### package.json

- 

#### 这样一来，只要

- npm run build

## 6. 资源管理

### 6.1 在开始之前，让我们对项目做一个小的修改：

#### **dist/index.html**

-   <!doctype html>  
    <html>  
      <head>  
  -    <title>起步</title>  
  +    <title>管理资源</title>  
      </head>  
      <body>  
        <script src="./bundle.js"></script>  
      </body>  
    </html>

### 6.2 加载 CSS

#### 为了在 JavaScript 模块中 import 一个 CSS 文件，你需要安装 [style-loader](https://webpack.docschina.org/loaders/style-loader) 和 [css-loader](https://webpack.docschina.org/loaders/css-loader)，  
  并在 [module 配置](https://webpack.docschina.org/configuration/module) 中添加这些 loader：

- npm install --save-dev style-loader css-loader

- const path = require('path');  
    
    module.exports = {  
      entry: './src/index.js',  
      output: {  
        filename: 'bundle.js',  
        path: path.resolve(__dirname, 'dist')  
      },  
  +   module: {  
  +     rules: [  
  +       {  
  +         test: /\.css$/,  
  +         use: [  
  +           'style-loader',  
  +           'css-loader'  
  +         ]  
  +       }  
  +     ]  
  +   }  
    };

- 这使你可以在依赖于此样式的 js 文件中 import './style.css'。现在，在此模块执行过程中，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。

#### 通过在项目中添加一个新的 style.css 文件，并将其 import 到我们的 index.js 中：

- webpack-demo  
    |- package.json  
    |- webpack.config.js  
    |- /dist  
      |- bundle.js  
      |- index.html  
    |- /src  
  +   |- style.css  
      |- index.js  
    |- /node_modules

	- **src/style.css**

		- .hello {  
		    color: red;  
		  }

	- **src/index.js**

		- import _ from 'lodash';  
		  + import './style.css';  
		    
		    function component() {  
		      var element = document.createElement('div');  
		    
		      // lodash 是由当前 script 脚本 import 导入进来的  
		      element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
		  +   element.classList.add('hello');  
		    
		      return element;  
		    }  
		    
		    document.body.appendChild(component());

	- 现在运行 build 命令：

		- npm run build

### 6.3 加载 images 图像

#### 假想，现在我们正在下载 CSS，但是像 background 和 icon 这样的图像，要如何处理呢？使用 [file-loader](https://webpack.docschina.org/loaders/file-loader)，我们可以轻松地将这些内容混合到 CSS 中：

- npm install --save-dev file-loader

- **webpack.config.js**

	- const path = require('path');  
	    
	    module.exports = {  
	      entry: './src/index.js',  
	      output: {  
	        filename: 'bundle.js',  
	        path: path.resolve(__dirname, 'dist')  
	      },  
	      module: {  
	        rules: [  
	          {  
	            test: /\.css$/,  
	            use: [  
	              'style-loader',  
	              'css-loader'  
	            ]  
	          },  
	  +       {  
	  +         test: /\.(png|svg|jpg|gif)$/,  
	  +         use: [  
	  +           'file-loader'  
	  +         ]  
	  +       }  
	        ]  
	      }  
	    };

#### 向项目添加一个图像

- webpack-demo  
    |- package.json  
    |- webpack.config.js  
    |- /dist  
      |- bundle.js  
      |- index.html  
    |- /src  
  +   |- icon.png  
      |- style.css  
      |- index.js  
    |- /node_modules

- **src/index.js**

	- import _ from 'lodash';  
	    import './style.css';  
	  + import Icon from './icon.png';  
	    
	    function component() {  
	      var element = document.createElement('div');  
	    
	      // lodash，现在由此脚本导入  
	      element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
	      element.classList.add('hello');  
	    
	  +   // 将图像添加到我们已经存在的 div 中。  
	  +   var myIcon = new Image();  
	  +   myIcon.src = Icon;  
	  +  
	  +   element.appendChild(myIcon);  
	    
	      return element;  
	    }  
	    
	    document.body.appendChild(component());

- **src/style.css**

	- .hello {  
	      color: red;  
	  +   background: url('./icon.png');  
	    }

- 重新构建并再次打开 index.html 文件：

	- npm run build

### 6.4 加载 font 字体

#### 像字体这样的其他资源如何处理呢？

#### file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。

#### 更新 webpack.config.js 来处理字体文件：

- **webpack.config.js**

	- const path = require('path');  
	    
	    module.exports = {  
	      entry: './src/index.js',  
	      output: {  
	        filename: 'bundle.js',  
	        path: path.resolve(__dirname, 'dist')  
	      },  
	      module: {  
	        rules: [  
	          {  
	            test: /\.css$/,  
	            use: [  
	              'style-loader',  
	              'css-loader'  
	            ]  
	          },  
	          {  
	            test: /\.(png|svg|jpg|gif)$/,  
	            use: [  
	              'file-loader'  
	            ]  
	          },  
	  +       {  
	  +         test: /\.(woff|woff2|eot|ttf|otf)$/,  
	  +         use: [  
	  +           'file-loader'  
	  +         ]  
	  +       }  
	        ]  
	      }  
	    };

#### 在项目中添加一些字体文件：

- webpack-demo  
    |- package.json  
    |- webpack.config.js  
    |- /dist  
      |- bundle.js  
      |- index.html  
    |- /src  
  +   |- my-font.woff  
  +   |- my-font.woff2  
      |- icon.png  
      |- style.css  
      |- index.js  
    |- /node_modules

#### **src/style.css**

- + @font-face {  
  +   font-family: 'MyFont';  
  +   src:  url('./my-font.woff2') format('woff2'),  
  +         url('./my-font.woff') format('woff');  
  +   font-weight: 600;  
  +   font-style: normal;  
  + }  
    
    .hello {  
      color: red;  
  +   font-family: 'MyFont';  
      background: url('./icon.png');  
    }

#### 重新构建

- npm run build

### 6.5 加载数据

#### 可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)。

- npm install --save-dev csv-loader xml-loader

#### **webpack.config.js**

- const path = require('path');  
    
    module.exports = {  
      entry: './src/index.js',  
      output: {  
        filename: 'bundle.js',  
        path: path.resolve(__dirname, 'dist')  
      },  
      module: {  
        rules: [  
          {  
            test: /\.css$/,  
            use: [  
              'style-loader',  
              'css-loader'  
            ]  
          },  
          {  
            test: /\.(png|svg|jpg|gif)$/,  
            use: [  
              'file-loader'  
            ]  
          },  
          {  
            test: /\.(woff|woff2|eot|ttf|otf)$/,  
            use: [  
              'file-loader'  
            ]  
          },  
  +       {  
  +         test: /\.(csv|tsv)$/,  
  +         use: [  
  +           'csv-loader'  
  +         ]  
  +       },  
  +       {  
  +         test: /\.xml$/,  
  +         use: [  
  +           'xml-loader'  
  +         ]  
  +       }  
        ]  
      }  
    };

#### 在项目中添加一些数据文件

- webpack-demo  
    |- package.json  
    |- webpack.config.js  
    |- /dist  
      |- bundle.js  
      |- index.html  
    |- /src  
  +   |- data.xml  
      |- my-font.woff  
      |- my-font.woff2  
      |- icon.png  
      |- style.css  
      |- index.js  
    |- /node_modules

	- **src/data.xml**

		- <?xml version="1.0" encoding="UTF-8"?>  
		  <note>  
		    <to>Mary</to>  
		    <from>John</from>  
		    <heading>Reminder</heading>  
		    <body>Call Cindy on Tuesday</body>  
		  </note>

#### 现在，你可以 import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 Data 变量，将包含可直接使用的已解析 JSON：

- **src/index.js**

	- import _ from 'lodash';  
	    import './style.css';  
	    import Icon from './icon.png';  
	  + import Data from './data.xml';  
	    
	    function component() {  
	      var element = document.createElement('div');  
	    
	      // lodash，现在通过 script 标签导入  
	      element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
	      element.classList.add('hello');  
	    
	      // 将图像添加到我们已经存在的 div 中。  
	      var myIcon = new Image();  
	      myIcon.src = Icon;  
	    
	      element.appendChild(myIcon);  
	    
	  +   console.log(Data);  
	    
	      return element;  
	    }  
	    
	    document.body.appendChild(component());

#### 重新执行 npm run build 命令

## 7. 管理输出

### 7.1 先删除一点东西, 让项目看起来干净一点

#### 项目

- webpack-demo  
    |- package.json  
    |- webpack.config.js  
    |- /dist  
      |- bundle.js  
      |- index.html  
    |- /src  
  -   |- data.xml  
  -   |- my-font.woff  
  -   |- my-font.woff2  
  -   |- icon.png  
  -   |- style.css  
      |- index.js  
    |- /node_modules

#### **webpack.config.js**

- const path = require('path');  
    
    module.exports = {  
      entry: './src/index.js',  
      output: {  
        filename: 'bundle.js',  
        path: path.resolve(__dirname, 'dist')  
      },  
  -   module: {  
  -     rules: [  
  -       {  
  -         test: /\.css$/,  
  -         use: [  
  -           'style-loader',  
  -           'css-loader'  
  -         ]  
  -       },  
  -       {  
  -         test: /\.(png|svg|jpg|gif)$/,  
  -         use: [  
  -           'file-loader'  
  -         ]  
  -       },  
  -       {  
  -         test: /\.(woff|woff2|eot|ttf|otf)$/,  
  -         use: [  
  -           'file-loader'  
  -         ]  
  -       },  
  -       {  
  -         test: /\.(csv|tsv)$/,  
  -         use: [  
  -           'csv-loader'  
  -         ]  
  -       },  
  -       {  
  -         test: /\.xml$/,  
  -         use: [  
  -           'xml-loader'  
  -         ]  
  -       }  
  -     ]  
  -   }  
    };

#### **src/index.js**

- import _ from 'lodash';  
  - import './style.css';  
  - import Icon from './icon.png';  
  - import Data from './data.xml';  
  -  
    function component() {  
      var element = document.createElement('div');  
  -  
  -   // lodash，现在通过 script 标签导入  
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
  -   element.classList.add('hello');  
  -  
  -   // 将图像添加到我们已经存在的 div 中。  
  -   var myIcon = new Image();  
  -   myIcon.src = Icon;  
  -  
  -   element.appendChild(myIcon);  
  -  
  -   console.log(Data);  
    
      return element;  
    }  
    
    document.body.appendChild(component());

### 7.2 再调整一下目录

#### webpack-demo  
    |- package.json  
    |- webpack.config.js  
    |- /dist  
    |- /src  
      |- index.js  
  +   |- print.js  
    |- /node_modules

#### **src/print.js**

- export default function printMe() {  
    console.log('I get called from print.js!');  
  }

#### **src/index.js**

- import _ from 'lodash';  
  + import printMe from './print.js';  
    
    function component() {  
      var element = document.createElement('div');  
  +   var btn = document.createElement('button');  
    
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');  
    
  +   btn.innerHTML = '点击这里，然后查看 console！';  
  +   btn.onclick = printMe;  
  +  
  +   element.appendChild(btn);  
    
      return element;  
    }  
    
    document.body.appendChild(component());

#### 现在可以 nam run build 来先看一下结果

### 7.3 更新 dist/index.html 文件，来为 webpack 分离入口做好准备

#### **dist/index.html**

- <!doctype html>  
    <html>  
      <head>  
  -     <title>管理资源</title>  
  +     <title>管理输出</title>  
  +     <script src="./print.bundle.js"></script>  
      </head>  
      <body>  
  -     <script src="./bundle.js"></script>  
  +     <script src="./app.bundle.js"></script>  
      </body>  
    </html>

#### 调整配置

- 在 entry 添加 src/print.js 作为新的入口起点（print），然后修改 output，以便根据入口起点定义的名称，动态地产生 bundle 名称：

	- const path = require('path');  
	    
	    module.exports = {  
	  -   entry: './src/index.js',  
	  +   entry: {  
	  +     app: './src/index.js',  
	  +     print: './src/print.js'  
	  +   },  
	      output: {  
	  -     filename: 'bundle.js',  
	  +     filename: '[name].bundle.js',  
	        path: path.resolve(__dirname, 'dist')  
	      }  
	    };

#### 执行 npm run build

## 8. 设置 HtmlWebpackPlugin

### 接第七步, 如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的入口，会发生什么？会在构建时重新命名生成的 bundle，但是我们的 index.html 文件仍然引用旧的名称。让我们用 [HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin) 来解决这个问题。

### 8.1 先安装插件

#### npm install --save-dev html-webpack-plugin

### 8.2 **webpack.config.js**

#### const path = require('path');  
  + const HtmlWebpackPlugin = require('html-webpack-plugin');  
    
    module.exports = {  
      entry: {  
        app: './src/index.js',  
        print: './src/print.js'  
      },  
  +   plugins: [  
  +     new HtmlWebpackPlugin({  
  +       title: '管理输出'  
  +     })  
  +   ],  
      output: {  
        filename: '[name].bundle.js',  
        path: path.resolve(__dirname, 'dist')  
      }  
    };

### 构建之前，你应该了解，虽然在 dist/ 文件夹我们已经有了 index.html 这个文件，然而 HtmlWebpackPlugin 还是会默认生成它自己的 index.html 文件。也就是说，它会用新生成的 index.html 文件，替换我们的原有文件。  
    
  执行 npm run build

## 9. 清理 dist 文件夹

### 由于遗留了之前的指南和代码示例，我们的 /dist 文件夹显得相当杂乱。webpack 将生成文件并放置在 /dist 文件夹中，但是它不会追踪哪些文件是实际在项目中用到的。

### 通常比较推荐的做法是，在每次构建前清理 /dist 文件夹，这样只会生成用到的文件

### [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) 是一个流行的清理插件，安装和配置它。

#### npm install --save-dev clean-webpack-plugin

### **webpack.config.js**

#### const path = require('path');  
    const HtmlWebpackPlugin = require('html-webpack-plugin');  
    
  // 下面写法会报错  
  + const CleanWebpackPlugin = require('clean-webpack-plugin');  
  // 用下面这个写法  
  + const { CleanWebpackPlugin } = require("clean-webpack-plugin");  
    
    
    module.exports = {  
      entry: {  
        app: './src/index.js',  
        print: './src/print.js'  
      },  
      plugins: [  
  +     new CleanWebpackPlugin(),  
        new HtmlWebpackPlugin({  
          title: '管理输出'  
        })  
      ],  
      output: {  
        filename: '[name].bundle.js',  
        path: path.resolve(__dirname, 'dist')  
      }  
    };

### 执行 npm run build

