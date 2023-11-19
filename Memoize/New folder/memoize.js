function memoize(fn){
    const cache = new Map();
    const callCounts = new Map();

    function memoized(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)){
            // if result is already cached, return it
            callCounts.set(fn, callCounts.get(fn) + 1)
            console.log('--from-cached');
            return cache.get(key);
        } else {
            console.log('--from-execution');
            // Other, call the original function, cache the result, and return it
            const result = fn(...args);
            cache.set(key, result);
            callCounts.set(fn, (callCounts.get(fn) || 0) + 1);
            return result;
        }
    }

    memoized.getCallCount = () => callCounts.get(fn) || 0;
    return memoized;
}

function welcome(name){
    return `Welcome ${name}`
}

let memoizedWelcome = memoize(welcome);

console.log(memoizedWelcome('Mamun'));
console.log(memoizedWelcome('Mamun'));
console.log(memoizedWelcome('Hasan'));

