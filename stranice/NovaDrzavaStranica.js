import axios from 'axios';
import React, {useState} from 'react'
import { ScrollView, View, TextInput, StyleSheet, Button, Alert } from 'react-native'

export default function NovaDrzavaStranica(props) {

    const [inputState, setInputState] = useState({
        naziv: ""
    })

    const sacuvajDrzavu = async () => {
        if(inputState.naziv === ''){
            Alert.alert('Morate popuniti naziv');
        }else{
            try{
                console.log(inputState.naziv);
                axios.post('http://192.168.100.66:8000/api/drzava',{naziv:inputState.naziv})
                    .then((response) =>(
                        props.navigation.navigate('ListaDrzavaStranica')
                    ))
            }catch(error){
                console.log(error);
            }
        }
    }

    const promjenaNaziva = (name, value) => {
        setInputState({...inputState, [name]:value})
    }


  return (
    <ScrollView style={styles.container}>
        <View style={styles.inputGrupa}>
            <TextInput pleaceholder="Naziv drzave" onChangeText={(value) => promjenaNaziva('naziv',value)}/>
        </View>
        <View>
            <Button title='Sacuvaj Drzavu' onPress={ () => sacuvajDrzavu()}></Button>
        </View>
        <View>
        <Button title='Vrati se na Listu Drzava' onPress={()=> props.navigation.navigate('ListaDrzavaStranica')}></Button>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35
    },
    inputGrupa: {
        flex: 1,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc"
    }
  });