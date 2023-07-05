import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: Config.STORAGE_ID ?? 'react-native-boilerplate-ts',
  encryptionKey: Config.STORAGE_KEY ?? '',
});

export const setItemInStorage = (
  key: string,
  data: string | number | boolean,
) => {
  try {
    return storage.set(key, data);
  } catch (error) {
    return null;
  }
};

export const getItemFromStorage = (key: string) => {
  try {
    const value = storage.getString(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getNumberFromStorage = (key: string) => {
  try {
    const value = storage.getNumber(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getBoolFromStorage = (key: string) => {
  try {
    const value = storage.getBoolean(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeStoreItem = (key: string) => {
  try {
    return storage.delete(key);
  } catch (error) {
    return null;
  }
};

export const setObjectInStore = (key: string, data: any) => {
  try {
    return storage.set(key, JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const getObjectFromStore = (key: string) => {
  try {
    const value = storage.getString(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearStorage = () => {
  try {
    return storage.clearAll();
  } catch (error: any) {
    return null;
  }
};
