import { createStore, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import Reducer from '@Reducers';
import rootSaga from '@Sagas';
import DefaultState from '@Default';
import { LOG_OUT } from '@Keys';
import { storage } from '@Utils';

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT) {
    state = DefaultState;
  }
  return Reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
};

const index = configureStore();
const persistor = persistStore(index);

export type RootState = ReturnType<typeof index.getState>;

const useAppDispatch = () => useDispatch<typeof index.dispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { index as store, persistor, useAppSelector, useAppDispatch };
