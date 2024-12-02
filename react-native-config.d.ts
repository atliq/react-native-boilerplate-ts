import { ENVIRONMENT } from '@ApiConfig';

declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    API_TEST_URL: string;
    STORAGE_ID: string;
    STORAGE_KEY: string;
    ENVIRONMENT: ENVIRONMENT;
  }

  export const Config: NativeConfig;
  export default Config;
}
