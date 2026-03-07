export function debounce(fn, wait, options) {
  let lastCallTime, lastInvokeTime, allArgs, timerId, maxing, leading, trailing;

  leading = false;
  trailing = true;
  lastInvokeTime = 0;
  maxing = false;

  if (options) {
    leading = options.leading ? !!options.leading : leading;
    trailing = options.trailing ? !!options.trailing : trailing;
    maxWait = options.maxWait;
    maxing = "maxWait" in options;
  }

  function debounced(...args) {
    const time = new Date();
    const canInvoke = shoulInvoke(time);
    lastCallTime = time;
    allArgs = args;
    if (canInvoke) {
      if (timerId === undefined) {
        return leadingEdge(time);
      }
    }
  }

  function leadingEdge(time) {}

  function shoulInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  return debounced;
}

// export function throttle(fn: () => void, wait: number = 1000) {
//   let timer: any, allArgs, prevCallTime = 0, self;

// 	const later = function() {
// 		prevCallTime = +new Date();
// 		timer = null;
// 		fn.apply(self, allArgs);
// 	}

//   const throttled =  function (...args) {
//     self = this;
// 		allArgs = args;
// 		const now = +new Date();
// 		const remaining = wait - (now - prevCallTime);
// 		if (remaining <= 0 || remaining > wait) {
// 			if (timer) {
// 				clearTimeout(timer);
// 				timer = null;
// 			}
// 			prevCallTime = now;
// 			timer = fn.apply(self, allArgs);
// 		} else if (!timer){
// 			timer = setTimeout(later, remaining);
// 		}
//   };

// 	return throttled;
// }

// 第四版
export function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
			console.log('remaining', remaining)
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
			console.log("触发这里")
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}


export function myCall(context) {
	context.fn = this;
	context.fn();
	delete context.fn;
}

export function myBind(context) {
	let allArgs, self = this;
	const outArgs = Array.prototype.slice.call(arguments, 1);
	return function(...args) {
		const innerArgs = args;
		return self.apply(context, outArgs.concat(innerArgs));
	}
}


