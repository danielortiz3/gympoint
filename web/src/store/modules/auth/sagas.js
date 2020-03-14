import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { SignInSuccess, SignInFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* SignIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(SignInSuccess(token, user));

    history.push('/alunos');
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados!');
    yield put(SignInFailure());
  }
}

export function setToken({ payload }) {
  if (payload) {
    const { token } = payload.auth;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }
}

export function SingOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', SignIn),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_OUT', SingOut),
]);
