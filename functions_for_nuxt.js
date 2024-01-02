
// With useCookie()
function pushInCookie(value, max_length=5){
    const key = 'recent-viewed-products';
    if(!useCookie(key).value){
      useCookie(key).value = [];
    }
    let data_array = Array.from(useCookie(key).value);
    let uniqueSet = new Set([...data_array, value]);
    let uniqueArray = [...uniqueSet];
    if(uniqueArray.length > max_length){
      uniqueArray.shift();
    }
    useCookie(key).value = uniqueArray;
    return uniqueArray;
  }