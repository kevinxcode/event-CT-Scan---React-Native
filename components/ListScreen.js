import React, { useState, useEffect } from 'react';
import { View,StyleSheet,Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function ListScreen(){
    const navigation = useNavigation();
    const [value, setValue] = useState([]);
    const keyAsync = 'listData'; // name async
    useEffect(() => {
        getData();
      }, []);
    const getData = () => {
        AsyncStorage.getItem(keyAsync).then(JSON.parse).then(value => 
          {  
          setValue(value);
        })
      }
    return(
        <View style={styles.container}>
           <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Scanner", {paramKey: value.api_value})}>
            <Text style={{fontWeight: 'bold'}}>{value.title}</Text>
           </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    button: {
        width: '100%', 
        height: 50, 
        backgroundColor: 'blue', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})