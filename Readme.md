
# err-candy

  Better formatting for your errors. Supports combining errors into one.

## Features

- Combines multiple errors into one
- Normalizes the error message
- Cleans up the stack trace

## Installation

```
npm install error
```

## Usage

**Single Error:**

```js
var candy = req('err-candy')
var error = candy(new Error('a'))
throw err
```

**Multiple Errors:**

```js
var candy = req('err-candy')

var errors = [
  new Error('a'),
  new Error('b')
]

var error = candy(errors)
throw err
```

## License

MIT
