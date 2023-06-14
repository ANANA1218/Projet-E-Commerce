import * as React from 'react';

import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsRefer';
import HomeScreen from './screens/HomeScreen';
import DrawerItems from './constants/DrawerItems';

import {  StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';




const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerType="front"
        initialRouteName="Home"
        screenOptions={{
          activeTintColor:'#e91e63',
          itemStyle:{ marginVertical: 10}
        }}
      >
        {
          DrawerItems.map(drawer => <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
            drawerIcon:({focused})=>
             drawer.iconType==='Material' ?
 <MaterialCommunityIcons
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
              />
            :
            drawer.iconType==='Feather' ?
 <Feather
                name={drawer.iconName}
                size={24}
                color={focused ? "#e91e63" : "black"}
              />
            :
 <FontAwesome5
                name={drawer.iconName}
                size={24}
                color={focused ? "#e91e63" : "black"}
              />}}
            component={
              drawer.name==='Profile' ? ProfileScreen
                : drawer.name==='Settings' ? SettingsScreen
                  : HomeScreen
            }
          />)
        }
      </Drawer.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});