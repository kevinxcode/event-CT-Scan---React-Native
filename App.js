import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ListScreen from "./components/ListScreen";
import ScanScreen from "./components/Scanner";
import ResultScreen from "./components/ResultScreen";
import AnimatedSplash from "react-native-animated-splash-screen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const asyncKey = "userData";
  const [value, setValue] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const getData = () => {
    try {
      AsyncStorage.getItem(asyncKey).then((value) => {
        if (value != null) {
          setLoggedIn(true);
        }
        setValue(value);
      });
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      getData();
    }, 1800);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require("./assets/pics.png")}
      backgroundColor={"#0001c0"}
      logoHeight={600}
      logoWidth={300}
    >
      <NavigationContainer style={styles.rootScreen}>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#025ef2" },
            headerLeft: null,
            headerBackButtonMenuEnabled: {
              onChangeText: (event) => setSearch(event.nativeEvent.text),
            },
          }}
        >
          {loggedIn ? (
            <Stack.Screen
              name="Authenticated"
              component={HomeScreen}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={LoginScreen}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />
          )}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="HOME"
            component={HomeScreen}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="LIST_PAGE"
            component={ListScreen}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Scanner"
            component={ScanScreen}
            options={{
              title: "Scan Activity",
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="RESULT"
            component={ResultScreen}
            options={{
              title: "Result",
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: "white",
  },
});
