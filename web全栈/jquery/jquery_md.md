

# JQuery基础 
###### jquery第一节课讲义 今天给咱们来学习jquery， 
###### 之前已经给做过很多铺垫的jquery今天终于现身了， jquery是各位在今后工作中至关重要的一部分， 可以说各位在今后的工作中js部分绝大多数都是用jquery抒写的。 
###### 那么jquery为什么这么厉害呢？ 接下来就让我们揭开jquery的面纱， 在学习的过程中各位就知道jquery的强大。 
###### 那么今天学完这节课各位能掌握些什么呢？ jQuery环境的配置 $(document).ready与window.onload的区别 jQuery选择器 基本选择器、 层次选择器、 基本过滤选择器、 内容过滤选择器、 属性过滤选择器、 子元素过滤选择器、 表单属性选择器 jQuery的常见方法

                        
##### 接下来给大家介绍jquery为什么他应用如此广泛？ 它有哪些优势呢？ 
*	轻量级(相对市场上其他的插件他的大小是轻量级的， 这里的轻量级是相对的) 
*	强大的选择器(举例： 源生js需要for循环能获取到的class名它一个单词就搞定) 
*	出色的DOM操作(语法简单省时省力) 可靠的事件处理机制(由于语法简单只要规范书写很少发生事件冲突) 
*	完善的Ajax(jq里面自带封包好的ajax可以直接用) 
*	出色的浏览器兼容性(语法兼容市面流行的各大浏览器) 
*	链式操作方式(用起来很方便， 省力) 
*	丰富的插件支持(很多插件都可以在jq的基础上使用) 
*	完善的文档(完善的文档方便使用者查询文档， 更好的使用jq) 
*	开源(代码开源让程序员更好更快更省力的完成编程任务)


## 注意
*	1. 在jQuery库中， $ 就是jQuery的一个简写形式 例如： $(“#div”) == jQuery(“#div”) 
*	2. 当浏览器解析完document后， 执行ready小括号内的函数。
*		那么ready与onload的简单区别是什么呢？ 

		1. 执行时间 window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。 
			$(document).ready() 是DOM结构绘制完毕后就执行， 不必等到加载完毕。 
		2. 编写个数不同 window.onload不能同时编写多个， 如果有多个window.onload方法， 只会执行一个(document).ready() 可以同时编写多个， 并且都可以得到执行
		3. 简化写法 
			window.onload没有简化写法 
			$(document).ready(function() {}) 
			可以简写成 $(function() {}); 
			在今后的应用中都用$(function() {});
			


## 如何获取到最新的jquery呢？ 

*	进入jQuery官网， 下载最新jQuery库文件。 http: //jquery.com/
*	官网上有两个版本， 
*		1. xx版本是兼容ie678的， 
*		2. xx版本是不兼容ie678的版本
*	每个版本又有两个下载版本， 一个是压缩过的一个是未压缩的， 都可以使用。 
*	接下来在页面中引入jQuery 在head标签内引入jQuery， 格式如下：
*		 <script type = "text/javascript"src = “.. / script / jquery.js” > < /script>
*	在DOM元素被加载完成的情况下执行的代码在jq里面怎么写呢？ 

		$(document).ready(function() {			
			alert(“Hello World!”);
		});
		
## css对象模型

#### css修改
	
	$("#div1").css("background-color", "red");
	$("#div1").css({
	    "width": "200px",
	    "height": "200px",
	    "background-color": "red"
	});
	
#### 动画css

	$("#div1").animate({
	    "width": "200px",
	    "height": "200px"
	}, 2000);



# DOM 操作
## 创建节点
#### 创建文本节点 

*	运用传统的javascript方法， 创建一个文本节点：

		var textNode = document.createTextNode(‘My Demo’);
		
* jQuery中创建一个div节点：

	    $(‘ < div > < /div>’);
	    
#### 设置属性

* 运用传统的javascript方法， 设置 / 获取属性：

		// setAttribute(); //设置
        var a = document.createElement(“p”); 			a.setAttribute(“title”, ”my demo”); 
        // 不管以前有没有title属性， 以后的值是 my demo。 		// getAttribute(); //获取
        var a = document.getElementById(“CSSrain”);
		var b = a.getAttribute(“title”); 
		//获取的时候， 如果属性不存在， 则返回空，

* jQuery中设置 / 获取属性

		$(“#test1″).attr({“ class”: “test”, “title”: “TestDemo!” }); 
		$(“#test1″).attr(“class”);





#### 插入节点
* 运用传统的javascript方法， 插入一个节点
* 	如使用appendChild()）： 

		var container = document.createElement(“p”);
		document.body.appendChild(container); 		
		
* jQuery中插入节点： 

		$(‘body ').append(' < div > 在body的末尾加入一个新的div < /div>');
		
* append after appendTo insertAfter prepend before prependTo insertBefore

#### 添加兄弟标签
	
	$("ul").after("<div>我是div</div>");
	$("ul").before("<div>我是div</div>");
	$("ul").after("<div>我是div</div>");
	$("<div>我是div</div>").insertAfter("ul");
	$("<div>我是div</div>").insertBefore("ul");



#### 删除节点

* 运用传统的javascript方法， 删除一个节点：

		var b = document.getElementById(“test”);
		var c = b.parentNode; 
		c.removeChild(b); 
		
* jQuery中删除节点： 

		$(‘#test′).remove(); 
		
* remove empty


#### 替换节点

* 运用传统的javascript方法， 替换节点： 

		Element.repalceChild(newNode, oldNode); 		// oldNode必须是Element的一个子节点。 
		
* jQuery中替换节点： 

			$(“ < p > 替换 test1！ < /p>”).replaceAll(“#test1″);
			
#### 复制节点

* 运用传统的javascript方法， 复制一个节点：

		var mes = document.createTextNode("hello world");
		var container = document.createElement("p"); container.appendChild(mes);
		document.body.appendChild(container);
		var newpara = container.cloneNode(true);
		// true和false的区别
		document.body.appendChild(newpara);
		Element.repalceChild(newNode, oldNode);
		// oldNode必须是Element的一个子节点。


* jQuery中复制一个节点：

		var a = $('<p>hello world</p>'); 
		$('body').append(a);
		var clone_a = a.clone(); 
		$('body').append(clone_a);



#### 遍历节点

###### 获取子元素
		
		$("div").children("a").length
		
###### 获取兄弟标签
		
		$("a").siblings().length;
		$("a").siblings().eq(1).html()
		$("a").next().html();
		$("a").prev().html();
		
###### 获取匹配到的第一个
	
	$("li").first()
		
###### 获取父亲标签

		$("span").parent("div").length
		// .parent() 获得当前匹配元素集合中每个元素的父元素


###### find 方法

		$("div").find("a").css("color", "red")

                        
###### after 


	$("ul").after("<div>我是div</div>");
	$("ul").before("<div>我是div</div>");


###### children 

	$("div").children("a").length);



###### 遍历 each 

	$.each($("li"), function(index, val) {
		//alert(index);
		//val.html(index);
		$(val).html(index);
	});
	
###### size: 
* 输出被 jQuery 选择器匹配的元素的数量：

		$("li").size()
	
###### index 
* 函数用于获取当前jQuery对象中指定DOM元素的索引值。

		$("ul li").index(this)
		// obj.get(0) === obj[0]
		
		
###### is() 方法

	$(".xxx").is("li")


###### insertAfter 

	$("ul").after("<div>我是div</div>");
	// $("<div>我是div</div>").insertAfter("ul");
	$("<div>我是div</div>").insertBefore("ul");


                        
###### next 

	$("a").next().html());


###### 属性的设置 


	$("#div1").attr("index","2");
    $("#div1").attr("ind"));
    $("#div1").attr({
    	"index": "2",
    	"ind": "3"
    });
    // 也可以通过方法来修改某个属性
	$("img").attr("title", function() {
		return this.src;
	});
	// 删除属性
	// $("img").removeAttr("title");
    
    
###### 插到前边 

	$("ul").append("<li>2</li>");
	$("ul").prepend("<li>"+index+"</li>");
	$("<li>" + index + "</li>").prependTo("ul");


###### 获取高度 


	$("#div1").height()
	$("div").height(function (n,c){
		if (n==1){
			return c+100;
		}
	});
	//获取包含margin，padding,border，width的宽度 
	$("#div1").outerWidth(true)
	
	
	// 逐渐增加div的大小
	$("div").click(function() {
		$(this).css({
			width: function(index, value) {
				console.log(index);
				return parseFloat(value) * 1.3;
			},
			height: function(index, value) {
				return parseFloat(value) * 1.3;
			}
		});
	});
	
                       
                        
###### 删除标签 remove 

	$("p").remove();
	$("p").empty();


###### removeClass 

	$("div").removeClass('active');


###### 替换标签 replaceAll 

	$("<a href='###'>我是a</a>").replaceAll('p');
                        

###### siblings 

	$("a").siblings().eq(1).html()


###### 滚动属性 scroll

*	孩子宽度太宽, 超出去父视图部分了
*	父亲要说 overflow: scroll 

		$("#wrap").scrollLeft(200);
		// 获取偏移量
		$("#wrap").scrollLeft()
	

###### offset 偏移量 

	$("#child").offset().left
	$("#child").position().left
	
	
###### input 值

	$("input").val();
	$("input").val("dfsd");
	
####  属性操作

*	这节课中js写法由于讲过一带而过复习一下。 jq也是带着过一遍， 虽然多但是实际上今后工作用的并不多， 用的多的在jq2文件夹里面有相应的例子代码 
*	注： 在讲选择器的时候可以参考选择器全.html这个文件， 
*	点击不同的btn会让选中的标签显示不同颜色

###### 添加属性 

	$("div").addClass('active');
	$("div").removeClass('active');
	$("div").toggleClass('active');
	$("#div1").attr("index", "2");
	$("#div1").attr("ind")
	
	$("#div1").attr({
	    "index": "2",
	    "ind": "3"
	});
	
	
# jQuery 工具 tools

###### 数组和字典的遍历
        var arr = {
            name: "啊哈给你先",
            age: 13
        };
        $.each(arr, function(i, n) {
            console.log(i + "----" + n);
        });
        
        
###### 扩张某一个数组
        var a = {
            name: "zhangsan",
            age: 12,
            hobby: "nvren"
        };
        var b = {
            name: "lisi",
            number: 15
        };
        $.extend(a, b);
        console.log(a);
        
        
###### 合并两个数组
        var a = {
            name: "zhangsan",
            age: 12,
            hobby: "nvren"
        };
        var b = {
            name: "lisi",
            number: 15
        };
        var a = [5, 6, 2];
        var b = [3, 6, 7];
        $.merge(a, b);
        console.log(a);
        
###### 过滤函数
        var a = [5, 2, 9];
        var b = $.grep(a, function(i, n) {
            console.log(i + "----" + n);
            return i < 6;
        }, true);
        console.log(b);
        
        
###### 将一个数组中的元素映射到另一个数组中
        var a = [4, 8, 2];
        var b = $.map(a, function(n) {
            // 数组中的每个元素+4
            // return n + 4;

            // 数组中大于2的元素+1 ， 否则删除
            // return n > 2 ? n + 1 : null;

            // 对数组进行扩展
            return [n, n + 2];
        });
        console.log(b);
        
        
###### 查看数组上某个元素的位置
        var a = [4 , 8 , "zhangsan" , 'lisi'];
        var b = $.inArray("lisi" , a);
        console.log(b);
        
        
###### 元素集合---> 数组
        console.log($("li"));
        var a = $("li").toArray();
        console.log(a);
        
###### 对象 - > String
        var a = {
            name: "zhangsan",
            ag: 12
        };
        var b = $.param(a);
        console.log(b);
        
        var myObj = {
            a: {
                name: "zhangsan",
                age: 12
            },
            b: [1, 2, 3]
        };

        var encodeStr = $.param(myObj);
        console.log(encodeStr);
        var decodeStr = decodeURIComponent(encodeStr);
        console.log(decodeStr);

        var encodeStr = $.param(myObj, true);
        console.log(encodeStr);
        var decodeStr = decodeURIComponent(encodeStr);
        console.log(decodeStr);
        
        
###### 查看当前jQuery版本
        console.log($.fn.jquery);
	
	




# jQuery 事件
>
[事件参考手册](http://www.w3school.com.cn/jquery/jquery_ref_events.asp)


## trigger() 方法
### 触发 input 元素的 select 事件：
#### 案例:
	$("button").click(function() {
    	$("input").trigger("select");
	});
#### 语法
	$(selector).trigger(event, [param1, param2, ...])

|	参数		|	描述		|
| --------- | --------- |
|event|必需。 规定指定元素要触发的事件。可以使自定义事件（ 使用 bind() 函数来附加）， 或者任何标准事件。|
|[param1, param2, ...]|可选。 传递到事件处理程序的额外参数。额外的参数对自定义事件特别有用。|


### 触发不同的事件

	// 触发 on click 事件
    $(".abc").on("click", function(event, a) {
        console.log(a)
        console.log(a.name);
    }).trigger("click", {
        name: "李四"
    });


    // 触发 正常 click 事件
    $(".abc").click(function(event, a) {
        console.log(a.name);
    }).trigger("click", {
        name: "张三"
    });

    // 触发一个 自定义 事件
    $(".abc").bind("xxx", function(event, a, b) {
        console.log(a);
        console.log(b);
    }).trigger("xxx", ["zhangsan", "lixi"]);

    $(".abc").trigger("xxx", ["zhangsan", "lisi"]);



## bind() 方法
	$("button").bind({
    	click:function(){$("p").slideToggle();},
    	mouseover:function(){$("body").css("background-color","red");},  
    	mouseout:function(){$("body").css("background-color","#FFFFFF");}  
    });
## one() 方法
### 为被选元素附加一个或多个事件处理程序， 并规定当事件发生时运行的函数。
	$("p").one("click", function() {
        $(this).animate({ fontSize: "+=6px" });
    });

## change() 方法
### 注意： 当用于 select 元素时， change 事件会在选择某个选项时发生。 当用于 text field 或 text area 时， 该事件会在元素失去焦点时发生。
	$(".field").change(function() {
        $(this).css("background-color", "#FFFFCC");
    });
    $("button").click(function() {
        $("input").change();
    });
## keypress() 方法
	$("input").keypress(function() {
        $("span").text(i += 1);
    });
    $("button").click(function() {
        $("input").keypress();
    });
## select() 方法
	$("input").select(function() {
        $("input").after(" Text marked!");
    });
    
## toggleClass() 方法
	$("button").click(function() {
        $("p").toggleClass("main");
    });
## hide()
### 隐藏事件
	$("p").click(function() {
        $(this).hide();
    });
    // 也可以带动画延迟效果
    // $(this).hide("slow");
    // 也可以是时间 1000
    // 还可以带回调函数
    // hide(1000, callBack);

##  显示事件 show
###### 用法同hide同理
* 可以使用 toggle() 方法来切换 hide() 和 show() 方法



## 淡入淡出 fade
###### 用法同hide同理
* 淡入 fadeIn()
* 淡出 fadeOut()
* 淡入淡出 fadeToggle()

## 滑动 slide
###### 用法同hide同理
* 向下滑动 slideDown()
* 向上滑动 slideUp()
* 交换滑动 slideToggle()

## 动画 animate
$(selector).animate({ params }, speed, callback);

	$("button").click(function() {
    	$("div").animate({
	        left: '250px',
	        opacity: '0.5',
	        height: '150px',
	        width: '150px'
	    });
	});
	// 也可以这样写
	$("button").click(function() {
	    $("div").animate({
	        left: '250px',
	        height: '+=150px',
	        width: '+=150px'
	    });
	});
	// 您甚至可以把属性的动画值设置为 "show"、"hide"或 "toggle"：
	$("button").click(function() {
	    $("div").animate({
	        height: 'toggle'
	    });
	});
	
提示： 可以用 animate() 方法来操作所有 CSS 属性吗？

是的， 几乎可以！ 不过， 需要记住一件重要的事情： 当使用 animate() 时， 必须使用 Camel 标记法书写所有的属性名， 比如， 必须使用 paddingLeft 而不是 padding - left， 使用 marginRight 而不是 margin - right， 等等。

同时， 色彩动画并不包含在核心 jQuery 库中。

### jQuery animate() - 使用队列功能
默认地， jQuery 提供针对动画的队列功能。

* 这意味着如果您在彼此之后编写多个 animate() 调用， jQuery 会创建包含这些方法调用的“ 内部” 队列。 然后逐一运行这些 animate 调用。

**实例 1**

隐藏， 如果您希望在彼此之后执行不同的动画， 那么我们要利用队列功能：

    $("button").click(function() {
        var div = $("div");
        div.animate({ height: '300px', opacity: '0.4' }, "slow");
        div.animate({ width: '300px', opacity: '0.8' }, "slow");
        div.animate({ height: '100px', opacity: '0.4' }, "slow");
        div.animate({ width: '100px', opacity: '0.8' }, "slow");
    });

**实例 2**

下面的例子把 < div > 元素移动到右边， 然后增加文本的字号：

	$("button").click(function() {
	    var div = $("div");
	    div.animate({ left: '100px' }, "slow");
	    div.animate({ fontSize: '3em' }, "slow");
	});
	
### stop() 方法

$(selector).stop(stopAll, goToEnd);

* 可选的 stopAll 参数规定是否应该清除动画队列。 默认是 false， 即仅停止活动的动画， 允许任何排入队列的动画向后执行。

* 可选的 goToEnd 参数规定是否立即完成当前动画。 默认是 false。

* 因此， 默认地， stop() 会清除在被选元素上指定的当前动画。



		$(document).ready(function() {
	    	$("#start").click(function() {
	        	$("div").animate({ left: '100px' }, 5000);
	        	$("div").animate({ fontSize: '3em' }, 5000);
	    	});
	
	    	$("#stop").click(function() {
	        	$("div").stop();
	    	});
	
	    	$("#stop2").click(function() {
	        	$("div").stop(true);
	    	});
	
	    	$("#stop3").click(function() {
	        	$("div").stop(true, true);
	    	});
	
		});
		
		
### 链式写法 (方法链接)

下面的例子把 css(), slideUp(), and slideDown() 链接在一起。 "p1"

元素首先会变为红色， 然后向上滑动， 然后向下滑动：

	$("#p1").css("color", "red").slideUp(2000).slideDown(2000);
	
	
	
	
# jQuery cssHooks

	
	if (!$.cssHooks) {
        throw ("jQuery 1.4.3+ is needed for this plugin to work");
        return;
    }
    
    // 判断 某一个 样式属性 是否被支持
    function styleSupport(prop) {
        var vendorProp, supportedProp,
            capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            prefixes = ["Moz", "Webkit", "O", "ms"],
            div = document.createElement("div");
        if (prop in div.style) {
            supportedProp = prop;
        } else {
            for (var i = 0; i < prefixes.length; i++) {
                vendorProp = prefixes[i] + capProp;
                if (vendorProp in div.style) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }
        div = null;
        $.support[prop] = supportedProp
        return supportedProp;
    }
    
    // 测试 borderRadius 是否被支持
    var borderRadius = styleSupport("borderRadius");
    
    // Set cssHooks only for browsers that
    // support a vendor-prefixed border radius
    if (borderRadius && borderRadius !== "borderRadius") {
        $.cssHooks.borderRadius = {
            get: function(elem, computed, extra) {
                return $.css(elem, borderRadius);
            },
            set: function(elem, value) {
                elem.style[borderRadius] = value;
            }
        };
    }


    $("div").css("borderRadius", "20px");
    $("div").css("border-radius", "10px");



## 简单提问

* $(document).ready() 与onload的区别
* JQ与原生javascript相比， 有何优势
* 说出jQuery包含的选择器种类， 并举例
* 能够说出jq中对于dom节点有哪些操作方法
    (例： 插入： append(); 加class名: addClass(“”); 删除class名: removeClass(“”); 等)
* 能够将javascript和jq的命令相比较
* 能够熟练运用jq的语法
* jq对于dom节点有哪些操作方法呢？
* JQuery 的核心函数  jQuery() 接受一个字符串， 其中包含了用于匹配元素集合的 CSS 选择器。
* console.log(jQuery.support.boxModel); 是什么意思
* jQuery.noConflict(); 运行这个函数将变量 $ 的控制权让渡给第一个实现它的那个库。
* ** jQuery() 函数有三种语法：**
* 		语法 1: 接受一个字符串， 其中包含了用于匹配元素集合的 CSS 选择器：
* 			jQuery(selector, [context])
* 			默认情况下， 选择器从文档根部对 DOM 进行搜索。 不过， 可以为 $() 设置可选的 context 参数。
			举例: btn按钮里面的span标签
			
*		语法 2: 使用原始 HTML 的字符串来创建 DOM 元素：

			jQuery(html, [ownerDocument])
			直接写html元素
			还可以配置属性
			$("<input>", {
			    type: "text",
			    val: "Test",
			    focusin: function() {
			        $(this).addClass("active");
			    },
			    focusout: function() {
			        $(this).removeClass("active");
			    }
			}).appendTo("form");
			
*		语法 3: 绑定一个在 DOM 文档载入完成后执行的函数：

	
			jQuery(callback)
			
			
			onConflict 冲突事件
			var jq = $.noConflict();
			jq(document).ready(function() {
			    jq("button").click(function() {
			        jq("p").text("jQuery 仍在运行！");
			    });
			});



	





	