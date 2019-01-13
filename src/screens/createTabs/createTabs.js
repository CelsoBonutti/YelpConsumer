import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import SearchScreen from '../Search/SearchScreen'
import HistoryScreen from '../History/HistoryScreen'

getIconOS = () => {
    if (Platform.OS == "android")
        return "md";
    if (Platform.OS == "ios")
        return "ios";
}

const TabNavigator = createBottomTabNavigator(
    {
        Search: SearchScreen,
        History: HistoryScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;

                switch(routeName){
                    case ('Search'):
                        iconName = `${getIconOS()}-search`
                        break;
                    case ('History'):
                        iconName = `${getIconOS()}-time`
                        break;
                }
                return <Icon name={iconName} size={25} color={tintColor}/>
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: '#555',
            
        },
    }
)

export default createAppContainer(TabNavigator);