import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import SearchScreen from '../Search/SearchScreen'
import HistoryScreen from '../History/HistoryScreen'
import DetailScreen from '../Detail/DetailScreen'

getIconOS = () => {
  if (Platform.OS == "android")
    return "md";
  if (Platform.OS == "ios")
    return "ios";
}


const TabNavigator = createBottomTabNavigator(
  {
    Search: { screen: SearchScreen, navigationOptions: { title: 'Busca' }},
    History: { screen: HistoryScreen, navigationOptions: { title: 'Histórico' }}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case ('Search'):
            iconName = `${getIconOS()}-search`
            break;
          case ('History'):
            iconName = `${getIconOS()}-time`
            break;
        }
        return <Icon name={iconName} size={25} color={tintColor} />
      }, 
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: '#555',
    },
  }
)

const RootStack = createStackNavigator(
  {
    Home: { screen: TabNavigator, navigationOptions: { header:null }},
    Details: { screen: DetailScreen, navigationOptions: { headerTransparent: true }}
  },
  {
    initialRouteName: 'Home',
  }
)

export default createAppContainer(RootStack);