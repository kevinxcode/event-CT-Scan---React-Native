import React, {useState,useEffect } from 'react';
import {View,Text,StyleSheet,TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
     const navigation = useNavigation();
     const [apiTitle, setApiTitle] = useState('');
     const [apiText, setApiText] = useState('');

    //  asyn storage
     const keyAsync = 'listData'; // name async
     const setData = async jsonValue => {
        try {
            await AsyncStorage.setItem(keyAsync, jsonValue);
            // navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }
    // end stograe

     const checkApi = () =>{
        const greetingToSave = {
            title: apiTitle,
            api_value: apiText
          };
          setData(JSON.stringify(greetingToSave));
        
          alert('success Please go to dashboard');
     }
    return(
        <View style={styles.container}>
            <Text>PLEASE INPUT API CODE</Text>
            <TextInput 
                onChangeText={(apiTitle) => setApiTitle(apiTitle)} 
                value={apiTitle}  
                style={styles.textInput} 
                placeholder={'Title'} />

            <TextInput 
                onChangeText={(apiText) => setApiText(apiText)} 
                value={apiText}  
                style={styles.textInput} 
                placeholder={'Api Code'} />
           
            <TouchableOpacity style={styles.button} onPress={checkApi}>
                <Text>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LIST_PAGE")}>
                <Text>GO TO LIST</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    textInput:{
        width: '100%',
        height: 44,
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
    },
    button: {
        margin: 10,
        width: '100%', 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'blue'
    }
})