function memoize(fn){
    const cache = new Map();
    return function(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)){
            console.log('--from-cached');
            return cache.get(key)
        } else {
            let result = fn(...args);
            console.log('--from-execution');
            cache.set(key, result);
            return result;
        }
    }
}

function welcome(name){
    return `Welcome ${name}`
}

let memoizedWelcome = memoize(welcome);

console.log(memoizedWelcome('Mamun'));
console.log(memoizedWelcome('Mamun'));
console.log(memoizedWelcome('Hasan'));