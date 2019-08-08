	
	

canvas 核心 API 讲解
建议大家看官方文档来系统的学习 canvas API，本文下面的例子只是对知识点的巩固。
MDN：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial

颜色、样式和阴影
fillStyle、strokeStyle

fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。

strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式。

// 用蓝色填充矩形

ctx.fillStyle="#0000ff";

ctx.fillRect(20,20,150,100);

// 渐变填充

varmy_gradient=ctx.createLinearGradient(0,0,0,170);

my_gradient.addColorStop(0,"black");

my_gradient.addColorStop(1,"white");

ctx.fillStyle=my_gradient;

ctx.fillRect(20,20,150,100);

// 图像填充

varimg=document.getElementById("lamp");

varpat=ctx.createPattern(img,"repeat");

ctx.rect(0,0,150,100);

ctx.fillStyle=pat;

ctx.fill();





shadowBlur、shadowColor

shadowBlur 设置或返回用于阴影的模糊级别

shadowColor 设置或返回用于阴影的颜色

注释：

请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。

请通过使用 shadowOffsetX 和 shadowOffsetY 属性来调节阴影效果。

ctx.shadowBlur=20;

ctx.shadowColor="black";

ctx.fillStyle="blue";

ctx.fillRect(20,20,100,80);



createLinearGradient()、createRadialGradient()

context.createLinearGradient(x0,y0,x1,y1)创建线性渐变

context.createRadialGradient(x0,y0,r0,x1,y1,r1)创建放射状/环形的渐变

注释：addColorStop(stop,color)方法与 createLinearGradient()或 createRadialGradient()一起使用。

varmy_gradient=ctx.createLinearGradient(0,0,0,170);

my_gradient.addColorStop(0,"black");

my_gradient.addColorStop(0.5,"red");

my_gradient.addColorStop(1,"white");

ctx.fillStyle=my_gradient;

ctx.fillRect(20,20,150,100);



vargrd=ctx.createRadialGradient(75,50,5,90,60,100);

grd.addColorStop(0,"red");

grd.addColorStop(1,"white");

ctx.fillStyle=grd;

ctx.fillRect(10,10,150,100);



context.createPattern()

context.createPattern(image,"repeat|repeat-x|repeat-y|no-repeat")重复绘制元素，元素可以是图片、视频，或者其他 <canvas>元素。

varimg=document.getElementById("lamp");

varpat=ctx.createPattern(img,"repeat");

ctx.rect(0,0,150,100);

ctx.fillStyle=pat;

ctx.fill();



线条样式

lineCap

context.lineCap="butt|round|square"

设置或返回线条的结束端点样式 （平直的边缘(默认)、圆形线帽、正方形线帽）

lineJoin

context.lineJoin="miter|bevel|round"

设置或返回两条线相交时，所创建的拐角类型 （尖角(默认)、斜角、圆角）

ctx.beginPath();

ctx.lineJoin="round";

ctx.moveTo(20,20);

ctx.lineTo(100,50);

ctx.lineTo(20,100);

ctx.stroke();



lineWidth

ctx.lineWidth =10

设置或返回当前的线条宽度，单位 px

矩形

rect()、fillRect()、strokeRect()

context.rect(x,y,width,height)创建矩形

context.fillRect(x,y,width,height)创建已填色的矩形，默认的填充颜色是黑色。

context.strokeRect(x,y,width,height)创建不填色的矩形，默认的笔触颜色是黑色。

// 红色矩形

ctx.beginPath();

ctx.lineWidth="6";

ctx.strokeStyle="red";

ctx.rect(5,5,290,140);

ctx.stroke();

clearRect()

clearRect() 在给定的矩形内清除指定的像素

// 在给定矩形内清空一个矩形

ctx.fillStyle="red";

ctx.fillRect(0,0,300,150);

ctx.clearRect(20,20,100,50);



路径

提示：请使用这些方法来创建路径：moveTo()、lineTo()、quadricCurveTo()、bezierCurveTo()、arcTo() 以及 arc()。

fill()

填充当前的图像（路径）。默认颜色是黑色。

提示：请使用 fillStyle属性来填充另一种颜色/渐变。

注释：如果路径未关闭，那么 fill() 方法会从路径结束点到开始点之间添加一条线，以关闭该路径，然后填充该路径。

// 绘制 150*100 像素的矩形，然后用绿色来给它填色：

ctx.rect(20,20,150,100);

ctx.fillStyle="green";

ctx.fill();



stroke()

stroke() 方法会绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。

提示：请使用 strokeStyle属性来绘制另一种颜色/渐变。

beginPath()

beginPath() 起始一条路径，或重置当前路径。

closePath()

closePath() 创建从当前点回到起始点的路径.

moveTo()、lineTo()

moveTo() 把路径移动到画布中的指定点，不创建线条。

lineTo() 添加一个新点，然后在画布中创建从该点到最后指定点的线条。

ctx.beginPath();

ctx.moveTo(0,0);

ctx.lineTo(300,150);

ctx.stroke();

quadraticCurveTo()、bezierCurveTo()

context.quadraticCurveTo(cpx,cpy,x,y);创建二次贝塞尔曲线

context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);创建三次方贝塞尔曲线

ctx.beginPath();

ctx.moveTo(20,20);

ctx.quadraticCurveTo(20,100,200,20);

ctx.stroke();



ctx.beginPath();

ctx.moveTo(20,20);

ctx.bezierCurveTo(20,100,200,100,200,20);

ctx.stroke();



arc()、arcTo()

context.arc(x,y,r,sAngle,eAngle[,counterclockwise]);创建弧/曲线（用于创建圆形或部分圆）

context.arcTo(x1,y1,x2,y2,r);创建两切线之间的弧/曲线

ctx.beginPath();

arc(100,75,50,0*Math.PI,1.5*Math.PI)

ctx.stroke();



ctx.beginPath();

ctx.moveTo(20,20);// 创建开始点

ctx.lineTo(100,20);// 创建水平线

ctx.arcTo(150,20,150,70,50);// 创建弧

ctx.lineTo(150,120);// 创建垂直线

ctx.stroke();// 进行绘制



clip()

clip() 从原始画布剪切任意形状和尺寸的区域。

// 剪切矩形区域

ctx.rect(50,20,200,120);

ctx.stroke();

ctx.clip();

// 在 clip() 之后绘制绿色矩形

ctx.fillStyle="green";

ctx.fillRect(0,0,150,100);



isPointInPath()

isPointInPath() 如果指定的点位于当前路径中，则返回 true，否则返回 false。

ctx.rect(20,20,150,100);

if(ctx.isPointInPath(20,50)){

ctx.stroke()

}

转换
scale()

scale() 缩放当前绘图至更大或更小。

// 绘制矩形，放大到 200%，然后再次绘制矩形：

ctx.strokeRect(5,5,25,15);

ctx.scale(2,2);

ctx.strokeRect(5,5,25,15);

rotate()

rotate() 旋转当前绘图。

// 将矩形旋转 20 度：

ctx.rotate(20*Math.PI /180);

ctx.fillRect(50,20,100,50);



translate()

translate() 重新定义画布上的 (0,0) 位置。

ctx.fillRect(10,10,100,50);

ctx.translate(70,70);

ctx.fillRect(10,10,100,50);



transform()、setTransform()

context.transform(a,b,c,d,e,f);替换绘图的当前转换矩阵。

context.setTransform(a,b,c,d,e,f);将当前转换重置为单位矩阵。然后运行 transform()。

文本

font、textAlign、textBaseline

font 设置或返回文本内容的当前字体属性。

textAlign 设置或返回文本内容的当前对齐方式。

textBaseline 设置或返回在绘制文本时使用的当前文本基线。

fillText()、strokeText()、measureText()

context.fillText(text,x,y,maxWidth);在画布上绘制被填充的文本。

context.strokeText(text,x,y,maxWidth);在画布上绘制文本（无填充）。

context.measureText(text).width;返回包含指定文本宽度的对象。

ctx.font="30px Arial";

ctx.fillText("Hello World",10,50);

ctx.font="40px Arial";

// 创建渐变

vargradient=ctx.createLinearGradient(0,0,myCanvas.width,0);

gradient.addColorStop("0","magenta");

gradient.addColorStop("0.5","blue");

gradient.addColorStop("1.0","red");

// 用渐变填色

ctx.strokeStyle=gradient;

ctx.strokeText("Hello World",10,90);

图像绘制
drawImage()

context.drawImage(img,x,y,width,height);向画布上绘制图像、画布或视频。

varimg=document.getElementById("tulip");

ctx.drawImage(img,10,10);

像素操作
width、height、data

width 返回 ImageData 对象的宽度。

height 返回 ImageData 对象的高度。

data 返回一个对象，其包含指定的 ImageData 对象的图像数据。

createImageData()、getImageData()、putImageData()

createImageData() 创建新的、空白的 ImageData 对象。

getImageData() 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。

putImageData() 把图像数据（从指定的 ImageData 对象）放回画布上。

合成

context.globalAlpha=number;设置或返回绘图的当前 alpha 或透明值。 context.globalCompositeOperation="source-in";设置或返回新图像如何绘制到已有的图像上。

其他

save()、restore()

save() 保存当前环境的状态。

restore() 返回之前保存过的路径状态和属性。

getContext

letcxt =Canvas.getContext('2d')

为不同的绘制类型 （2d、3d）提供不同的环境，当前唯一支持的是 2d环境。
	
	
	