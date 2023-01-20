import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should set login state', () => {
  const uid = 123;
  const state = authReducer({}, { type: 'LOGIN', uid });
  expect(state).toEqual({ uid });
});

test('should set logout state', () => {
  const uid = 123;
  const initialState = { uid };
  const state = authReducer(initialState, { type: 'LOGOUT' });
  expect(state).toEqual({});
});
