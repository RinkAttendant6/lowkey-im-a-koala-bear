# Demo 2 - Higher-order functions for array operations

The examples here demonstrate the use of higher-order functions to perform transformations, filtering, and accumulation operations on arrays in JavaScript.

## Requirements

Node.js 4+

## Run

```shell
$ node index.js
```

All of the examples will execute.

## Concepts

### Transformation: [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

The `.map` method of an array takes a function to transform each element of the array (let's call this the transformation function).

```
transformedArray = arr.map((element, index) => {
    // return the transformed element
});
```

- Parameters of the transformation function: (element being transformed, index). You don't need to specify the index if you don't need it.
- Return value of the transformation function: Transformed element (does not need to be the same type as the element being transformed). If there is no return value, the element will be transformed to `undefined`.

`.map` returns a new array of the same length as the original array. The original array is untouched.

### Filtering: [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

The `.filter` method of an array takes a function to determine whether each element should be kept in the array (let's call this the filtering function).

```
filteredArray = arr.filter((element, index) => {
    // return true to keep element, false to not keep it
});
```

- Parameters of the filtering function: (element, index). You don't need to specify the index if you don't need it.
- Return value of the filtering function: True (or a truthy value) if the element should be kept, false (or a falsy value) if the element should not be kept.

`.filter` returns a new array of equal or smaller size. The original array is untouched.

### Accumulation: [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) and [`Array.prototype.reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

The `.reduce` method of an array takes a function that accumulates each element into an accumulator (let's call this the accumulation function).

```
accumulatedValue = arr.reduce((currentAccumulatorValue, element, index) => {
    // return the new value of the accumulator
}, initialAccumulatorValue);
```

- Parameters of the accumulation function: (accValue, element, index). You don't need to specify the index if you don't need it.
- Return value of the accumulation function: The new accumulator value

`.reduce` returns one value, whatever the last value of the accumulator is. For example if you are summing up numbers, this would be a number. If you are flattening a two-dimensional array, the function would return an array. The original array is untouched.

`.reduceRight` works the same way except it starts with the last element and works backwards. It is useful when performing non-associative operations I assume, but practical cases are quite rare.