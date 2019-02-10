import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-mapPicker", 30),
        Icon.getImageSource("ios-people", 30),
        Icon.getImageSource("ios-menu", 30)
    ])
        .then(sources => {
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        screen: "places-app.FindPlaceScreen",
                        label: "Find Place",
                        title: "Find Place",
                        icon: sources[0],
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    icon: sources[2],
                                    title: "Menu",
                                    id: "sideDrawerToggle"
                                }
                            ]
                        }
                    },
                    {
                        screen: "places-app.SharePlaceScreen",
                        label: "Share Place",
                        title: "Share Place",
                        icon: sources[1],
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    icon: sources[2],
                                    title: "Menu",
                                    id: "sideDrawerToggle"
                                }
                            ]
                        }
                    }
                ],
                drawer: {
                    left: {
                        screen: "places-app.SideDrawer"
                    }
                }
            });
        });
};




export default startTabs;


