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

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function numberToDigit(number) {
  // Kothay takar amount
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertToWords(n) {
      if (n < 10) {
          return units[n];
      } else if (n < 20) {
          return teens[n - 10];
      } else {
          const digit = n % 10;
          const ten = Math.floor(n / 10);
          return tens[ten] + " " + units[digit];
      }
  }

  function convertChunksToWords(num, chunk) {
      const words = [];
      const hundred = Math.floor(num / 100);
      num %= 100;

      if (hundred > 0) {
          words.push(units[hundred] + " Hundred");
      }

      if (num > 0) {
          if (words.length > 0) {
              words.push("and");
          }
          words.push(convertToWords(num));
      }

      if (chunk && words.length > 0) {
          words.push(chunk);
      }

      return words.join(" ");
  }

  if (number === 0) {
      return "Zero";
  }

  const chunks = ["", "Thousand", "Million"];
  let result = "";
  let chunkIndex = 0;

  while (number > 0) {
      const chunkValue = number % 1000;
      if (chunkValue > 0) {
          result = convertChunksToWords(chunkValue, chunks[chunkIndex]) + " " + result;
      }
      number = Math.floor(number / 1000);
      chunkIndex++;
  }

  return result.trim();
}

module.exports = {
    log,
    checkType,
    formatBytes,
    randomBetween,
}