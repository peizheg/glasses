import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const History = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <TouchableOpacity onPress={() => console.log("test")} style={styles.bluetooth}>
          <Feather name='bluetooth' style={styles.featherButton}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
	height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 36,
    backgroundColor: "rgb(48, 41, 42)"
  },

  buttonBox: {
	height: 75,
	alignItems: "flex-end",
	minWidth: '97%',
  },

  bluetooth: {
	padding: 3,
	margin: 3,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: 100,
	backgroundColor: "#3587A4",
	height: 65,
	width: 65,
  },

  featherButton: {
	fontSize: 25,
  },

  main: {
    flexGrow: 1,
	display: "flex",
    justifyContent: "center",
    maxWidth: "90%",
	borderWidth: 2,
	borderColor: "orange",
    marginHorizontal: "auto",
  },

  title: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
    marginBottom: 500,
  },
});

export default History