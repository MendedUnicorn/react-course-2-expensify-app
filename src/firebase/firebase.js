import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onChildRemoved,
  onChildChanged,
} from 'firebase/database';
import expenses from '../tests/fixtures/expenses';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db as default };

// push(ref(db, 'expenses'), {
//   description: 'Water Bill',
//   note: 'first month',
//   amount: '14000',
//   createdAt: '2345432534523',
// });

// onValue(ref(db, 'expenses'), (snap) => {
//   const expenses = [];
//   snap.forEach((s) => {
//     expenses.push({
//       id: s.key,
//       ...s.val(),
//     });
//   });
//   console.log(expenses);
// });

// onChildRemoved(ref(db, 'expenses'), (snap) => {
//   console.log(snap.key, snap.val());
// });
// onChildChanged(ref(db, 'expenses'), (snap) => {
//   console.log(snap.key, snap.val());
// });

// setTimeout(() => {
//   push(ref(db, 'expenses'), {
//     description: 'Poop Bill',
//     note: '',
//     amount: '123',
//     createdAt: '2345432534523',
//   });
// }, 2000);

// push(ref(db, 'notes'), {
//   title: 'Shopping list',
//   body: 'Oranges, Milk, bread, eggs, flour',
// });

// update(ref(db, 'notes/-NM4SMQrZSyD05ls-Qqk'), {
//   body: 'Buy food',
// });

// remove(ref(db, 'notes/-NM4SMQrZSyD05ls-Qqk'));

// set(ref(db), {
//   name: 'Andrew Mead',
//   age: 27,
//   stressLevel: 6,
//   isSingle: false,
//   location: { city: 'Philadephia', country: 'USA' },
//   job: { title: 'Software Developer', company: 'Google' },
// })
//   .then(() => console.log('Data is saved'))
//   .catch((err) => console.log('This failed.', err));

// set(ref(db, 'age'), 28);
// set(ref(db, 'location/city'), 'New York');

// set(ref(db, 'attributes'), { height: 187, weight: 92 })
//   .then((res) => console.log('Data saved! ', res))
//   .catch((err) => console.log('error, something went wrong.', err));

// remove(ref(db))
//   .then((res) => console.log('Data removed! ', res))
//   .catch((err) => console.log('error, something went wrong.', err));

// update(ref(db), {
//   'job/company': 'Amazon',
//   'location/city': 'Seattle',
//   stressLevel: 9,
// });
