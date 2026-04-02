export function myInstanceof(left, right) {
  let rightPrototype = right.prototype;

  let leftProto = left.__proto__;
  let flag = true;
  while(true) {
    if (leftProto === null)  return false;
    if (leftProto === rightPrototype) return true;
    leftProto = leftProto.__proto__;
  }

  return flag;
}


export function MyNew(fn, ...args) {
  const newObj = Object.create(fn.prototype);
  const result = fn.apply(newObj, args);
  return typeof result === 'object' && result !== null ? result : newObj;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function deepClone(obj, weakMap = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (weakMap.has(obj)) return weakMap.get(obj);

  let target = Array.isArray(obj) ? [] : {}
  weakMap.set(obj, target)

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key])) {
        target = deepClone(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target;
}

export function debounce(fn, wait, immediate = true) {
  let timer = null, result;
  const debounced =  function(...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        fn.apply(context, args);
        clearTimeout(timer)
        timer = null;
      }, wait)
      if (callNow) result = fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait)
    }
    return result;
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced;
}

export function throttle(func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }
  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }
  return throttled
}

export function flattenArr(input, shallow, strict, output) {
  // 递归使用的时候会用到output
  output = output || []
  var idx = output.length

  for (var i = 0, len = input.length; i < len; i++) {
    var value = input[i]
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        var j = 0,
          length = value.length
        while (j < length) output[idx++] = value[j++]
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flattenArr(value, shallow, strict, output)
        idx = output.length
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict) {
      output[idx++] = value
    }
  }

  return output
}
  // return function curried(...args) {
  //   // 如果传入的参数个数大于等于原函数的参数个数，直接执行
  //   if (args.length >= fn.length) {
  //     return fn.apply(this, args)
  //   }
  //   // 否则返回一个新函数，等待接收剩余参数
  //   return function (...args2) {
  //     return curried.apply(this, args.concat(args2))
  //   }
  // }

export function curryFn(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function(...args2) {
      return curried.apply(this, [...args, ...args2])
    }
  }
}
