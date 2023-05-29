import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState();
  const asyncKey = "userData";
  //  asyn storage
  const keyAsync = "listData"; // name async
  const setData = async (jsonValue) => {
    try {
      await AsyncStorage.setItem(keyAsync, jsonValue);
      // navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  // end storage

  // async get
  const getData = () => {
    AsyncStorage.getItem(keyAsync)
      .then(JSON.parse)
      .then((value) => {
        if (value == null) {
          alert("No Data List");
        }
        setDataList(value);
      });
    AsyncStorage.getItem(asyncKey).then((value2) => {
      if (value2 == null) {
        alert("User not found");
      }
      setUsername(value2);
    });
  };
  //  end get
  // remove
  const removeList = async () => {
    try {
      await AsyncStorage.removeItem(keyAsync);
      navigation.replace("HOME");
    } catch (error) {
      console.log(error);
    }
  };
  // remove

  //signout
  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      console.log("cleared");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };
  //signout

  const [dataList, setDataList] = useState([]);

  // storage
  useEffect(() => {
    getData();
  }, []);
  // end storage

  const getList = () => {
    // fetch("https://hrd.citratubindo.com/hr_program/event/app/apiList")
    fetch(
      `https://hrd.citratubindo.com/hr_program/event/api/event_list?nik=${username}`
    )
      .then((response) => response.json())
      .then((json) => {
        setData(JSON.stringify(json));
        // alert('Success');
      })
      .catch((error) => {
        if (error) {
          alert("Network Error");
        }
      });
    //   .finally(() => setLoading(false));
    getData();
    //   navigation.replace('HOME');
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 15 }}>LIST EVENT</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ backgroundColor: "blue", marginBottom: 20, marginRight: 80 }}
          onPress={getList}
        >
          <Text style={{ color: "#fff" }}>REFRESH</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "red", marginBottom: 20 }}
          onPress={removeList}
        >
          <Text style={{ color: "#fff" }}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 3, width: "100%" }}>
        <SafeAreaView>
          <FlatList
            data={dataList}
            keyExtractor={({ token }, index) => token}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 15,
                  width: "100%",
                  height: 60,
                  borderRadius: 15,
                  borderColor: "blue",
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginBottom: 3,
                    color: "black",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 11, color: "black" }}>{item.loc}</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LIST_PAGE")}
        >
          <Text style={{ color: "#fff" }}>SCAN EVENT HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={{ color: "#fff" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    padding: 15,
  },
  textInput: {
    width: "100%",
    height: 44,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  button: {
    marginTop: 10,
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
