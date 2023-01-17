// const person = {
//   name: 'Andrew',
//   age: 26,
//   location: {
//     city: 'Phildadelphia',
//     temp: 92,
//   },
// };

// const { age, name: firstName = 'Anon' } = person;

// console.log(`${firstName} is  ${age}`);

// const { temp: temperature, city } = person.location;
// if (city && temperature) console.log(`It's ${temperature} in  ${city}`);

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguine',
  },
};
const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName);

// Array destructuring

const address = [
  '1299 S Juniper Street',
  'Philadelphia',
  'Pennsylvania',
  '19147',
];

const [, city, state] = address;

console.log(`You are in ${city} ${state}`);
