import { Text, StyleSheet } from "react-native";
import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function TitleText({ children }) {
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

  if (!fontsLoaded) {
    return null;
  }
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontFamily: "exo-2",
    fontWeight: "bold",
    color: "#ffffff",
  },
});
