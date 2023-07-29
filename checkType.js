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