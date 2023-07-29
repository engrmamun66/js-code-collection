let checkType = require('./checkType')

const log = console.log

/**
 * @param data array|object
 * @return cloned object recursively
 */
let cloneDeep = (data) => {
    const inputType = checkType(data)
    if(!['object', 'array'].includes(inputType)) return    
    let new_data = (inputType=='object') ? {} : []  

    const cloneByMe = (insertInto, data) => { 
      const typeof_data = checkType(data)
      let iterable = typeof_data === 'object' ? Object.keys(data) : data       
        
      iterable.forEach((a, b) => {
        let key = typeof_data==='object' ? a : b
        let value = typeof_data==='object' ? data[key] : a     
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
    cloneByMe(new_data, data)
    return new_data
}


let persons = [
  (a, b) => a + b,
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
new_persons[1] = {name: 'New_name', age: 999}
new_persons[2].name = '---name'
log('==============Example-1[]===================')
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
        () => 'yah'
    ]
}
let two = cloneDeep(one)
two.name = 'new_value'
two.persons[0].name = 'new_value'
two.persons[0].age = 999
two.persons[2].age = 33333

log('\n\n==============Example-2{}===================')
log('\n----------Old')
log(one)
log('\n----------New')
log(two)




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

let data2 = cloneDeep(data)
data2.obj.name = 'new__name'
data2.null = 'inset value'
data2.undefined = 'defined'
log('\n\n==============Example-3{}===================')
log('\n----------Old')
log(data)
log('\n----------New')
log(data2)


  

