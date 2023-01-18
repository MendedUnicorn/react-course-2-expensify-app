const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'Andrew', age: 23 });
    // reject('Something went wrong');
  }, 1500);
});
console.log('Before');

promise
  .then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('this is my other promise');
      }, 1500);
    });
  })
  .then((str) => {
    console.log('does this run?', str);
  })
  .catch((err) => console.log('Error: ', err));

console.log('After');
