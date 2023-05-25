import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContent from "../tools/auth/AuthContent";
import LoadingOverlay from "../tools/ui/LoadingOverlay";

export default function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
          navigation.navigate("LandingPage");
        }
        setIsAuthenticating(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [value, setValue] = useState();
  const asyncKey = "userData";
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem(asyncKey).then((value) => {
        if (value != null) {
          navigation.navigate("LandingPage");
        }
        setValue(value);
      });
    } catch (error) {
      console.log(err);
      navigation.navigate("Login");
    }
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
