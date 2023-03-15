import Config from 'react-native-config';

const productionUrl = Config.API_URL!;

const developmentUrl = Config.API_TEST_URL!;

const ENVIRONMENT = {
  PROD: 'PROD',
  DEV: 'DEV',
};

const currentEnv = ENVIRONMENT.DEV;

const baseUrl =
  (currentEnv === ENVIRONMENT.PROD && productionUrl) || developmentUrl;

const baseUrlApi = `${baseUrl}api/`;

let ApiConfig: {
  baseUrl: string;
  baseUrlApi: string;
  token: null | string;
  login: string;
  user: string;
} = {
  baseUrl,
  baseUrlApi,
  token: null,
  login: `${baseUrlApi}login`,
  user: `${baseUrlApi}users`,
};

export { ApiConfig };
