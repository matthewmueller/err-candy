var babel = require('babel-core')
var candy = require('./')
var babel_error

try {
  babel.transform('())(')
} catch (e) {
  babel_error = e
}

var err = candy([
  new Error('cant sort this out'),
  new Error('b'),
  babel_error,
  new Error('c')
])
// throw err
// console.log(err.message)

var a = candy(new Error('omg wtf!!!!'))
throw a
