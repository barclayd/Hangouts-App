import {Navigation} from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';

// register screens
Navigation.registerComponent("places-app.AuthScreen", () => AuthScreen);

// start app

Navigation.startSingleScreenApp({
  screen: {
    screen: "places-app.AuthScreen",
    title: "Login"
  }
});
