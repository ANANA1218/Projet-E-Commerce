import * as React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'



let ScreenHeight = Dimensions.get("window").height;

var Styles = StyleSheet.create({height:{height : ScreenHeight }})

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};




export default function HomeScreen() {

  const [produits, setProduits] = React.useState([])
  const [a, seta] = React.useState("nan")

  React.useEffect(() => {
    // fetch('https://projet-e-commerce-temp-default-rtdb.europe-west1.firebasedatabase.app/Produit.json') // Remplacez l'URL par l'URL réelle de votre API
    //   // .then(response => response.json())
    //   .then(Response => {
    //     setProduits(Response.data); // Mettre à jour l'état avec les articles récupérés depuis l'API
    //     seta("LALALALALALAL")
    //     var b = "B"
    //   })
    //   .catch(error => {
    //     console.error('Erreur lors de la récupération des articles depuis l\'API:', error);
    //   });


        axios({method:"get", url:"https://projet-e-commerce-temp-default-rtdb.europe-west1.firebasedatabase.app/Produit.json"})
        .then(({data}) => {
          const resultat = []
          for(const key in data) {
              (data[key]) && resultat.push({...data[key], id : key})
          }
          setProduits(resultat)
      }
        )
  }, []);

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
        <View>
      <Text>Liste des produit{a}{typeof(produits)}</Text>

        {produits.map((produit) => {
          return   <Text key={produit.nom_produit}>{produit.nom_produit}</Text>
        })}

    </View>
    </ScrollView>
   );
 }
