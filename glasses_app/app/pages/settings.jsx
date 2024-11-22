import { StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: 36,
    backgroundColor: "rgb(48, 41, 42)",
  },
  

  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginBottom: 40,

  }
});

export default Settings