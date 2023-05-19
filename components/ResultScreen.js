import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResultScreen({ route }) {
  const [chkCon, setChkCon] = useState("");
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataTitle, setDataTitle] = useState([]);
  // console.log(data);
  const dataKey = route.params.paramKey;
  const dataCode = route.params.paramCode;
  const dataUrl = `https://hrd.citratubindo.com/hr_program/event/app/apiQR?link_code=${dataKey}&&qr_scan=${dataCode}`;

  useEffect(() => {
    parseScan();
  }, []);
  const refreshIntervalId = setInterval(() => {
    // console.log('result')
    navigation.navigate("Scanner", {
      paramKey: dataKey,
      paramName: route.params.paramName,
    });
    clearInterval(refreshIntervalId);
  }, 5500);

  const stopInterval = () => {
    clearInterval(refreshIntervalId);
  };

  const parseScan = () => {
    // console.log(dataUrl)
    fetch(dataUrl)
      .then((response) => response.json())
      .then((json) => {
        if (json.msgCode == "success") {
          setData(json.details);
          setLoading(true);
          setChkCon("");
        } else {
          setLoading(false);
          setChkCon("Network Error");
        }
        setDataTitle(json);
      })
      .catch((error) => {
        if (error) {
          // alert('Network Error');
          setChkCon("Network Error");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 15 }}>{route.params.paramName}</Text>

      <View
        style={{
          width: "100%",
          borderBottomWidth: 2,
          height: 50,
          marginBottom: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {dataTitle.msgCode}
        </Text>
      </View>

      {isLoading ? (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            {data.nik} - {data.name}
          </Text>
          <Text>
            {data.tanggal} - {data.waktu}
          </Text>
        </View>
      ) : (
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "red" }}>
          {dataTitle.msgCode}
        </Text>
      )}

      <Text style={{ marginTop: 10 }}>{chkCon}</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Scanner", {
            paramKey: dataKey,
            paramName: route.params.paramName,
          })
        }
        style={styles.button}
      >
        <Text style={{ color: "#fff" }}> SCAN AGAIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={stopInterval}
        style={{ backgroundColor: "#fff", marginTop: 18 }}
      >
        <Text>you will automatically redirect 5 Second</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 15,
    marginTop: 100,
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
