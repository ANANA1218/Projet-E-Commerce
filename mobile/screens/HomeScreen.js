import * as React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'


const [produits, setProduits] = React.useState({})

let ScreenHeight = Dimensions.get("window").height;

var Styles = StyleSheet.create({height:{height : ScreenHeight }})

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};




export default function HomeScreen() {
  axios({method:"get", url:"https://console.firebase.google.com/u/2/project/projet-e-commerce-temp/database/projet-e-commerce-temp-default-rtdb/data/~2F/produit"})
  .then((response) =>{
    setProduits(response.data)}
  )
   return (
    <ScrollView >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={[Styles.height, { flex:1, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{fontSize:30,fontWeight:'800'}}>AIRNES</Text>
          <Text style={{fontSize:15,fontWeight:'700', color:'#a9a9a9'}}>Boutique de mobilier</Text>
        </View>
        <Text>{JSON.stringify(produits)}</Text>
 
        <Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} />
        <Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} />
        <Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} />
        <Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} />
        <Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} /><Image source={logo} />
        </View>
    </ScrollView>
   );
 }
