import * as React from 'react';
import { View, Text, Image, Stylesheet } from "react-native";
import axios from 'axios';
import Styles from '../assets/Style';


export default function SingleScreen(props) {
    const { idProduit } = props.route.params;
    const [ produit, setProduit ] = React.useState([])
    // TODO : get produit

    React.useEffect(() => {    1
    
        if (idProduit) {
            axios({method:"get", url:`https://projet-e-commerce-temp-default-rtdb.europe-west1.firebasedatabase.app/Produit/${idProduit}.json`})
            .then(({data}) => {
                
                setProduit(data)
            //   const resultat = []
            //   for(const key in data) {
            //       (data[key]) && resultat.push({...data[key], id : key})
            //   }
            //   setProduits(resultat)
          }
            )
            .catch((err) => {
              console.log(err);
            });
        }
            
      }, []);
      const { img, nom_produit, description, prix } = produit;

    return (
        // <View >
        //     <View style={{flexDirection:'column', backgroundColor:'#555555'}}>
        //         <Text style={{fontSize:30,fontWeight:'700', margin:10}}>{produit.nom_produit}</Text>
        //         <Image 
        //             style={{ flex:1, borderTopLeftRadius:7, borderTopRightRadius:7, height: 300, flex: 1, width: null}}
        //             source={{uri:produit.img}}
        //             onError={() => console.log("Erreur de chargement de l'image")}
        //             />
        //     </View>
        // </View>
      <View style={Styles.container}>
        <Text style={Styles.title}>{nom_produit}</Text>
        <Image source={{ uri: img }} style={Styles.image} />
        
        <Text style={Styles.description}>{description}</Text>
        <Text style={Styles.price}>{prix} €</Text>
      </View>
    );
}