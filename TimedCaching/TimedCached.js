var TimeLimitedCache = function(){
    this.cache = new Map();
}

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now();
    const expirationTime = currentTime + duration;
    if(this.cache.has(key)){
        const { expiration } = this.cache.get(key);
        if(currentTime < expiration){
            return true;
        }
    }
    this.cache.set(key, { value, expiration: expirationTime });
    return false;
}

TimeLimitedCache.prototype.get = function(key){
    const currentTime = Date.now();
    if(this.cache.get(key)){
        const { value, expiration } = this.cache.get(key);
        if(currentTime < expiration){
            return value;
        }
    } else {
        return null;
    }
}

TimeLimitedCache.prototype.count = function(){
    const currentTime = Date.now();
    let count = 0;
    
    this.cache.forEach(entry => {
        if(currentTime < entry.expiration){
            count++;
        } else {
            this.cache.delete();
        }
    })
    return count;
}

const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set('name', 'Abdullah Al mamun', 5000)
timeLimitedCache.set('name', 'Abdullah Al mamun', 5000)

let to = setInterval(() => {
    console.log(timeLimitedCache.get('const')); // 42
    console.log(timeLimitedCache.count()); // 1
    if(!timeLimitedCache.count()) clearTimeout(to)
}, 1000);