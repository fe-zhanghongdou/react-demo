export function debounce (fn, wait, options) {
    let lastCallTime, lastInvokeTime, allArgs, timerId,  maxing, leading, trailing;

    leading = false;
    trailing = true;
    lastInvokeTime = 0;
    maxing = false;

    if (options) {
        leading = options.leading ? !!options.leading : leading;
        trailing = options.trailing ? !!options.trailing : trailing;
        maxWait = options.maxWait;
        maxing = 'maxWait' in options;
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

    function leadingEdge(time) {

    }

    function shoulInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;

        return (
            lastCallTime === undefined ||
            timeSinceLastCall >=  wait ||
            (maxing && timeSinceLastInvoke >= maxWait)
        )
    }

    return debounced;
}