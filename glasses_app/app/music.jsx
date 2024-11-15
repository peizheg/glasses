import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const Music = ({ setCurrentPage }) => {

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
		<TouchableOpacity onPress={() => console.log("test")} style={styles.bluetooth}>
		  <Feather name='bluetooth' style={styles.featherButton}/>
		</TouchableOpacity>
      </View>
      <View>
		<Text style={styles.title}>Music Page</Text>
		<TouchableOpacity onPress={() => console.log("test")} style={styles.connectButton}>
		  <Text style={styles.connectLabel}>Connect Now!</Text>
		</TouchableOpacity>
      </View>
      <View style={{...styles.buttonBox, flexDirection: "row"}}>
		<TouchableOpacity style={styles.footerIcon} onPress={() => setCurrentPage('home')}>
			<Feather name='home' style={styles.featherButton}/>
		</TouchableOpacity>
		<TouchableOpacity style={styles.footerIcon} onPress={() => setCurrentPage('music')}>
			<Feather name='music' style={styles.featherButton}/>
		</TouchableOpacity>
		<TouchableOpacity style={styles.footerIcon} onPress={() => setCurrentPage('music')}>
			<Feather name='rotate-ccw' style={styles.featherButton}/>
		</TouchableOpacity>
		<TouchableOpacity style={styles.footerIcon} onPress={() => setCurrentPage('music')}>
			<Feather name='settings' style={styles.featherButton}/>
		</TouchableOpacity>
	  </View>
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
	marginBottom: 40,
  },

  connectButton: {
	width: 200,
	height: 40,
	backgroundColor: "white",
    color: "#38434D",
	marginHorizontal: "auto",
	marginBottom: 100,
  },

  connectLabel: {
	fontSize: 20,
	margin: "auto"
  },

  footerIcon: {
	flexGrow: 1,
	alignItems: "center",
	justifyContent: "center",
	height: 65,
	borderWidth: 3,
	borderRadius: 5,
	borderColor: "dimgrey",
	backgroundColor: "darkgrey",
  },
});

export default Music