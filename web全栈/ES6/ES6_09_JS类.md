# ES6_09_JS类


## 与大多数正规的面向对象编程语言不同, JS 从创建之初就不支持类,也没有把类继承作为定 义相似对象以及关联对象的主要方式,这让不少开发者感到困惑。而从 ES1 诞生之前直到 ES5 时期,很多库都创建了一些工具,让 JS 显得貌似能支持类。尽管一些 JS 开发者强烈认 为这门语言不需要类,但为处理类而创建的代码库如此之多,导致 ES6 最终引入了类。

## ES5 中的仿类结构

### JS 在 ES5 及更早版本中都不存在类。与类最接近的是:创建一个构造器,然后将方法指派到 该构造器的原型上。这种方式通常被称为创建一个自定义类型。例如:

### function PersonType(name) {  
      this.name = name;  
  }  
  PersonType.prototype.sayName = function() {  
      console.log(this.name);  
  };  
  let person = new PersonType("Nicholas");  
  person.sayName(); // 输出 "Nicholas"  
  console.log(person instanceof PersonType);  // true  
  console.log(person instanceof Object);      // true

## 类的声明

### 基本的类声明

#### class PersonClass {  
  // 等价于 PersonType 构造器  
      constructor(name) {  
          this.name = name;  
  }  
  // 等价于 PersonType.prototype.sayName  
      sayName() {  
          console.log(this.name);  
  } }  
  let person = new PersonClass("Nicholas"); person.sayName(); // 输出 "Nicholas"  
  console.log(person instanceof PersonClass);  
  console.log(person instanceof Object);  
  console.log(typeof PersonClass);  
  console.log(typeof PersonClass.prototype.sayName); // "function"

- 自有属性( Own properties ):该属性出现在实例上而不是原型上,只能在类的构造 器或方法内部进行创建。在本例中, name 就是一个自有属性。我建议应在构造器函数 内创建所有可能出现的自有属性,这样在类中声明变量就会被限制在单一位置(有助于 代码检查)。

#### 等价于下面的代码

#### // 直接等价于 PersonClass  
  let PersonType2 = (function() {  
      "use strict";  
      const PersonType2 = function(name) {  
  // 确认函数被调用时使用了 new  
          if (typeof new.target === "undefined") {  
              throw new Error("Constructor must be called with new.");  
  }  
          this.name = name;  
      }  
      Object.defineProperty(PersonType2.prototype, "sayName", {  
          value: function() {  
  // 确认函数被调用时没有使用 new  
              if (typeof new.target !== "undefined") {  
                  throw new Error("Method cannot be called with new.");  
  }  
              console.log(this.name);  
          },  
          enumerable: false,  
          writable: true,  
          configurable: true  
  });  
      return PersonType2;  
  }());

- 首先要注意这里有两个 PersonType2 声明:一个在外部作用域的 let 声明,一个在 IIFE 内 部的 const 声明。这就是为何类的方法不能对类名进行重写、而类外部的代码则被允许。构 造器函数检查了 new.target ,以保证被调用时使用了 new ,否则就抛出错误。接下来,  
  sayName() 方法被定义为不可枚举,并且此方法也检查了 new.target ,它则要保证在被调 用时没有使用 new 。最后一步是将构造器函数返回出去。  
   此例说明了尽管不使用新语法也能实现类的任何特性,但类语法显著简化了所有功能的代  
  码。

### 为何要使用类的语法

#### 尽管类与自定义类型之间有相似性,但仍然要记住一些重要的区别:

- 1. 类声明不会被提升,这与函数定义不同。类声明的行为与 let 相似,因此在程序的执行 到达声明处之前,类会存在于暂时性死区内。

- 2. 类声明中的所有代码会自动运行在严格模式下,并且也无法退出严格模式。

- 3. 类的所有方法都是不可枚举的,这是对于自定义类型的显著变化,后者必须用 Object.defineProperty() 才能将方法改变为不可枚举。

- 4. 类的所有方法内部都没有 [[Construct]] ,因此使用 new 来调用它们会抛出错误。

- 5. 调用类构造器时不使用 new ,会抛出错误。

- 6. 试图在类的方法内部重写类名,会抛出错误。

#### 不变的类名

- 只有在类的内部,类名才被视为是使用 const 声明的。这意味着你可以在外部重写类 名,但不能在类的方法内部这么做。例如:

- class Foo {  
    constructor() {  
  Foo = "bar";  
  // 但在类声明之后没问题  
  Foo = "baz";

	- 在此代码中,类构造器内部的 Foo 与在类外部的 Foo 是不同的绑定。内部的 Foo 就 像是用 const 定义的,不能被重写,当构造器尝试使用任何值重写 Foo 时,都会抛出 错误。但由于外部的 Foo 就像是用 let 声明的,你可以随时重写类名。

### 类表达式

#### 类与函数有相似之处,即它们都有两种形式:声明与表达式。函数声明与类声明都以适当的 关键词为起始(分别是 function 与 class ),随后是标识符(即函数名或类名)。函数具 有一种表达式形式,无须在 function 后面使用标识符;类似的,类也有不需要标识符的表 达式形式。类表达式被设计用于变量声明,或可作为参数传递给函数。

#### 基本的类表达式

- let PersonClass = class {  
  // 等价于 PersonType 构造器  
      constructor(name) {  
          this.name = name;  
  }  
  // 等价于 PersonType.prototype.sayName  
      sayName() {  
          console.log(this.name);  
  } };  
  let person = new PersonClass("Nicholas"); person.sayName(); // 输出 "Nicholas"  
  console.log(person instanceof PersonClass);  
  console.log(person instanceof Object);  
  console.log(typeof PersonClass);  
  console.log(typeof PersonClass.prototype.sayName); // "function"

- 除了语法差异,类表达式的 功能等价于类声明

- 使用类声明还是类表达式,主要是代码风格问题。相对于函数声明与函数表达式之间的  
   区别,类声明与类表达式都不会被提升,因此对代码运行时的行为影响甚微。

#### 具名类表达式

- 就像函数表达式那样,你也可以为类表达式 命名。为此需要在 class 关键字后添加标识符,就像这样:

- let PersonClass = class PersonClass2 {  
  // 等价于 PersonType 构造器  
      constructor(name) {  
          this.name = name;  
  }  
  // 等价于 PersonType.prototype.sayName  
      sayName() {  
          console.log(this.name);  
  } };  
  console.log(typeof PersonClass);  
  console.log(typeof PersonClass2);  
  // "function"  
  // "undefined"

- 此例中的类表达式被命名为 PersonClass2 。 PersonClass2 标识符只在类定义内部存在,因 此只能用在类方法内部(例如本例的 sayName() 内)。在类的外部, typeof PersonClass2 的结果为 "undefined" ,这是因为外部不存在 PersonClass2 绑定。

#### 作为一级公民的类

- 在编程中,能被当作值来使用的就称为一级公民( first-class citizen ),意味着它能作为参 数传给函数、能作为函数返回值、能用来给变量赋值。 JS的函数就是一级公民(它们有时又 被称为一级函数),此特性让 JS 独一无二。

- ES6 延续了传统,让类同样成为一级公民。这就使得类可以被多种方式所使用

- 作为参数传入函数

	- function createObject(classDef) {  
	      return new classDef();  
	  }  
	  let obj = createObject(class {  
	      sayHi() {  
	          console.log("Hi!");  
	  } });  
	  obj.sayHi();        // "Hi!"

- 类表达式的另一个有趣用途是立即调用类构造器,以创建单例( Singleton )

	- let person = new class {  
	      constructor(name) {  
	          this.name = name;  
	  }  
	      sayName() {  
	          console.log(this.name);  
	      }  
	  }("Nicholas");  
	  person.sayName();       // "Nicholas"

## 访问器属性

### class CustomHTMLElement {  
      constructor(element) {  
          this.element = element;  
  }  
      get html() {  
          return this.element.innerHTML;  
  }  
      set html(value) {  
          this.element.innerHTML = value;  
  } }  
  var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html"); console.log("get" in descriptor); // true  
  console.log("set" in descriptor); // true  
  console.log(descriptor.enumerable); // false

## 需计算的成员名

### let methodName = "sayName";  
  class PersonClass {  
      constructor(name) {  
          this.name = name;  
  }  
      [methodName]() {  
          console.log(this.name);  
  } }  
  let me = new PersonClass("Nicholas");  
  me.sayName();           // "Nicholas"

### 访问器属性能以相同方式使用需计算的名称

#### let propertyName = "html";  
  class CustomHTMLElement {  
      constructor(element) {  
          this.element = element;  
  }  
      get [propertyName]() {  
          return this.element.innerHTML;  
  }  
      set [propertyName](value) {  
          this.element.innerHTML = value;  
  } }

## 生成器方法

### 需要生成器的知识点

## 静态成员

### 直接在构造器上添加额外方法来模拟静态成员,这在 ES5 及更早版本中是另一个通用的模 式。例如:

### function PersonType(name) {  
      this.name = name;  
  }  
  // 静态方法  
  PersonType.create = function(name) {  
      return new PersonType(name);  
  };  
  // 实例方法  
  PersonType.prototype.sayName = function() {  
      console.log(this.name);  
  };  
  var person = PersonType.create("Nicholas");

### 在其他编程语言中,工厂方法 PersonType.create() 会被认定为一个静态方法,它的数据不 依赖 PersonType 的任何实例。 ES6 的类简化了静态成员的创建,只要在方法与访问器属性 的名称前添加正式的 static 标注。作为一个例子,此处有个与上例等价的类:

#### class PersonClass {  
  // 等价于 PersonType 构造器  
      constructor(name) {  
          this.name = name;  
  }  
  // 等价于 PersonType.prototype.sayName  
      sayName() {  
          console.log(this.name);  
  }  
  // 等价于 PersonType.create  
      static create(name) {  
          return new PersonClass(name);  
  } }  
  let person = PersonClass.create("Nicholas");

### 你能在类中的任何方法与访问器属性上使用 static 关键字, 唯一限制是不能将它用于 constructor 方法的定义。

### 静态成员不能用实例来访问,你始终需要直接用类自身来访问它们。

## 使用派生类进行继承

### class Rectangle {  
      constructor(length, width) {  
          this.length = length;  
          this.width = width;  
      }  
      getArea() {  
          return this.length * this.width;  
  } }  
  class Square extends Rectangle {  
      constructor(length) {  
  // 与 Rectangle.call(this, length, length) 相同  
           super(length, length);  
      }  
  }  
  var square = new Square(3);  
  console.log(square.getArea());  
  console.log(square instanceof Square);  
  console.log(square instanceof Rectangle);  
  // 9  
  // true  
  // true

### 如果派生类指定了构造器,就需要 使用 super() ,否则会造成错误。若你选择不使用构造器, super() 方法会被自动调用, 并会使用创建新实例时提供的所有参数。例如,下列两个类是完全相同的:

#### class Square extends Rectangle { // 没有构造器  
  }  
  // 等价于:  
  class Square extends Rectangle {  
      constructor(...args) {  
          super(...args);  
      }  
  }  
    

#### 使用 super() 时需牢记以下几点:  
  1. 你只能在派生类中使用 super() 。若尝试在非派生的类(即:没有使用 extends 关键字的类)或函数中使用它,就会抛出错误。  
  2. 在构造器中,你必须在访问 this 之前调用 super() 。由于 super() 负责初始化 this ,因此试图先访问 this 自然就会造成错误。  
  3. 唯一能避免调用 super() 的办法,是从类构造器中返回一个对象。

### 屏蔽类方法

#### 派生类中的方法总是会屏蔽基类的同名方法。例如,你可以将 getArea() 方法添加到 Square 类,以便重定义它的功能:

#### class Square extends Rectangle {  
      constructor(length) {  
          super(length, length);  
      }  
  // 重写并屏蔽 Rectangle.prototype.getArea()  
      getArea() {  
          return this.length * this.length;  
  } }

#### 当然,你总是可以使用 super.getArea() 方法来调用 基类中的同名方法,就像这样:

#### class Square extends Rectangle {  
      constructor(length) {  
          super(length, length);  
      }  
  // 重写、屏蔽并调用了 Rectangle.prototype.getArea()  
      getArea() {  
          return super.getArea();  
  } }

### 继承静态成员

#### 如果基类包含静态成员,那么这些静态成员在派生类中也是可用的。继承的工作方式类似于 其他语言,但对于 JS 而言则是新概念。

#### class Rectangle {  
      constructor(length, width) {  
          this.length = length;  
          this.width = width;  
      }  
      getArea() {  
          return this.length * this.width;  
  }  
      static create(length, width) {  
          return new Rectangle(length, width);  
  } }  
  class Square extends Rectangle {  
      constructor(length) {  
  // 与 Rectangle.call(this, length, length) 相同  
           super(length, length);  
      }  
  }  
  var rect = Square.create(3, 4);  
  console.log(rect instanceof Rectangle);  
  console.log(rect.getArea());  
  console.log(rect instanceof Square);  
  // true  
  // 12  
  // false

#### 在此代码中,一个新的静态方法 create() 被添加到 Rectangle 类中。通过继承,该方法会 以 Square.create() 的形式存在,并且其行为方式与 Rectangle.create() 一样。

### 从表达式中派生类

#### 在 ES6 中派生类的最强大能力,或许就是能够从表达式中派生类。只要一个表达式能够返回  
  一个具有 [[Construct]] 属性以及原型的函数,你就可以对其使用 extends 。

#### function Rectangle(length, width) {  
      this.length = length;  
      this.width = width;  
  }  
  Rectangle.prototype.getArea = function() {  
      return this.length * this.width;  
   };  
  class Square extends Rectangle {  
      constructor(length) {  
          super(length, length);  
      }  
  }  
  var x = new Square(3);  
  console.log(x.getArea());  
  console.log(x instanceof Rectangle);  
  // 9 // true

#### extends 后面能接受任意类型的表达式,这带来了巨大可能性,例如动态地决定所要继承的 类:

- function Rectangle(length, width) {  
      this.length = length;  
      this.width = width;  
  }  
  Rectangle.prototype.getArea = function() {  
      return this.length * this.width;  
   };  
  function getBase() {  
      return Rectangle;  
  }  
  class Square extends getBase() {  
      constructor(length) {  
          super(length, length);  
      }  
  }  
  var x = new Square(3);  
  console.log(x.getArea());  
  console.log(x instanceof Rectangle);  
  // 9 // true

#### 由于可以动态地决定基类,那也就能创建不同的继承方式。例如,你 可以有效地创建混入:

- let SerializableMixin = {  
      serialize() {  
          return JSON.stringify(this);  
      }  
  };  
  let AreaMixin = {  
      getArea() {  
          return this.length * this.width;  
      }  
  };  
  function mixin(...mixins) {  
      var base = function() {};  
      Object.assign(base.prototype, ...mixins);  
      return base;  
  }  
  class Square extends mixin(AreaMixin, SerializableMixin) {  
      constructor(length) {  
           super();  
          this.length = length;  
          this.width = length;  
  } }  
  var x = new Square(3);  
  console.log(x.getArea());  
  console.log(x.serialize());  
  // 9  
  // "{"length":3,"width":3}"

	- 此例使用了混入( mixin )而不是传统继承。 mixin() 函数接受代表混入对象的任意数量的 参数,它创建了一个名为 base 的函数,并将每个混入对象的属性都赋值到新函数的原型 上。此函数随后被返回,于是 Square 就能够对其使用 extends 关键字了。注意由于仍然使 用了 extends ,你就必须在构造器内调用 super() 。  
	  Square 的实例既有来自 AreaMixin 的 getArea() 方法,又有来自 SerializableMixin 的  
	  serialize() 方法,这是通过原型继承实现的。 mixin() 函数使用了混入对象的所有自有属 性,动态地填充了新函数的原型(记住:若多个混入对象拥有相同的属性,则只有最后添加 的属性会被保留)。

#### 任意表达式都能在 extends 关键字后使用,但并非所有表达式的结果都是一个有效的 类。特别的,下列表达式类型会导致错误:  
  null ; 生成器函数(详见第八章)。  
  试图使用结果为上述值的表达式来创建一个新的类实例,都会抛出错误,因为不存在 [[Construct]] 可供调用。

### 继承内置对象

#### 几乎从 JS 数组出现那天开始,开发者就想通过继承机制来创建他们自己的特殊数组类型。在 ES5 及早期版本中,这是不可能做到的

#### class MyArray extends Array { // 空代码块  
  }  
  let items = new MyArray(1, 2, 3, 4),  
      subitems = items.slice(1, 3);  
  console.log(items instanceof MyArray);  
  console.log(subitems instanceof MyArray);  
  // true  
  // true

#### 在此代码中, slice() 方法返回了 MyArray 的一个实例。 slice() 方法是从 Array 上继 承的,原本应当返回 Array 的一个实例。而 Symbol.species 属性在后台造成了这种变化。

### 在类构造器中使用 new.target

#### class Rectangle {  
      constructor(length, width) {  
          console.log(new.target === Rectangle);  
          this.length = length;  
          this.width = width;  
  } }  
  // new.target 就是 Rectangle  
  var obj = new Rectangle(3, 4);  
  // 输出 true

#### 此代码说明在 new Rectangle(3, 4) 被调用时, new.target 就等于 Rectangle 。类构造器 被调用时不能缺少 new ,因此 new.target 属性就始终会在类构造器内被定义。不过这个值 并不总是相同的。研究以下代码:

- class Rectangle {  
      constructor(length, width) {  
          console.log(new.target === Rectangle);  
          this.length = length;  
          this.width = width;  
  } }  
  class Square extends Rectangle {  
      constructor(length) {  
           super(length, length)  
      }  
  }  
  // new.target 就是 Square  
  var obj = new Square(3);  
  // 输出 false

#### Square 调用了 Rectangle 构造器,因此当 Rectangle 构造器被调用时, new.target 等于  
  Square 。这很重要,因为构造器能根据如何被调用而有不同行为,并且这给了更改这种行为 的能力。例如,你可以使用 new.target 来创建一个抽象基类(一种不能被实例化的类), 如下:

- // 静态的基类 class Shape {  
      constructor() {  
          if (new.target === Shape) {  
              throw new Error("This class cannot be instantiated directly.")  
          }  
  } }  
  class Rectangle extends Shape {  
      constructor(length, width) {  
          super();  
          this.length = length;  
          this.width = width;  
  } }  
  var x = var y =  
  // 抛出错误  
  // 没有错误 // true

	- 此例中的 Shape 类构造器会在 new.target 为 Shape 的时候抛出错误,意味着 new Shape() 永远都会抛出错误。然而,你依然可以将 Shape 用作一个基类,正如 Rectangle 所做的那样。 super() 的调用执行了 Shape 构造器,而且 new.target 的值等于  
	  Rectangle ,因此该构造器能够无错误地继续执行。

	- 由于调用类时不能缺少 new ,于是 new.target 属性在类构造器内部就绝不会是 undefined 。

