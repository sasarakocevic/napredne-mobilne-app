
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, LogBox } from 'react-native';
LogBox.ignoreLogs(['Timer informacija']);

import PocetnaStranica from './stranice/PocetnaStranica';
import ListaDrzavaStranica from './stranice/ListaDrzavaStranica';
import NovaDrzavaStranica from './stranice/NovaDrzavaStranica';

const Stack = createNativeStackNavigator();

function MojStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
      name='Pocetna' 
      component={PocetnaStranica} 
      options={{title:'Pocetna'}}/>
      <Stack.Screen 
      name='ListaDrzavaStranica' 
      component={ListaDrzavaStranica} 
      options={{title:'Lista Drzava'}}/>
      <Stack.Screen 
      name='NovaDrzavaStranica' 
      component={NovaDrzavaStranica} 
      options={{title:'Nova Drzava'}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MojStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
