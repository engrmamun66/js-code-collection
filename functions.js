const log = console.log

function checkType(value) {
    const type = typeof value;
  
    if (type === 'symbol') {
      return 'symbol';
    } else if (type === 'object') {
      if (value === null) {
        return 'null';
      } else if (Array.isArray(value)) {
        return 'array';
      } else if (value instanceof RegExp) {
        return 'regexp';
      } else if (value instanceof Date) {
        return 'date';
      } else {
        return 'object';
      }
    } else {
      return type; // undefined, function, boolean
    }
}


function formatBytes(bytes){
    if(bytes==0){
        return '0 bytes';
    }
    let decimal = 2;
    let k = 1000;
    let dm = decimal + 1 || 3;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports = {
    log,
    checkType,
    formatBytes,
}