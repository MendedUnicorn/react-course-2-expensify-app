import { login, logout } from '../../actions/auth';

test('Should setup login object', () => {
  const action = login('123abc');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '123abc',
  });
});

test('Should setup logout object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
