import { createStore, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import DefaultState from '@Default/index';
import Reducer from '@Reducers/index';
import rootSaga from '@Sagas/index';
import { LOG_OUT } from '@Keys/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
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
