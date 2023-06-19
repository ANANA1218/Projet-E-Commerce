import * as React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'

import ProduitCard from './ProduitCard';



let ScreenHeight = Dimensions.get("window").height;

var Styles = StyleSheet.create({
  height:{height : ScreenHeight }, 
  card:{ flexDirection:'column', flex:3, backgroundColor: 'white', borderWidth: 1, margin:10, borderRadius:7 }
})

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
        .catch((err) => {
          console.log(err);
        });
  }, []);

   return (
    <ScrollView >
      {/* View HEADER */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={[Styles.height, { flex:1, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{fontSize:30,fontWeight:'800'}}>AIRNES</Text>
          <Text style={{fontSize:15,fontWeight:'700', color:'#a9a9a9'}}>Boutique de mobilier</Text>
        </View>
      </View>

      {/* View titre */}
      <View >
        <Text style={{fontSize:25,fontWeight:'400', margin:10}}>Liste des produit : </Text>
      </View>
      <View>
        {produits.map((produit) => {
          return(
            <View>
            {/* //Home made Card */}
            <View key={produit.nom_produit} style={Styles.card}>
              <Image style={[Styles.card, {height: 300, flex: 1, width: null}]} source={{uri:produit.img}}/>
              <View style={{alignItems: 'center', justifyContent: 'center', padding:5}}>
                <Text style={{fontSize:30,fontWeight:'700', margin:10}}>{produit.nom_produit}</Text>
                <Text style={{fontSize:15,fontWeight:'300', color:'black'}}>{produit.description}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={{fontSize:20,fontWeight:'500', margin:15, padding:6,borderRadius:6, backgroundColor:'#f5f5f5'}}>{produit.prix} €</Text>
              </View>
            </View>

            <ProduitCard key={produit.id} produit={produit} />
</View>
          )          
        })}
      </View>

    </ScrollView>
   );
 }
