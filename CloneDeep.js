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
      return type; // undefined, function
    }
}



let data = {
    'fn': () => null,
    'fn2': function(a, b){return a + b},
    'obj': {name: 'Mamun', age: 56,  person: function(){
            return `${this.name} ${this.age}`
        }
    },
    'arr': [2, 3, 4],
    'string': '',
    'null': null,
    'undefined': undefined,
    'symbol': Symbol,
    'regex': /\d+/,
}
/**
 * @param data array|object
 * @return cloned object recursively
 */
let cloneDeep = (data) => {
    const inputType = checkType(data)
    if(!['object', 'array'].includes(inputType)) return    
    let new_data = (inputType=='object') ? {} : []  

    const cloneByMe = (insertInto, data, dd=false) => { 
      const typeof_data = checkType(insertInto)
      
        
      if(typeof_data=='object'){        
        Object.keys(data).forEach(key => {
            let value = data[key]
            let value_type = checkType(value)
            if(value_type == 'object'){
                insertInto[key] = {}
                cloneByMe(insertInto[key], value, true)
            }
            else if(value_type=='array'){
                insertInto[key] = []
                cloneByMe(insertInto[key], value)
            }
            else{
                insertInto[key] = value
            }
        })
    }
    else if(typeof_data=='array'){  
        data.forEach((value, key) => {
          
          let value_type = checkType(value)
          if(value_type == 'object'){
              insertInto[key] = {}
              cloneByMe(insertInto[key], value)
          }
          else if(value_type=='array'){
              insertInto[key] = []
              cloneByMe(insertInto[key], value)
          }
          else{
              insertInto[key] = value
          }
        }) 
      }       
    }
    cloneByMe(new_data, data)
    return new_data
}


let persons = [
  {name: 'Mamun',
  age: 44,
  },
  {name: 'Mamun',
  age: 44,
  },
  {name: 'Mamun',
  age: 44,
  },
]
let new_persons = cloneDeep(persons)
new_persons[0] = {name: 'New_name', age: 999}
new_persons[2].name = '---name'
log('\n\n==============Example-1[]===================')
log('\n----------Old')
log(persons)
log('\n----------New')
log(new_persons)



// Example 2
let one = {
    name: 'Mamun',
    age: 44,
    persons: [
        {name: 'Mamun',
        age: 44,
        },
        {name: 'Mamun',
        age: 44,
        },
        {name: 'Mamun',
        age: 44,
        },
    ]
}
let two = cloneDeep(one)
two.name = 'new_value'
two.persons[0].name = 'new_value'
two.persons[0].age = 999

log('\n\n==============Example-2{}===================')
log('\n----------Old')
log(one)
log('\n----------New')
log(two)


  

