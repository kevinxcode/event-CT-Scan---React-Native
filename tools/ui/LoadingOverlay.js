import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "white",
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
