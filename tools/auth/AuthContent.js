import { useState, useEffect, useCallback } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AuthForm from "./AuthForm";

function AuthContent({ onAuthenticate }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    username: false,
    password: false,
    confirmUsername: false,
    confirmPassword: false,
  });
  const [fontsLoaded] = useFonts({
    "hoca-bold": require("../../assets/fonts/hoca-bold.ttf"),
    "exo-2": require("../../assets/fonts/exo2-normal.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  function submitHandler(credentials) {
    let { username, password } = credentials;

    username = username.trim();
    password = password.trim();

    const usernameIsValid = username.length > 3;
    const passwordIsValid = password.length > 3;

    if (!usernameIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        username: !usernameIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ username, password });
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.authContent} onLayout={onLayoutRootView}>
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.logoImage}
                source={require("../../assets/images/logo.png")}
              />
            </View>
            <View style={styles.rightSub}>
              <Text style={styles.headerText}>CITRA TUBINDO TBK</Text>
            </View>
          </View>
          
          <ScrollView style={styles.scrollMenu}>
            <View style={styles.titleContent}>
              <Text style={styles.textContent1}>Proceed with your</Text>
              <Text style={styles.textContent2}>LOGIN</Text>
            </View>

            <AuthForm
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AuthContent;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  authContent: {
    marginTop: "4%",
    flex: 1,
    borderRadius: 8,
    backgroundColor: "white",
    padding: "10%",
  },
  buttons: {
    marginTop: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "exo-2",
    color: "#0001C0",
  },
  scrollMenu: {
    paddingTop: deviceHeight < 710 ? 25 : 80,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: deviceWidth < 800 ? 120 : 140,
    height: deviceWidth < 800 ? 55 : 70,
    overflow: "hidden",
    margin: "6%",
  },
  rightSub: {
    justifyContent: "center",
  },
  contentTitle: {
    flex: 1,
    borderWidth: 1,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "15%",
  },
  titleContent: {
    paddingBottom: "10%",
  },
  textContent1: {
    fontFamily: "exo-2",
    fontSize: 20,
    fontWeight: "bold",
  },
  textContent2: {
    fontFamily: "exo-2",
    fontSize: 35,
    fontWeight: "bold",
  },
});
