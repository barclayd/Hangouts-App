import {Navigation} from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

// register screens
Navigation.registerComponent("places-app.AuthScreen", () => AuthScreen);
Navigation.registerComponent("places-app.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("places-app.FindPlaceScreen", () => FindPlaceScreen);

// start app

Navigation.startSingleScreenApp({
  screen: {
    screen: "places-app.AuthScreen",
    title: "Login"
  }
});
