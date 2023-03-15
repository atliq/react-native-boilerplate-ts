import { takeLatest } from 'redux-saga/effects';
import { GET_USER } from '@Keys';
import { getUserSaga } from '@Sagas/UserSaga';

export default function* rootSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}
