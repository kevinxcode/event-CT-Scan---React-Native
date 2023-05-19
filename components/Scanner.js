import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState("back");
  const [scanned, setScanned] = useState(false);
  const apiCode = route.params.paramKey;
  const titleName = route.params.paramName;

  const keyAsync = "listCam"; // name async

  useEffect(() => {
    getData();
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(keyAsync);
      if (value == null) {
        setCameraType("back");
      } else {
        setCameraType(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(keyAsync, value);
    } catch (e) {
      // saving error
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // console.log(data);
    navigation.replace("RESULT", {
      paramCode: data,
      paramKey: apiCode,
      paramName: titleName,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const frontCamera = () => {
    storeData("front");
    setCameraType("front");
  };

  const backCamera = () => {
    storeData("back");
    setCameraType("back");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          width: "100%",
          marginTop: 10,
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{route.params.paramName}</Text>
      </View>

      <BarCodeScanner
        type={cameraType}
        flashMode={"on"}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.container]}
      >
        <View style={styles.layerTop}>
          <View
            style={{
              width: "80%",
              height: 30,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={frontCamera}
              style={{
                height: 30,
                marginHorizontal: 5,
                backgroundColor: "blue",
              }}
            >
              <Text style={{ color: "#fff" }}>FRONT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={backCamera}
              style={{
                height: 30,
                marginHorizontal: 5,
                backgroundColor: "blue",
              }}
            >
              <Text style={{ color: "#fff" }}>BACK</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{width: '20%', height: 30, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginHorizontal: 5, backgroundColor: 'grey'}}>
              <Text>LIGHT</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("LIST_PAGE")}
          style={{
            height: 40,
            marginBottom: 8,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>BACK TO DASHBOARD</Text>
        </TouchableOpacity>
      </BarCodeScanner>
    </View>
  );
}
const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  layerTop: {
    flex: 2,
    padding: 8,
    flexDirection: "row",
    width: "100%",
  },
});
