import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContent from "../tools/auth/AuthContent";
import LoadingOverlay from "../tools/ui/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";

<<<<<<< HEAD
export default function LoginScreen() {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
=======
export default function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // const navigation = useNavigation();
>>>>>>> f0695c2161b4b6db4dc46d86e6bbd90856b0d37b

  const APIURL = `https://hrd.citratubindo.com/ldap/login/zimbra_native`;
  const authenticate = ({ username, password }) => {
    setIsAuthenticating(true);
    fetch(APIURL, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        if (responseJson.loginCodes == "error") {
          alert(responseJson.details);
        } else {
          const loginArray = username;
          console.log(loginArray);
          setData(loginArray);
<<<<<<< HEAD
          navigation.navigate("LandingPage");
=======
          navigation.replace("HOME");
>>>>>>> f0695c2161b4b6db4dc46d86e6bbd90856b0d37b
        }
        setIsAuthenticating(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [value, setValue] = useState();
  const asyncKey = "userData";

<<<<<<< HEAD
  const getData = () => {
    try {
      AsyncStorage.getItem(asyncKey).then((value) => {
        if (value != null) {
          navigation.replace("HOME");
        }else{
          navigation.replace("Login");
        }
        setValue(value);
      });
    } catch (error) {
      console.log(err);
      navigation.navigate("Login");
=======
  const backAction = () => {
    if (value != null) {
      navigation.replace("HOME");
    } else {
>>>>>>> f0695c2161b4b6db4dc46d86e6bbd90856b0d37b
    }
    return true;
  };

  const setData = async (dataJson) => {
    try {
      AsyncStorage.setItem(asyncKey, dataJson);
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent onAuthenticate={authenticate} />;
}