import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore();
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

// register screens
Navigation.registerComponent("places-app.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("places-app.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("places-app.FindPlaceScreen", () => FindPlaceScreen, store, Provider);

// start app

Navigation.startSingleScreenApp({
  screen: {
    screen: "places-app.AuthScreen",
    title: "Login"
  }
});
