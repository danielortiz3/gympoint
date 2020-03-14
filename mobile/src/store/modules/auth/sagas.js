import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import colors from '../../../styles/colors';

import api from '~/services/api';
import { signSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    yield call(api.get, `student/${id}`);

    yield put(signSuccess(id));
  } catch (err) {
    showMessage({
      message: 'Failed to enter system, student not registered',
      type: 'info',
      position: 'top',
      icon: 'warning',
      backgroundColor: `${colors.red}`,
      color: `${colors.white}`,
    });
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_REQUEST', signIn)]);
