import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ReferScreen from './screens/Refer';
import DrawerItems from './constants/DrawerItems';


const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <DrawerContent.Navigator 
        drawerType="front"
        initialRouteName="Profile"
        drawerContentOptions={{
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
                  : ReferScreen
            }
          />)
        }
      </DrawerContent.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

