**English documentation is below**

# 介绍

[TOC]

### reduce-events.js 是什么

reduce-events 是一个用来解决浏览器的 resize 类似事件的重复触发过多，从而导致页面卡顿的场景
reduce-events 是使用纯 JavaScript 实现的，这意味着它是无依赖的
reduce-events 的实现仅有少量代码，这意味着它也是轻量级的

### 安装

#### NPM

reduce-events 托管在 NPM 上，执行以下命令安装

```js
npm install reduce-events.js --save
```

接下来就可以在代码里面引入了

```js
import throttleVal from "reduce-events.js";
```

### 起步

reduce-events 最常见的应用场景是当你监听浏览器的 resize 事件时，想要减少相应的触发频率

#### 初始化代码

```js
import throttleVal from "reduce-events.js";

const obj = {
  outTime: 250,
  loopCount: 0,
  compareCount: 0,
  startLoop: false,
  forceOut: 100,
  reset: null,
};

const eventMethod = throttleVal.bind(
  null,
  function (type, event) {
    console.log(type, event);
  },
  obj
);

window.addEventListener("resize", eventMethod);
```

此时就已经初始化了一个,当浏览器不断触发 resize 事件时，我们的事件处理只会在最后一次触发时执行

#### 参数配置

1. **outTime**
   reduce-events 内部使用 setTimeout 来进行处理，此参数用来控制 setTimeout 的第三个参数
   此参数越小，我们自定义的事件就会在最后一次触发的时候更快的得到响应，但是此参数不建议过小，过小可能会导致无法在最后一次触发的时候响应，推荐默认值或者调大
2. **loopCount**
   reduce-events 内部使用的值，初始值为 0 即可，**loopCount**的值初始化的时候一定要与**compareCount**相等
3. **compareCount**
   reduce-events 内部使用的值，初始值为 0 即可，**compareCount**的值初始化的时候一定要与**loopCount**相等
4. **startLoop**
   reduce-events 内部使用的值，初始值为 false
5. **forceOut**
   如果有需求，需要每隔几次事件就必须触发一次我们自定义的事件，此时就可以使用**forceOut**，**forceOut**用来控制每隔几次事件，就必须强制触发一次我们的自定义事件，默认值为 100，大部分情况 100 都是无法触发的，如果遇到此场景，将此参数调低即可
   > 注意事项: 当**forceOut**触发了我们的自定义事件之后，内部状态会清空。
   > 如果**forceOut**遇见了最后一次触发的时机,则只有**forceOut**会触发
   > 比如第 20 是最后一次触发的时间点，但是**forceOut**设置的是 20，则只会触发后者
6. **type**
   ```js
   const eventMethod = throttleVal.bind(
     null,
     function (type, event) {
       console.log(type, event);
     },
     obj
   );
   ```
   我们自定义的事件，会接收到 2 个参数，分别为 type 和 event
   type：触发此次事件的类型，一共有 2 种，**forceOut**触发和正常触发，值分别为：forceOut、stop
   event：触发此次事件的事件对象

### 常用场景

#### 删除绑定的事件

如果我们想要删除 reduce-events 创建的事件

```js
const eventMethod = throttleVal.bind(
  null,
  function () {
    console.log(2);
  },
  obj
);

window.addEventListener("resize", eventMethod);
window.removeEventListener("resize", eventMethod);
```

#### 同一个事件绑定多个处理程序

如果我们想要给一个事件，绑定多个处理事件程序

```js
const eventMethod = throttleVal.bind(
  null,
  function () {
    console.log(1);
  },
  obj
);

const eventMethod2 = throttleVal.bind(
  null,
  function () {
    console.log(2);
  },
  // warn：这里不要采用和eventMethod同样的obj对象
  Object.assign({}, obj)
);

window.addEventListener("resize", eventMethod);
window.addEventListener("resize", eventMethod2);
```

### 注意事项

1. 绑定多个处理程序时，每个事件处理程序的配置对象，一定不要采用同一个
2. 配置对象为必填，里面的参数必须有
3. **一定要采用下面的方式进行绑定**

```js
const eventMethod = throttleVal.bind(
  null,
  function () {
    console.log(1);
  },
  obj
);

window.addEventListener("resize", eventMethod);
```

如果采用下面这种方式，就会无法清除这个绑定的事件

```js
window.addEventListener(
  "resize",
  throttleVal.bind(
    null,
    function () {
      console.log(1);
    },
    obj
  )
);

// wanr：无效
window.addEventListener(
  "resize",
  throttleVal.bind(
    null,
    function () {
      console.log(1);
    },
    obj
  )
);
```

# **machine translation**:

## Introduce

### what is reduce-events.js

reduce-events is a scenario in which the browser's resize-like events are repeatedly triggered too much, resulting in page freezes

reduce-events is implemented using pure JavaScript, which means it is dependency free

The implementation of reduce-events has only a small amount of code, which means it is also lightweight

### Install

NPM
reduce-events is hosted on NPM, run the following command to install

```js
npm install reduce-events.js --save
```

Then you can introduce it in the code

```js
import throttleVal from "reduce-events.js";
```

### Start

The most common application scenario of reduce-events is when you listen to the browser's resize event and want to reduce the corresponding trigger frequency

#### Init code

```js
import throttleVal from "reduce-events.js";

const obj = {
  outTime: 250,
  loopCount: 0,
  compareCount: 0,
  startLoop: false,
  forceOut: 100,
  reset: null,
};

const eventMethod = throttleVal.bind(
  null,
  function (type, event) {
    console.log(type, event);
  },
  obj
);

window.addEventListener("resize", eventMethod);
```

At this point, one has been initialized. When the browser keeps triggering the resize event, our event processing will only be executed at the last trigger.

#### Parameter Configuration

1. **outTime**
   reduce-events uses setTimeout internally for processing, this parameter is used to control the third parameter of setTimeout
   The smaller this parameter is, the faster our custom event is triggered when it is triggered for the last time. However, it is not recommended that this parameter is too small. If it is too small, it may cause it to fail to respond when it is triggered for the last time. It is recommended that the default value or turn up
2. **loopCount**
   The value used internally by reduce-events, the initial value is 0, and the value of **loopCount** must be equal to **compareCount** when initialized
3. **compareCount**
   The value used internally by reduce-events, the initial value is 0, and the value of **compareCount** must be equal to **loopCount** when initialized
4. **startLoop**
   The value used internally by reduce-events, the initial value is false
5. **forceOut**
   If there is a need, we need to trigger our custom event every few times. At this time, we can use **forceOut**. ForceOut is used to control every few events, and we must force our custom event to trigger once. The default value It is 100. In most cases, 100 cannot be triggered. If you encounter this scene, you can lower this parameter.
   > Note: When forceOut fires our custom event, the internal state will be cleared. If forceOut meets the timing of the last trigger, only forceOut will trigger. For example, the 20th is the time point of the last trigger, but if forceOut is set to 20, only the latter will be triggered.
6. **type**
   ```js
   const eventMethod = throttleVal.bind(
     null,
     function (type, event) {
       console.log(type, event);
     },
     obj
   );
   ```
   Our custom event will receive 2 parameters, namely type and event
   type: The type of triggering this event, there are 2 types, **forceOut** trigger and normal trigger, the values ​​are: forceOut, stop
   event: the event object that triggered this event

### Common scenarios

#### delete bound event

If we want to delete events created by reduce-events

```js
const eventMethod = throttleVal.bind(
  null,
  function () {
    console.log(2);
  },
  obj
);

window.addEventListener("resize", eventMethod);
window.removeEventListener("resize", eventMethod);
```

#### Bind multiple handlers to the same event

If we want to give an event, bind multiple event handlers

```js
const eventMethod = throttleVal.bind(
  null,
  function () {
    console.log(1);
  },
  obj
);

const eventMethod2 = throttleVal.bind(
  null,
  function () {
    console.log(2);
  },
  // warn：这里不要采用和eventMethod同样的obj对象
  Object.assign({}, obj)
);

window.addEventListener("resize", eventMethod);
window.addEventListener("resize", eventMethod2);
```

### Precautions

1. Precautions When binding multiple handlers, the configuration object of each event handler must not use the same one
2. The configuration object is required, and the parameters in it must have
3. Must be bound in the following way

```js
const eventMethod = throttleVal.bind(
  null,
  function () {
    console.log(1);
  },
  obj
);

window.addEventListener("resize", eventMethod);
```

If you use the following method, you will not be able to clear the bound event

```js
window.addEventListener(
  "resize",
  throttleVal.bind(
    null,
    function () {
      console.log(1);
    },
    obj
  )
);

// wanr：invalid
window.addEventListener(
  "resize",
  throttleVal.bind(
    null,
    function () {
      console.log(1);
    },
    obj
  )
);
```
