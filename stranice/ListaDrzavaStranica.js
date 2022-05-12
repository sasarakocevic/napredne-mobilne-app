
import React, { useEffect, useState } from 'react'
import { ScrollView, Button, Alert } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';

const ListaDrzavaStranica = (props) => {

    const [drzave, setDrzave] = useState([]);

    const getDrzave = async () => {
        axios.get('http://192.168.100.66:8000/api/drzava')
            .then((response)=>{
                const drzave = [];
                response.data.forEach((res) => {
                    drzave.push({
                        id: res.id,
                        naziv: res.naziv
                    })
                });
                setDrzave(drzave);
            })
    }

    const pobrisiDrazavu = async (drzava) => {
        console.log('http://192.168.100.66:8000/api/drzava/'+drzava.id);
        axios.delete('http://192.168.100.66:8000/api/drzava/'+drzava.id)
            .then((response)=>{
                Alert.alert(
                    "Uspjesno ste pobrisali drzavu");
            })
    }
    

    useEffect(() => {
        getDrzave()
      },[])

    const otvoriPopup = (drzava) => {
        console.log("##### drzava");
        console.log(drzava);

        Alert.alert(
            "Obrisi drzavu "+drzava.naziv,
            "Da li ste sigurni?",
            [
              { text: "Yes", onPress: () => pobrisiDrazavu(drzava) },
              { text: "No", onPress: () => console.log("canceled") },
            ],
            {
              cancelable: true,
            }
          );
        //     [
        //         {text: "Da" , onPress:()=> pobisiDrzavu(drzava)},
        //         {text: "Ne", onPress: () => console.log("zatvori")},
        //     ],
        //     {
        //         cancelable: true,
        //     }
        // );
    }

    return (
        <ScrollView>
        <ListItem>
        <Button title='Nova Drzava' onPress={() => props.navigation.navigate('NovaDrzavaStranica')}></Button>
        </ListItem>
        {drzave.map((drzava) => {
          return(
            <ListItem
            key={drzava.id}>
              <ListItem.Content>
                <ListItem.Title>{drzava.naziv}</ListItem.Title>
              </ListItem.Content>
              <Avatar source={{uri:"https://images.all-free-download.com/images/graphiclarge/trash_alt_sign_icon_flat_contrast_black_white_sketch_6921872.jpg"}} 
              onPress={()=> otvoriPopup(drzava)}></Avatar>
            </ListItem>
          )
        })}
      </ScrollView>
    )
}

export default ListaDrzavaStranica