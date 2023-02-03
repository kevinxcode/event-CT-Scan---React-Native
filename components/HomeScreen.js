import React, {useState,useEffect } from 'react';
import {View,Text,StyleSheet,TextInput, Button, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
     const navigation = useNavigation();
     
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
    // async get
    const getData = () => {
        AsyncStorage.getItem(keyAsync).then(JSON.parse).then(value => 
          {  
          if (value == null) {
            alert('No Data List');
          }
          setDataList(value);
        })
      }
    //  end get

    const [isLoading, setLoading] = useState(true);
    const [dataList, setDataList] = useState([]);

    // storage
    useEffect(() => {
        getData();
      }, []);
    // end storage

    const getList = () =>{
        fetch("https://raw.githubusercontent.com/kevinxcode/JSON-Example/main/JsonEventList.json")
        .then((response) => response.json())
        .then((json) => {
            setData(JSON.stringify(json));
            alert('Success');
        })
        .catch((error) => {
          if(error){
              alert('Network Error');
          }
        })
      //   .finally(() => setLoading(false));
    }

    //  const checkApi = () =>{
    //     const greetingToSave = {
    //         title: apiTitle,
    //         api_value: apiText
    //       };
    //       setData(JSON.stringify(greetingToSave));
        
    //       alert('success Please go to dashboard');
    //  }
    return(
        <View style={styles.container}>
            <View></View>
            <Text style={{marginBottom: 15}}>LIST EVENT</Text>
            <TouchableOpacity style={{backgroundColor: 'red', marginBottom: 20,}} onPress={getList}>
                <Text>REFRESH</Text>
            </TouchableOpacity>
            
            <View style={{ flex: 3, width: '100%'}}>
                
            <FlatList
                data={dataList}
                keyExtractor={({ token }, index) => token}
                renderItem={({ item }) => (
                    <View style={{marginBottom: 15,width: '100%', height: 60, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                         <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom:3}}>{item.title}</Text>
                         <Text style={{fontSize: 11}}>{item.loc}</Text>
                    </View>
               
                )}
            />
            </View>
            <View style={{ flex: 1, width: '100%'}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LIST_PAGE")}>
                    <Text>SCAN EVENT HOME</Text>
                </TouchableOpacity>
            </View>
            
            
            {/* <Text>PLEASE INPUT API CODE</Text>
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
            </TouchableOpacity> */}

            

          
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
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