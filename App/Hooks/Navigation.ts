import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RouteType, StackNavigation } from '@Routes/AppRoutes';

export const useAppNavigation = () => {
  return useNavigation<StackNavigation>();
};

export const useAppRoute = <T extends keyof RouteType>() => {
  return useRoute<RouteProp<RouteType, T>>();
};
