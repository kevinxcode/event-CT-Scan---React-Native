import React, { useState, useEffect } from 'react';
import { View,StyleSheet,Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function ListScreen(){
    const [chkCon, setChkCon] = useState('');
    const unsubscribe = useState(
        fetch("https://hrd.citratubindo.com/ldap/api")
        .then((response) => response.json())
        .then((json) => {
            setChkCon('Connection Success')
        })
        .catch((error) => {
          if(error){
             setChkCon('Connection Error')
          }
        })
    )
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
            <Text style={{marginBottom: 15}}>LIST EVENT</Text>
       
        <View style={{ flex: 1, width: '100%', justifyContent: 'center'}}>
          <FlatList
                data={dataList}
                keyExtractor={({ token }, index) => token}
                renderItem={({ item }) => (
                    <ScrollView>
                    <TouchableOpacity  onPress={() => navigation.navigate("Scanner", {paramKey: item.token, paramName: item.title})}>
                    <View style={{marginBottom: 15,width: '100%', height: 60, borderRadius: 15, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}>
                         <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom:3}}>{item.title}</Text>
                         <Text style={{fontSize: 11}}>{item.loc}</Text>
                    </View>
                    </TouchableOpacity>
                    </ScrollView>
               
                )}
            />
        </View>
        <Text style={{marginBottom: 50}}>{chkCon}</Text>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 80
    },
    button: {
        width: '100%', 
        height: 50, 
        backgroundColor: 'blue', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})