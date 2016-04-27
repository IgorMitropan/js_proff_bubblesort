'use strict';
function throttle(func, ms) {
    let isThrottle = false;
    let savadThis;
    let savedArgs;

    function wrapper() {
        if (isThrottle) {
            savadThis = this;
            savedArgs = arguments;
            return;
        }

        func.apply(this, arguments);

        isThrottle = true;

        setTimeout(function() {
            isThrottle = false;
            if (savedArgs) {
                wrapper.apply(savadThis, savedArgs);
                savedArgs=savadThis = null;
            }
        }, ms);
    }
    return wrapper;
}
