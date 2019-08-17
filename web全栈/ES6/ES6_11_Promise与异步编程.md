# ES6_11_Promise与异步编程


## 回调模式

### 当 Node.js 被创建时,它通过普及回调函数编程模式提升了异步编程模型。回调函数模式类 似于事件模型,因为异步代码也会在后面的一个时间点才执行。不同之处在于需要调用的函 数(即回调函数)是作为参数传入的,如下所示:

### readFile("example.txt", function(err, contents) {  
      if (err) {  
  throw err; }  
      console.log(contents);  
  });  
  console.log("Hi!");

### 回调函数模式要比事件模型灵活得多,因为使用回调函数串联多个调用会相对容易。例如:

### readFile("example.txt", function(err, contents) {  
      if (err) {  
  throw err; }  
      writeFile("example.txt", function(err) {  
          if (err) {  
  throw err; }  
          console.log("File was written!");  
      });  
  });

### 这种模式运作得相当好,但你可能会迅速察觉陷入了回调地狱( callback hell ),这会在嵌 套过多回调函数时发生,就像这样:

### method1(function(err, result) {  
      if (err) {  
          throw err;  
      }  
      method2(function(err, result) {  
          if (err) {  
              throw err;  
          }  
          method3(function(err, result) {  
              if (err) {  
                  throw err;  
              }  
              method4(function(err, result) {  
                  if (err) {  
                      throw err;  
  }  
                  method5(result);  
              });  
  }); });  
  });

### 像本例一样嵌套多个方法调用会创建错综复杂的代码,会难以理解与调试。当想要实现更复  
  杂的功能时,回调函数也会存在问题。要是你想让两个异步操作并行运行,并且在它们都结  
  束后提醒你,那该怎么做?要是你想同时启动两个异步操作,但只采用首个结束的结果,那  
  又该怎么做?  
  在这些情况下,你需要追踪多个回调函数并做清理操作, Promise 能大幅度改善这种情况。

## Promise 基础

### Promise 是为异步操作的结果所准备的占位符。函数可以返回一个 Promise,而不必订阅一个 事件或向函数传递一个回调参数,就像这样:

### // readFile 承诺会在将来某个时间点完成  
  let promise = readFile("example.txt");

### 在此代码中, readFile() 实际上并未立即开始读取文件,这将会在稍后发生。此函数反而 会返回一个 Promise 对象以表示异步读取操作,因此你可以在将来再操作它。你能对结果进 行操作的确切时刻,完全取决于 Promise 的生命周期是如何进行的。

## Promise 的生命周期

### 每个 Promise 都会经历一个短暂的生命周期,初始为挂起态( pending state),这表示异步 操作尚未结束。一个挂起的 Promise 也被认为是未决的( unsettled )。上个例子中的 Promise 在 readFile() 函数返回它的时候就是处在挂起态。一旦异步操作结束, Promise 就会被认为是已决的( settled ),并进入两种可能状态之一:  
  1. 已完成(fulfilled):Promise的异步操作已成功结束;  
  2. 已拒绝(rejected):Promise的异步操作未成功结束,可能是一个错误,或由其他原  
  因导致。  
  内部的 [[PromiseState]] 属性会被设置为 "pending" 、 "fulfilled" 或 "rejected" ,以 反映 Promise 的状态。该属性并未在 Promise 对象上被暴露出来,因此你无法以编程方式判 断 Promise 到底处于哪种状态。不过你可以使用 then() 方法在 Promise 的状态改变时执行 一些特定操作。

### then() 方法在所有的 Promise 上都存在,并且接受两个参数。第一个参数是 Promise 被完 成时要调用的函数,与异步操作关联的任何附加数据都会被传入这个完成函数。第二个参数 则是 Promise 被拒绝时要调用的函数,与完成函数相似,拒绝函数会被传入与拒绝相关联的 任何附加数据。

### 传递给 then() 的两个参数都是可选的,因此你可以监听完成与拒绝的任意组合形式。例 如,研究这组 then() 调用:

#### let promise = readFile("example.txt");  
  promise.then(function(contents) { // 完成  
      console.log(contents);  
  }, function(err) {  
  // 拒绝  
      console.error(err.message);  
  });  
  promise.then(function(contents) { // 完成  
      console.log(contents);  
  });  
  promise.then(null, function(err) { // 拒绝  
      console.error(err.message);  
  });

### Promis 也具有一个 catch() 方法,其行为等同于只传递拒绝处理函数给 then() 。例如, 以下的 catch() 与 then() 调用是功能等效的。

#### promise.catch(function(err) { // 拒绝  
      console.error(err.message);  
  });  
  // 等同于:  
  promise.then(null, function(err) { // 拒绝  
      console.error(err.message);  
  });

### 创建未决的 Promise

#### 新的 Promise 使用 Promise 构造器来创建。此构造器接受单个参数:一个被称为执行器( executor )的函数,包含初始化 Promise 的代码。该执行器会被传递两个名为 resolve() 与 reject() 的函数作为参数。 resolve() 函数在执行器成功结束时被调用,用于示意该 Promise 已经准备好被决议( resolved ),而 reject() 函数则表明执行器的操作已失败。

- // Node.js 范例  
  let fs = require("fs");  
  function readFile(filename) {  
  return new Promise(function(resolve, reject) { // 触发异步操作  
          fs.readFile(filename, { encoding: "utf8" }, function(err, contents) {  
  // 检查错误  
              if (err) {  
                  reject(err);  
  return; }  
  // 读取成功  
              resolve(contents);  
  }); });  
  }  
  let promise = readFile("example.txt");  
  // 同时监听完成与拒绝  
  promise.then(function(contents) { // 完成  
      console.log(contents);  
  }, function(err) {  
  // 拒绝  
      console.error(err.message);  
  });

- 要记住执行器会在 readFile() 被调用时立即运行。当 resolve() 或 reject() 在执行器内 部被调用时,一个作业被添加到作业队列中,以便决议( resolve )这个 Promise 。这被称 为作业调度( job scheduling ),若你曾用过 setTimeout() 或 setInterval() 函数,那么 应该已经熟悉这种方式。在作业调度中,你添加新作业到队列中是表示:“不要立刻执行这个 作业,但要在稍后执行它”。例如, setTimeout() 函数能让你指定一个延迟时间,延迟之后 作业才会被添加到队列

####  Promise 的执行器会立即执行,早于源代码中在其之后的任何 代码

- let promise = new Promise(function(resolve, reject) {  
      console.log("Promise");  
      resolve();  
  });  
  console.log("Hi!");

- 此代码的输出结果为:  
  Promise   
  Hi!

#### 调用 resolve() 触发了一个异步操作。传递给 then() 与 catch() 的函数会异步地被执 行,并且它们也被添加到了作业队列(先进队列再执行)。此处有个例子:

- let promise = new Promise(function(resolve, reject) {  
      console.log("Promise");  
      resolve();  
  });  
  promise.then(function() {  
      console.log("Resolved.");  
  });  
  console.log("Hi!");

- 此例的输出结果为:  
  Promise  
  Hi!  
  Resolved

### 创建已决的 Promise

#### 基于 Promise 执行器行为的动态本质, Promise 构造器就是创建未决的 Promise 的最好方 式。但若你想让一个 Promise 代表一个已知的值,那么安排一个单纯传值给 resolve() 函数 的作业并没有意义。相反,有两种方法可使用指定值来创建已决的 Promise 。

- 使用 Promise.resolve()

	- Promise.resolve() 方法接受单个参数并会返回一个处于完成态的 Promise 。

	- let promise = Promise.resolve(42);  
	  promise.then(function(value) {  
	      console.log(value);         // 42  
	  });

- 使用 Promise.reject()

	- 也可以使用 Promise.reject() 方法来创建一个已拒绝的 Promise 。

	- let promise = Promise.reject(42);  
	  promise.catch(function(value) {  
	      console.log(value);         // 42  
	  });

- 注意: 经过测试,在几大浏览器中都存在与上一句话不符的情况。  
  1. 若传入的 Promise 为挂起态,则 Promise.resolve() 调用会将该 Promise 原样返 回。此后,若决议原 Promise ,在 then() 中可以接收到原例中的参数 42 ;而若 拒绝原 Promise ,则在 catch() 中可以接收到参数 42 。 但 Promise.reject() 调用则会对原先的 Promise 重新进行包装,对其使用 catch() 可以捕捉到错误, 处理函数中的 value 参数不会是数值 42 ,而是原先处于挂起态的 Promise 。  
  2. 若传入的 Promise 为完成态,则 Promise.resolve() 调用会将该 Promise 原样返 回,在 then() 中可以接收到原例中的参数 42 。 但 Promise.reject() 调用则会 对原先的 Promise 重新进行包装,对其使用 catch() 可以捕捉到错误,处理函数 中的 value 参数不会是数值 42 ,而是原先处于完成态的 Promise 。  
  3. 若传入的 Promise 为拒绝态,则 Promise.reject() 调用会将该 Promise 原样返 回,在 catch() 中可以接收到参数 42 。 但 Promise.resolve() 调用则会对原先 的 Promise 重新进行包装,对其使用 then() 可以进行完成处理,处理函数中的  
  value 参数不是 42 ,而是原先处于拒绝态的 Promise 。也就是说此时的情况与 上一种情况相反。  
  总结:对挂起态或完成态的 Promise 使用 Promise.resolve() 没问题,会返回原 Promise ;对拒绝态的 Promise 使用 Promise.reject() 也没问题。而除此之外的情况全 都会在原 Promise 上包装出一个新的 Promise 。

### 非 Promise 的 Thenable

#### Promise.resolve() 与 Promise.reject() 都能接受非 Promise 的 thenable 作为参数。当传 入了非 Promise 的 thenable 时,这些方法会创建一个新的 Promise ,此 Promise 会在  
  then() 函数之后被调用。

#### 当一个对象拥有一个能接受 resolve 与 reject 参数的 then() 方法,该对象就会被认为是  
  一个非 Promise 的 thenable ,就像这样:

- let thenable = {  
      then: function(resolve, reject) {  
          resolve(42);  
      }  
  };

- 此例中的 thenable 对象,除了 then() 方法之外没有任何与 Promise 相关的特征。你可以 调用 Promise.resolve() 来将 thenable 转换为一个已完成的 Promise :

- let thenable = {  
      then: function(resolve, reject) {  
          resolve(42);  
      }  
  };  
  let p1 = Promise.resolve(thenable);  
  p1.then(function(value) {  
      console.log(value);     // 42  
  });

- 在此例中, Promise.resolve() 调用了 thenable.then() ,确定了这个 thenable 的 Promise 状态:由于 resolve(42) 在 thenable.then() 方法内部被调用,这个 thenable 的 Promise 状态也就被设为已完成。一个名为 p1 的新 Promise 被创建为完成态,并从  
  thenable 中接收到了值(此处为 42 ),于是 p1 的完成处理函数就接收到一个值为 42 的 参数。

- 使用 Promise.resolve() ,同样还能从一个 thenable 创建一个已拒绝的 Promise :

- let thenable = {  
      then: function(resolve, reject) {  
          reject(42);  
      }  
  };  
  let p1 = Promise.resolve(thenable);  
  p1.catch(function(value) {  
      console.log(value);     // 42  
  });

### 执行器错误

#### 如果在执行器内部抛出了错误,那么 Promise 的拒绝处理函数就会被调用。例如:

- let promise = new Promise(function(resolve, reject) {  
      throw new Error("Explosion!");  
  });  
  promise.catch(function(error) {  
      console.log(error.message);     // "Explosion!"  
  });

- 在此代码中,执行器故意抛出了一个错误。此处在每个执行器之内并没有显式的 try-catch ,因此错误就被捕捉并传递给了拒绝处理函数。这个例子等价于:

- let promise = new Promise(function(resolve, reject) {  
      try {  
          throw new Error("Explosion!");  
      } catch (ex) {  
          reject(ex);  
      }  
  });  
  promise.catch(function(error) {  
      console.log(error.message);  
  });

- 执行器处理程序捕捉了抛出的任何错误,以简化这种常见处理。但在执行器内抛出的错误仅 当存在拒绝处理函数时才会被报告,否则这个错误就会被隐瞒。这在开发者早期使用 Promise 的时候是一个问题,但 JS 环境通过提供钩子( hook )来捕捉被拒绝的 Promise , 从而解决了此问题。

### 全局的 Promise 拒绝处理

#### Promise 最有 议的方面之一就是:当一个 Promise 被拒绝时若缺少拒绝处理函数,就会静 默失败。有人认为这是规范中最大的缺陷,因为这是 JS 语言所有组成部分中唯一不让错误清 晰可见的。  
  由于 Promise 的本质,判断一个 Promise 的拒绝是否已被处理并不直观。例如,研究以下示 例:

- let rejected = Promise.reject(42);  
  // 在此刻 rejected 不会被处理  
  // 一段时间后......  
  rejected.catch(function(value) { // 现在 rejected 已经被处理了 console.log(value);  
  });

- 无论 Promise 是否已被解决,你都可以在任何时候调用 then() 或 catch() 并使它们正确 工作,这导致很难准确知道一个 Promise 何时会被处理。此例中的 Promise 被立刻拒绝,但 它后来才被处理。  
  虽然下个版本的 ES 可能会处理此问题,不过浏览器与 Node.js 已经实施了变更来解决开发者 的这个痛点。这些变更不是 ES6 规范的一部分,但却是使用 Promise 时的宝贵工具。

#### Node.js 的拒绝处理

- 在 Node.js 中, process 对象上存在两个关联到 Promise 的拒绝处理的事件:

	- unhandledRejection :当一个 Promise 被拒绝、而在事件循环的一个轮次中没有任何拒 绝处理函数被调用,该事件就会被触发;

		- unhandledRejection 事件处理函数接受的参数是拒绝原因(常常是一个错误对象)以及已被 拒绝的 Promise 。以下代码展示了 unhandledRejection 的应用:

			- let rejected;  
			  process.on("unhandledRejection", function(reason, promise) {  
			      console.log(reason.message);            // "Explosion!"  
			      console.log(rejected === promise);      // true  
			  });  
			  rejected = Promise.reject(new Error("Explosion!"));

	- rejectionHandled :若一个 Promise 被拒绝、并在事件循环的一个轮次之后再有拒绝处 理函数被调用,该事件就会被触发。

		- rejectionHandled 事件处理函数则只有一个参数,即已被拒绝的 Promise 。例如:

			- let rejected;  
			  process.on("rejectionHandled", function(promise) {  
			      console.log(rejected === promise); // true  
			  });  
			  rejected = Promise.reject(new Error("Explosion!"));  
			    
			  // 延迟添加拒绝处理函数  
			  setTimeout(function() {  
			      rejected.catch(function(value) {  
			          console.log(value.message); // "Explosion!"  
			  }, 1000);

	- 这两个事件旨在共同帮助识别已被拒绝但未曾被处理 promise。

		- 为了正确追踪潜在的未被处理的拒绝,使用 rejectionHandled 与 unhandledRejection 事件 就能保持包含这些 Promise 的一个列表,之后等待一段时间再检查此列表。例如:

			- let possiblyUnhandledRejections = new Map();  
			  // 当一个拒绝未被处理,将其添加到 map  
			  process.on("unhandledRejection", function(reason, promise) {  
			      possiblyUnhandledRejections.set(promise, reason);  
			  });  
			  process.on("rejectionHandled", function(promise) {  
			      possiblyUnhandledRejections.delete(promise);  
			  });  
			  setInterval(function() {  
			  possiblyUnhandledRejections.forEach(function(reason, promise) { console.log(reason.message ? reason.message : reason);  
			  // 做点事来处理这些拒绝  
			          handleRejection(promise, reason);  
			      });  
			      possiblyUnhandledRejections.clear();  
			  }, 60000);

#### 浏览器的拒绝处理

- 浏览器同样能触发两个事件,来帮助识别未处理的拒绝。这两个事件会被 window 对象触 发,并完全等效于 Node.js 的相关事件:

	- unhandledrejection :当一个 Promise 被拒绝、而在事件循环的一个轮次中没有任何拒 绝处理函数被调用,该事件就会被触发;

	- rejectionHandled :若一个 Promise 被拒绝、并在事件循环的一个轮次之后再有拒绝处 理函数被调用,该事件就会被触发。

- Node.js拒绝处理与浏览器的拒绝处理的差异

	- Node.js 的实现会传递分离的参数给事件处理函数,而浏览器事件的处理函数则只会接收到包 含下列属性的一个对象:

		- type : 事件的名称( "unhandledrejection" 或 "rejectionhandled" ); 

		- promise :被拒绝的 Promise 对象;

		- reason : Promise 中的拒绝值(拒绝原因)。

	- 浏览器的实现中存在的另一个差异就是:拒绝值( reason )在两种事件中都可用

- let rejected;  
  window.onunhandledrejection = function(event) {  
      console.log(event.type);  
      console.log(event.reason.message);  
      console.log(rejected === event.promise);  
  };  
  window.onrejectionhandled = function(event) {  
      console.log(event.type);  
      console.log(event.reason.message);  
      console.log(rejected === event.promise);  
  // "unhandledrejection"  
  // "Explosion!"  
  // true  
  // "rejectionhandled"  
  // "Explosion!"  
  // true  
  };  
  rejected = Promise.reject(new Error("Explosion!"));

- 以下代码在浏览器中追踪未被处理的拒绝,与 Node.js 的代码非常相似:

	- let possiblyUnhandledRejections = new Map();  
	  // 当一个拒绝未被处理,将其添加到 map  
	  window.onunhandledrejection = function(event) { possiblyUnhandledRejections.set(event.promise, event.reason);  
	  };  
	  window.onrejectionhandled = function(event) {  
	      possiblyUnhandledRejections.delete(event.promise);  
	  };  
	  setInterval(function() {  
	  possiblyUnhandledRejections.forEach(function(reason, promise) { console.log(reason.message ? reason.message : reason);  
	  // 做点事来处理这些拒绝  
	          handleRejection(promise, reason);  
	      });  
	      possiblyUnhandledRejections.clear();  
	  }, 60000);

#### 处理 Promise 的拒绝可能很麻烦,但你才刚开始见识 Promise 实际上到底有多强大。现在是 时候更进一步了——把几个 promises 串联在一起使用。

## 串联 Promise

### 到此为止, Promise 貌似不过是个对组合使用回调函数与 setTimeout() 函数的增量改进, 然而 Promise 的内容远比表面上所看到的更多。更确切地说,存在多种方式来将 Promise 串 联在一起,以完成更复杂的异步行为。  
  每次对 then() 或 catch() 的调用实际上创建并返回了另一个 Promise ,仅当前一个 Promise 被完成或拒绝时,后一个 Promise 才会被决议。研究以下例子:

#### let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  p1.then(function(value) {  
      console.log(value);  
  }).then(function() {  
      console.log("Finished");  
  });

#### 代码输出:  
  42  
  Finished

### 对 p1.then() 的调用返回了第二个 Promise ,又在这之上调用了 then() 。仅当第一个 Promise 已被决议后,第二个 then() 的完成处理函数才会被调用。假若你在此例中不使用 串联,它看起来就会是这样:

#### let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  let p2 = p1.then(function(value) {  
      console.log(value);  
  })  
  p2.then(function() {  
      console.log("Finished");  
  });

### 在这个无串联版本的代码中, p1.then() 的结果被存储在 p2 中,并且随后 p2.then() 被 调用,以添加最终的完成处理函数。正如你可能已经猜到的,对于 p2.then() 的调用也返回 了一个 Promise ,本例只是未使用此 Promise 。

## 捕获错误

### Promise 链允许你捕获前一个 Promise 的完成或拒绝处理函数中发生的错误。例如:

#### let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  p1.then(function(value) {  
      throw new Error("Boom!");  
  }).catch(function(error) {  
      console.log(error.message);  
  });

### 若是一个拒绝处理函数抛出了错  
  误,情况也是一样:

#### let p1 = new Promise(function(resolve, reject) {  
      throw new Error("Explosion!");  
  });  
  p1.catch(function(error) {  
      console.log(error.message);  
      throw new Error("Boom!");  
  }).catch(function(error) {  
      console.log(error.message);  
  });

### 链式 Promise 调用能察 觉到链中其他 Promise 中的错误。  
  为了确保能正确处理任意可能发生的错误,应当始终在 Promise 链尾部添加拒绝处理函数。

## 在 Promise 链中返回值

### Promise 链的另一重要方面是能从一个 Promise 传递数据给下一个 Promise 的能力。传递给 执行器中的 resolve() 处理函数的参数,会被传递给对应 Promise 的完成处理函数,这点你 前面已看到过了。你可以指定完成处理函数的返回值,以便沿着一个链继续传递数据。例 如:

#### let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  p1.then(function(value) {  
      console.log(value);  
      return value + 1;  
  }).then(function(value) {  
      console.log(value);  
  });

### 你能对拒绝处理函数做相同的事。当一个拒绝处理函数被调用时,它也能返回一个值。如果 这么做,该值会被用于完成下一个 Promise ,就像这样:

#### let p1 = new Promise(function(resolve, reject) {  
      reject(42);  
  });  
  p1.catch(function(value) { // 第一个完成处理函数 console.log(value); return value + 1;  
  }).then(function(value) { // 第二个完成处理函数 console.log(value);  
  });  
  // "42"  
  // "43"

### 若有必要,一个 Promise 的失败可以通过传递返回值来恢复整个 Promise 链。

## 在 Promise 链中返回 Promise

### 从完成或拒绝处理函数中返回一个基本类型值,能够在 Promise 之间传递数据,但若你返回 的是一个对象呢?若该对象是一个 Promise ,那么需要采取一个额外步骤来决定如何处理。 研究以下例子:

#### let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  let p2 = new Promise(function(resolve, reject) {  
      resolve(43);  
  });  
  p1.then(function(value) { // 第一个完成处理函数 console.log(value); return p2;  
  }).then(function(value) { // 第二个完成处理函数 console.log(value);  
  });

#### 在此代码中, p1 安排了一个决议 42 的作业, p1 的完成处理函数返回了一个已处于决议 态的 Promise : p2 。由于 p2 已被完成,第二个完成处理函数就被调用了。而若 p2 被 拒绝,会调用拒绝处理函数(如果存在的话),而不调用第二个完成处理函数。  
  关于此模式需认识的首要重点是第二个完成处理函数并未被添加到 p2 上,而是被添加到第 三个 Promise 。正因为此,上个例子就等价于:

- let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  let p2 = new Promise(function(resolve, reject) {  
      resolve(43);  
  });  
  let p3 = p1.then(function(value) { // 第一个完成处理函数  
      console.log(value);  
      return p2;  
  });  
  p3.then(function(value) { // 第二个完成处理函数 console.log(value);  
  });

- 此处清楚说明了第二个完成处理函数被附加给 p3 而不是 p2 。这是一个细微但重要的区 别,因为若 p2 被拒绝,则第二个完成处理函数就不会被调用。例如:

	- let p1 = new Promise(function(resolve, reject) {  
	      resolve(42);  
	  });  
	  let p2 = new Promise(function(resolve, reject) {  
	      reject(43);  
	  });  
	  p1.then(function(value) { // 第一个完成处理函数 console.log(value); return p2;  
	  }).then(function(value) { // 第二个完成处理函数 console.log(value);  
	  });

	- 在此例中,由于 p2 被拒绝了,第二个完成处理函数就永不被调用。不过你可以改为对其附 加一个拒绝处理函数:

		- let p1 = new Promise(function(resolve, reject) {  
		      resolve(42);  
		  });  
		  let p2 = new Promise(function(resolve, reject) {  
		      reject(43);  
		  });  
		  p1.then(function(value) { // 第一个完成处理函数 console.log(value); return p2;  
		  }).catch(function(value) { // 拒绝处理函数  
		      console.log(value);  
		  // 42  
		  // 43  
		  });

		- 从完成或拒绝处理函数中返回 thenable ,不会对 Promise 执行器何时被执行有所改变。第一 个被定义的 Promise 将会首先运行它的执行器,接下来才轮到第二个 Promise 的执行器执 行,以此类推。返回 thenable 只是让你能在 Promise 结果之外定义附加响应。你能通过在完 成处理函数中创建一个新的 Promise ,来推迟完成处理函数的执行。例如:

		- let p1 = new Promise(function(resolve, reject) {  
		      resolve(42);  
		  });  
		  p1.then(function(value) {  
		      console.log(value);     // 42  
		  // 创建一个新的 promise  
		      let p2 = new Promise(function(resolve, reject) {  
		          resolve(43);  
		  });  
		      return p2  
		  }).then(function(value) {  
		      console.log(value);  
		  // 43  
		  });

		- 在此例中,一个新的 Promise 在 p1 的完成处理函数中被创建。这意味着直到 p2 被完成之 后,第二个完成处理函数才会执行。若你想等待前面的 Promise 被解决,之后才去触发另一 个 Promise ,那么这种模式就非常有用。

## 响应多个 Promise

### 本章至今的每个例子在同一时刻都只响应一个 Promise 。然而有时你会想监视多个 Promise 的进程,以便决定下一步行动。 ES6 提供了能监视多个 Promise 的两个方法:  
  Promise.all() 与 Promise.race() 

#### Promise.all() 方法

- Promise.all() 方法接收单个可迭代对象(如数组)作为参数,并返回一个 Promise 。这个 可迭代对象的元素都是 Promise ,只有在它们都完成后,所返回的 Promise 才会被完成。例 如:

	- let p1 = new Promise(function(resolve, reject) {  
	      resolve(42);  
	  });  
	  let p2 = new Promise(function(resolve, reject) {  
	      resolve(43);  
	  });  
	  let p3 = new Promise(function(resolve, reject) {  
	      resolve(44);  
	  });  
	  let p4 = Promise.all([p1, p2, p3]);  
	  p4.then(function(value) {  
	      console.log(Array.isArray(value));  // true  
	  });

- 若传递给 Promise.all() 的任意 Promise 被拒绝了,那么方法所返回的 Promise 就会立刻被 拒绝,而不必等待其他的 Promise 结束:

	- let p1 = new Promise(function(resolve, reject) {  
	      resolve(42);  
	  });  
	  let p2 = new Promise(function(resolve, reject) {  
	      reject(43);  
	  });  
	  let p3 = new Promise(function(resolve, reject) {  
	      resolve(44);  
	  });  
	  let p4 = Promise.all([p1, p2, p3]);  
	  p4.catch(function(value) {  
	      console.log(Array.isArray(value))  
	      console.log(value);  
	  });

#### Promise.race() 方法

- Promise.race() 提供了监视多个 Promise 的一个稍微不同的方法。此方法也接受一个包含需 监视的 Promise 的可迭代对象,并返回一个新的 Promise ,但一旦来源 Promise 中有一个被 解决,所返回的 Promise 就会立刻被解决。与等待所有 Promise 完成的 Promise.all() 方法 不同,在来源 Promise 中任意一个被完成时, Promise.race() 方法所返回的 Promise 就能 作出响应。例如:

	- let p1 = Promise.resolve(42);  
	  let p2 = new Promise(function(resolve, reject) {  
	      resolve(43);  
	  });  
	  let p3 = new Promise(function(resolve, reject) {  
	      resolve(44);  
	  });  
	  let p4 = Promise.race([p1, p2, p3]);  
	  p4.then(function(value) {  
	      console.log(value);     // 42  
	  });

	- 在此代码中, p1 被创建为一个已完成的 Promise ,而其他的 Promise 则需要调度作业。 p4 的完成处理函数被使用数值 42 进行了调用,并忽略了其他的 Promise 。传递给 Promise.race() 的 Promise 确实在进行赛跑,看哪一个首先被解决。若胜出的 Promise 是被  
	  完成,则返回的新 Promise 也会被完成;而胜出的 Promise 若是被拒绝,则新 Promise 也会 被拒绝。此处有个使用拒绝的范例:

		- let p1 = new Promise(function(resolve, reject) {  
		      resolve(42);  
		  });  
		  let p2 = Promise.reject(43);  
		  let p3 = new Promise(function(resolve, reject) {  
		      resolve(44);  
		  });  
		  let p4 = Promise.race([p1, p2, p3]);  
		  p4.catch(function(value) {  
		      console.log(value);     // 43  
		  });

## 继承 Promise

### 正像其他内置类型,你可将一个 Promise 用作派生类的基类。这允许你自定义变异的 Promise ,在内置 Promise 的基础上扩展功能。例如,假设你想创建一个可以使用  
  success() 与 failure() 方法的 Promise ,对常规的 then() 与 catch() 方法进行扩展, 可以像下面这样创建该 Promise 类型:

#### class MyPromise extends Promise { // 使用默认构造器  
      success(resolve, reject) {  
          return this.then(resolve, reject);  
  }  
      failure(reject) {  
          return this.catch(reject);  
  } }  
  let promise = new MyPromise(function(resolve, reject) {  
      resolve(42);  
   });  
  promise.success(function(value) {  
      console.log(value);  
  }).failure(function(value) {  
      console.log(value);  
  });

### 若传递内置 Promise 给这两个方法,将会被决议或被拒绝,并且会 返回一个新的 MyPromise ,以便绑定完成或拒绝处理函数。例如:

#### let p1 = new Promise(function(resolve, reject) {  
      resolve(42);  
  });  
  let p2 = MyPromise.resolve(p1);  
  p2.success(function(value) {  
      console.log(value);  
  // 42  
  });  
  console.log(p2 instanceof MyPromise);  
  // true

## 异步任务运行

### 针对 JS 中的异步任务运行,为之引入简单语法的一项工作正在进 行。此工作开展在 await 语法上,极度借鉴了上述以 Promise 为基础的例子。其基本 理念是使用一个被 async 标记的函数(而非生成器),并在调用另一个函数时使用  
  await 而非 yield ,就像这样:

#### (async function() {  
    let contents = await readFile("config.json");  
    doSomethingWith(contents);  
    console.log("Done");  
  });

#### 在 function 之前的 async 关键字标明了此函数使用异步方式运行。 await 关键字则 表示对于 readFile("config.json") 的函数调用应返回一个 Promise ,若返回类型不 对,则会将其包装为 Promise 。 await 会在 Promise 被 拒绝的情况下抛出错误,否则它将返回该 Promise 被决议的值。最终结果是你可以将异 步代码当作同步代码来书写,而无须为管理基于迭代器的状态机而付出额外开销。  
  await 语法预计将在 ES2017 (即 ES8 )中被最终敲定。(译注:已被纳入 ES8 )

## 总结

### Promise 被设计用于改善 JS 中的异步编程,与事件及回调函数对比,在异步操作方面为你提 供了更多的控制权与组合性。 Promise 调度被添加到 JS 引擎作业队列,以便稍后执行。不 过此处有另一个作业队列追踪着 Promise 的完成与拒绝处理函数,以确保适当的执行。  
  Promise 具有三种状态:挂起、已完成、已拒绝。一个 Promise 起始于挂起态,并在成功时 转为完成态,或在失败时转为拒绝态。在这两种情况下,处理函数都能被添加以表明 Promise 何时被解决。 then() 方法允许你绑定完成处理函数与拒绝处理函数,而 catch() 方法则只允许你绑定拒绝处理函数。  
  你能用多种方式将多个 Promise 串联在一起,并在它们之间传递信息。每个对 then() 的调 用都创建并返回了一个新的 Promise ,在前一个 Promise 被决议时,新 Promise 也会被决 议。 Promise 链可被用于触发对一系列异步事件的响应。你还能使用 Promise.race() 与  
  Promise.all() 来监视多个 Promise 的进程,并进行相应的响应。  
  组合使用生成器与 Promise 会让异步任务运行得更容易,这是由于 Promise 提供了异步操作 可返回的一个通用接口。这样你就能使用生成器与 yield 运算符来等待异步响应,并作出适 当的应答。  
  多数新的 web API 都基于 Promise 创建,并且你可以期待未来会有更多的效仿之作。

