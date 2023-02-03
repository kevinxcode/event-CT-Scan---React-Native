import React, { useState, useEffect } from 'react';
import { View,StyleSheet,Text, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function ListScreen(){
    const navigation = useNavigation();
    const [dataList, setDataList] = useState([]);
    const keyAsync = 'listData'; // name async
    useEffect(() => {
        getData();
      }, []);
      
      const getData = () => {
        AsyncStorage.getItem(keyAsync).then(JSON.parse).then(value => 
          {  
          if (value == null) {
              alert('No Data List');
              navigation.replace("HOME");
          }
          setDataList(value);
        })
      }
    return(
        <View style={styles.container}>
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