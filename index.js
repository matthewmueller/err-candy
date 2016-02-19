/**
 * Module dependencies
 */

var Stack = require('stack-utils')

/**
 * Export `error`
 */

module.exports = error

/**
 * Clean up or combine errors
 *
 * @param {Error|Array} errors
 * @return {Error}
 */

function error (errors) {
  errors = Array.isArray(errors) ? errors : [errors]
  return combine(errors)
}

/**
 * Initialize `combine`
 */

function combine (errors) {
  if (errors.length === 1) return improve(errors[0])

  errors = errors.map(function(error, i) {
    return improve(error)
  })

  var message = errors.map(function (error) {
    return error.message
  }).join('\n\n')

  var stack = errors.map(function (error) {
    return error.stack
  }).join('')

  var error = new Error()
  error.message = message
  error.stack = stack
  error.candy = true

  return error
}

/**
 * Improve the error
 *
 * @param {Error} err
 * @return {Error}
 */

function improve (err, prefix) {
  if (err.candy) return err

  prefix = prefix || '  \u2716 '

  // clean the stack
  var stack = clean(err.stack)

  // create a new error
  var error = new Error()
  error.candy = true

  // improve the message
  var message = normalize(err)
  error.message = prefix + message

  // improve the stack
  error.stack = stack
    ? prefix + message + '\n\n' + stack + '\n\n'
    : prefix + message + '\n\n'

  return error
}

/**
 * Normalize the message
 *
 * @param {Error} err
 * @return {String}
 */

function normalize (err) {
  if (err.codeFrame) { // babelify@6.x
    return [err.message, indent(err.codeFrame, 4)].join('\n\n')
  } else { // babelify@5.x and browserify
    return err.annotated || err.message
  }
}

/**
 * Clean the stack traces
 *
 * @param {String} stack
 * @return {String}
 */

function clean (stack) {
  return new Stack({
    internals: Stack.nodeInternals().concat(/\b\/node_modules\/babel-core\b/),
    cwd: process.cwd()
  })
  .clean(stack)
  .split('\n')
  .filter(line => line)
  .map(line => '    \u25B8 ' + line)
  .join('\n')
}

/**
 * Indent a bit
 *
 * @param {String} str
 * @return {String}
 */

function indent(str, n) {
  return str
    .split('\n')
    .map(function (line) { return repeat(' ', n) + line })
    .join('\n')
}

/**
 * Repeat a string a n times
 *
 * @param {String} str
 * @param {Number} n
 * @return {String}
 */

function repeat (str, n) {
  return new Array(n + 1).join(str)
}
