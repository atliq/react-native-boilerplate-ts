import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import Routes from '@Routes/index';
import { store, persistor } from '@Stores/index';
import { ApiConfig } from '@ApiConfig/index';
import { removeStoreItem } from '@Utils/Storage';
import { configureUrl, getHeaders } from '@Utils/Helper';
import { AppContextProvider } from '@AppContext/index';
import { NoConnection } from '@SubComponents/index';
import CommonStyle from '@Theme/CommonStyle';
import { STORAGE } from '@Utils/Enums';
import { userLogout } from '@Actions/UserActions';

axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = await getHeaders();
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

const handleInvalidToken = async () => {
  await removeStoreItem(STORAGE.TOKEN);
  ApiConfig.token = null as any;
  store.dispatch(userLogout());
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
