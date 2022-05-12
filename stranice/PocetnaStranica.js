import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import axios from 'axios'
import { ListItem } from 'react-native-elements';
// import laravel from './api/laravel';

export default function PocetnaStranica(props) {
  let [klik, setKlik] = useState(0);
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const [rezervacije, setRezervacije] = useState([]);
  let odgovor;
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  let klikDugmeta = () => {
    setKlik(klik +1);
    console.log("Brojac ->"+klik);
  }
  
  const zahtjev = async () => {

    console.log("################# prije zahtjeva");
    axios.get('http://192.168.100.66:8000/api/rezervacija')
      .then((response)=>{
        const rezervacije = [];
        response.data.forEach((rez) => {
          rezervacije.push({
            id: rez.id,
            datum_do: rez.datum_do,
            datum_od: rez.datum_od,
            kontakt: rez.kontakt,
            soba_id: rez.soba_id
          })
        });
        console.log('Rezervacije ucitane');
        setRezervacije(rezervacije);
      })
      .catch((error) => {
        console.log('Error Prinr: ' + error)
      })
    console.log("################# nakon zahtjeva");
    // console.log(results);
  }
  // zahtjev()

  useEffect(() => {
    zahtjev()
  },[])

  return (
    // <View style={styles.container}> 
    // <View style={styles.navbar}>
    //   <Navbar style={styles.navbar}></Navbar>
    // </View>
    // <View style={styles.content}>
    // <FlatList
    //     data={DATA}
    //     renderItem={({ item }) => (
    //       <Text style={styles.item}> {item.title}</Text>
    //     )}
    //     keyExtractor={item => item.id}
    //   />
    //   <Text>Hello world!</Text>
    //   <Button title="Klikne me" onPress={klikDugmeta}></Button>
    //   <Text>{klik}</Text>
    // </View>
    // </View>
    <ScrollView style={styles.dodajVisinu}>
      <ListItem>
      <Button title='Nova Rezevacija'></Button>
      <Button title='Lista Drzava' onPress={() => props.navigation.navigate('ListaDrzavaStranica')}></Button>
      </ListItem>
      {rezervacije.map((rezervacija) => {
        return(
          <ListItem
          key={rezervacija.id}>
            <ListItem.Content>
              <ListItem.Title>#{rezervacija.id} - {rezervacija.kontakt}</ListItem.Title>
              <ListItem.Subtitle>Datum od: {rezervacija.datum_od}</ListItem.Subtitle>
              <ListItem.Subtitle>Datum do: {rezervacija.datum_do}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dodajVisinu: {
    top: 30
  },
  content: {
    alignItems: 'center',
  },
  navbar: {
    position:'absolute',
    top:50,
    backgroundColor: '#ccc',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  }
});
