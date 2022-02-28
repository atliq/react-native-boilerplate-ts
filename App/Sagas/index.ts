import { takeLatest } from 'redux-saga/effects';
import { GET_USER } from '@Keys/index';
import { getUserSaga } from '@Sagas/UserSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}
