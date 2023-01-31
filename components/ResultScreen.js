import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function ResultScreen({route}){
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataTitle, setDataTitle] = useState([]);
    console.log(data);
    const dataKey = route.params.paramKey;
    const dataCode = route.params.paramCode;
    const dataUrl = `https://hrd.citratubindo.com/hr_program/event/app/apiQR?link_code=${dataKey}&&qr_scan=${dataCode}`;

    useEffect(() => {
        console.log(dataUrl)
        fetch(dataUrl)
          .then((response) => response.json())
          .then((json) => {
            if(json.msgCode=='success'){
                setData(json.details)
                setLoading(true)
            }else{
                setLoading(false)
            }
            setDataTitle(json)
          })
          .catch((error) => {
            if(error){
                alert('Network Error');
            }
          })
        //   .finally(() => setLoading(false));
      }, []);

    const Spinner = () => (
        <View style={styles.activityContainer}>
          <Text>Loading..</Text>
          <ActivityIndicator size="large" color={'#5040ff'} />
        </View>
    );

    return(
      <View style={styles.container}  renderLoading={Spinner}>

        <View style={{width: '100%', borderBottomWidth: 2, height: 50, marginBottom: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
             <Text style={{fontWeight: 'bold', fontSize: 18}} >{dataTitle.msgCode}</Text>
        </View>
         
        {isLoading ? (
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                 <Text >{data.nik} - {data.name}</Text>
                 <Text >{data.tanggal} - {data.waktu}</Text>
            </View>
           
        ) : (
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red'}}>{dataTitle.msgCode}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Scanner", {paramKey: dataKey})} style={styles.button}>
            <Text> SCAN AGAIN</Text>
        </TouchableOpacity>


      </View>  
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'red', 
        borderRadius: 15, 
        marginTop: 100, 
        width: '100%', 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center'}
})