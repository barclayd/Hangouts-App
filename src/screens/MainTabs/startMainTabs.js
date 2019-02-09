import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-map", 30),
        Icon.getImageSource("ios-people", 30)
    ])
        .then(sources => {
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        screen: "places-app.FindPlaceScreen",
                        label: "Find Place",
                        title: "Find Place",
                        icon: sources[0]
                    },
                    {
                        screen: "places-app.SharePlaceScreen",
                        label: "Share Place",
                        title: "Share Place",
                        icon: sources[1]
                    }
                ]
            });
        });
};




export default startTabs;


