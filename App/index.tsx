import React, { useState, useEffect } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { Provider } from 'react-redux';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import Routes from '@Routes';
import { store, persistor } from '@Stores';
import { ApiConfig } from '@ApiConfig';
import {
  configureUrl,
  getHeaders,
  removeStoreItem,
  Authentication,
} from '@Utils';
import { AppContextProvider } from '@AppContext';
import { NoConnection } from '@SubComponents';
import { CommonStyle } from '@Theme';

axios.interceptors.request.use(
  config => {
    let request = config;
    request.headers = getHeaders();
    request.url = configureUrl(config.url!);
    return request;
  },
  error => error,
);

axios.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 401) {
      handleInvalidToken();
    }
    throw error;
  },
);

const handleInvalidToken = () => {
  removeStoreItem(Authentication.TOKEN);
  ApiConfig.token = null as any;
  DeviceEventEmitter.emit(Authentication.REDIRECT_LOGIN);
};

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let netInfoSubscription: NetInfoSubscription | null = null;
    const manageConnection = () => {
      retryConnection();
      netInfoSubscription = NetInfo.addEventListener(handleConnectivityChange);
    };
    // Check network connection
    const retryConnection = async () => {
      handleConnectivityChange(await NetInfo.fetch());
    };
    manageConnection();
    return () => {
      if (netInfoSubscription) {
        netInfoSubscription();
      }
    };
  }, []);

  const retryConnection = async () => {
    handleConnectivityChange(await NetInfo.fetch());
  };

  // Managed internet connection
  const handleConnectivityChange = (info: NetInfoState) => {
    if (info.type === 'none' || !info.isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>
          <View style={CommonStyle.flexContainer}>
            <Routes />
            {(!isConnected && (
              <NoConnection retryConnection={retryConnection} />
            )) ||
              null}
          </View>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
