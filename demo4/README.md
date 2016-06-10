# Demo 4 - Object iteration

The examples here demonstrate different ways to iterate through an object.

## Requirements

- A browser that supports the following ES6 features:
  - [Arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  - [let statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
  
[babel-polyfill](https://babeljs.io/docs/usage/polyfill/) is being used in order to allow `Object.values()` to be used. 

## Run

```shell
$ npm install
```

There is no server or runnable code in this demonstration, only information in `index.html`.

## Concepts

### ES1: [`for..in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

Looping through the keys of an object, but includes prototype-inherited properties unless filtered.

### ES5: [`Object.keys().forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

Looping through the keys of an object. Recommended if you need the key.

### ES6: [`for..of`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of)

Looping through the values of an iterable thing such as `Array`, `String`, `Set`, `Map`, and `TypedArray` (but **cannot be used on standard, non-iterable objects**).

### ES7: [`Object.values().forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

Looping through the values of an object. Recommended if you *only* need the value.