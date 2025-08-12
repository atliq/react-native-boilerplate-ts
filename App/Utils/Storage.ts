import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';
import { wrapSync } from '@Utils/TryCatchWrapper';

export const storage = new MMKV({
  id: Config.STORAGE_ID ?? 'react-native-boilerplate-ts',
  encryptionKey: Config.STORAGE_KEY ?? '',
});

const onError = () => null;

export const setItemInStorage = wrapSync(
  (key: string, data: string | number | boolean) => {
    return storage.set(key, data);
  },
  {
    onError,
  },
);

export const getItemFromStorage = wrapSync(
  (key: string) => {
    const value = storage.getString(key);
    if (value) {
      return value;
    }
    return null;
  },
  {
    onError,
  },
);

export const getNumberFromStorage = wrapSync(
  (key: string) => {
    const value = storage.getNumber(key);
    if (value) {
      return value;
    }
    return null;
  },
  {
    onError,
  },
);

export const getBoolFromStorage = wrapSync(
  (key: string) => {
    const value = storage.getBoolean(key);
    if (value) {
      return value;
    }
    return null;
  },
  {
    onError,
  },
);

export const removeStoreItem = wrapSync(
  (key: string) => {
    return storage.delete(key);
  },
  { onError },
);

export const setObjectInStore = wrapSync(
  (key: string, data: any) => {
    return storage.set(key, JSON.stringify(data));
  },
  { onError },
);

export const getObjectFromStore = wrapSync(
  (key: string) => {
    const value = storage.getString(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },
  { onError },
);

export const clearStorage = wrapSync(
  () => {
    return storage.clearAll();
  },
  {
    onError,
  },
);
