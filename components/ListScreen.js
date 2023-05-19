import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ListScreen() {
  const [chkCon, setChkCon] = useState("");
  const [username, setUsername] = useState();
  //   loader
  const [loaderVisible, setLoaderVisible] = useState(false);
  const ActivityIndicatorElement = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color={"#5040ff"} />
    </View>
  );
  //  end loader
  //  check connection
  const dataURL = "https://hrd.citratubindo.com/ldap/api";
  // const dataURL = `https://hrd.citratubindo.com/hr_program/event/api/event_list?nik=${nik}`;

  // const dataURL = "https://raw.githubusercontent.com/kevinxcode/JSON-Example/main/jsonPing.json";
  useState(
    fetch(dataURL)
      .then((response) => response.json())
      .then((json) => {
        if (json.msg == "ok") {
          setLoaderVisible(false);
          setChkCon("Connection Success");
        } else {
          setLoaderVisible(true);
          setChkCon("Connection Error");
        }
      })
      .catch((error) => {
        if (error) {
          setChkCon("Connection Error");
          setLoaderVisible(true);
        }
      })
  );
  // end check connection
  const navigation = useNavigation();
  const [dataList, setDataList] = useState([]);
  const keyAsync = "listData"; // name async
  const asyncKey = "userData";
  useEffect(() => {
    getData();
  }, []);

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
        alert("No Data Listss");
      }
      setUsername(value2);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 15 }}>LIST EVENT</Text>
      <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
        <FlatList
          data={dataList}
          keyExtractor={({ token }, index) => token}
          renderItem={({ item }) => (
            <ScrollView>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Scanner", {
                    paramKey: item.token,
                    paramName: item.title,
                  })
                }
              >
                <View
                  style={{
                    marginBottom: 15,
                    width: "100%",
                    height: 60,
                    borderRadius: 15,
                    backgroundColor: "blue",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginBottom: 3,
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#fff" }}>
                    {item.loc}
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          )}
        />
      </View>
      {loaderVisible ? <ActivityIndicatorElement /> : null}
      <Text style={{ marginBottom: 50 }}>{chkCon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 80,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
