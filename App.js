import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore();
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

// register screens
Navigation.registerComponent("places-app.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("places-app.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("places-app.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("places-app.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("places-app.SideDrawer", () => SideDrawer, store, Provider);

// start app

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "places-app.AuthScreen",
    title: "Login"
  }
});
