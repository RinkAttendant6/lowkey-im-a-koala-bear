/**
 * @file Examples to demonstrate higher-order functions to manipulate arrays
 *       using Array.prototype.map, Array.prototype.filter, and
 *       Array.prototype.reduce.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce}
 * @author Vincent Diep
 */
'use strict';

/**
 * Data
 * @type {Object.<string, string>[]}
 */
let data = [
    {
        name: 'Tyler',
        employer: 'Canadian Tire'
    },
    {
        name: 'Jordan',
        employer: 'Tim Hortons'
    },
    {
        name: 'Taylor',
        employer: 'Tim Hortons'
    },
    {
        name: 'Marissa',
        employer: 'Tim Hortons'
    },
    {
        name: 'Nicole',
        employer: 'Tim Hortons'
    }
];

// ****************************************************************************
// Ex. 1 - Transforming an array of objects to an array of strings
// returns string[]
// ****************************************************************************

let names = data.map(person => {
        return person.name;
});

console.log(names);

// ****************************************************************************
// Ex. 2 - Filtering an array of objects by value of object property
// returns Object.<string, string>[]
// ****************************************************************************

let peopleNotWorkingAtTimHortons = data.filter(person => {
        return person.employer !== 'Tim Hortons';
});

console.log(peopleNotWorkingAtTimHortons);

// ****************************************************************************
// Ex. 3 - Filtering and then transforming
// (1) .filter returns Object.<string, string>[]
// (2) .map returns string[] 
// ****************************************************************************

let namesOfPeopleNotWorkingAtTimHortons = data.filter(person => {
        return person.employer !== 'Tim Hortons';  // (1)
}).map(person => {
    return person.name; // (2)
});

console.log(namesOfPeopleNotWorkingAtTimHortons);

// ****************************************************************************
// Ex. 4 - Transform an array of objects to an array of different objects
// returns Object.<string, *>[]
// ****************************************************************************

let somethingWithObjects = data.map(d => {
        return {
            categoryLabel: d.employer,
            something: Math.random()
        };
});

console.log(somethingWithObjects);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let moreData = [
    {
        name: 'University of Ottawa',
        type: 'university',
        population: 42587
    },
    {
        name: 'Carleton University',
        type: 'university',
        population: 28289
    },
    {
        name: 'Algonquin College',
        type: 'college',
        population: 61849
    },
    {
        name: 'La Cité collégiale',
        type: 'college',
        population: 5000
    }
];

// ****************************************************************************
// Ex. 5 - Accumulator
// returns number
// ****************************************************************************

let total = moreData.reduce((acc, school) => {
        return acc + school.population;
}, 0);
/* ^------ initial value of accumulator */

console.log(`Ex 5: ${total}`);

// ****************************************************************************
// Ex. 6 - Filtering an array and applying an accumulator
// (1) .filter returns Object.<string, *>[]
// (2) .reduce returns number
// ****************************************************************************

let totalUniStudents = moreData.filter((school) => {
        return school.type === 'university'; // (1)
}).reduce((acc, school) => {
    return acc + school.population; // (2)
}, 0);

console.log(`Ex 6: Total university students: ${totalUniStudents}`);

// ****************************************************************************
// Ex. 7 - Transforming an array and sorting. Note the implicit return
// returns string[]
// ****************************************************************************

let schoolNames = moreData.map(school => school.name).sort();
console.log(`Ex 7: ${schoolNames}`);

// ****************************************************************************
// Ex. 8 - Filtering an array, transforming it to strings, and accumulating the
//         length of each string with an initial non-zero accumulator value
// (1) .filter returns Object.<string, *>[]
// (2) .map returns string[]
// (3) .reduce returns number
// ****************************************************************************

let foo = moreData
        .filter(school => school.type === 'college') // (1)
.map(school => school.name) // (2)
.reduce((acc, name) => acc + name.length, 6); // (3)

console.log(`Ex 8: Total length of college names plus six: ${foo}`);

// ****************************************************************************
// Ex. 8 (alternative 1, without transformation)
// ****************************************************************************

let fooAlt = moreData
        .filter(school => school.type === 'college')
.reduce((acc, school) => acc + school.name.length, 6);

console.log(`Ex 8.1: ${fooAlt}`);

// ****************************************************************************
// Ex. 8 (alternative 2, with only reduce. This is less expressive)
// ****************************************************************************

let fooAlt2 = moreData.reduce((acc, school) => {
        return acc + (school.type === 'college' ? school.name.length : 0);
}, 6);

console.log(`Ex 8.2: ${fooAlt2}`);

// ****************************************************************************
// Ex. 8 (alternative 3, with a plain old for loop. This is least expressive)
// ****************************************************************************

let fooAlt3 = 6;
for (let i = 0; i < moreData.length; i++) {
    if (moreData[i].type === 'college') {
        fooAlt3 += moreData[i].name.length;
    }
}

console.log(`Ex 8.3: ${fooAlt3}`);