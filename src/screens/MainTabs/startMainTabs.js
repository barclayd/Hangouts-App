import { Navigation } from 'react-native-navigation';

const startTabs = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: "places-app.FindPlaceScreen",
                label: "Find Place",
                title: "Find Place"
            },
            {
                screen: "places-app.SharePlaceScreen",
                label: "Share Place",
                title: "Share Place"
            }
        ]
    });
};

export default startTabs;


