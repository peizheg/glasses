import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
		<TouchableOpacity onPress={print("test")} style={styles.headerIcon}>
		  <Feather name='bluetooth' style={styles.featherButton}/>
		</TouchableOpacity>
      </View>
      <View style={{backgroundColor: "orange", flexGrow: 1}}>
		<Text>test</Text>
      </View>
      <View style={{...styles.buttonBox, flexDirection: "row"}}>
		<TouchableOpacity style={styles.footerIcon}>
		  <Text>text 1</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.footerIcon}>
		  <Text>text 2</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.footerIcon}>
		  <Text>text 2</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.footerIcon}>
		  <Text>text 2</Text>
		</TouchableOpacity>
	  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    backgroundColor: "rgb(48, 41, 42)",
    flexGrow: 1,
  },
  buttonBox: {
	backgroundColor: "red",
	height: 75,
	alignItems: "flex-end",
	minWidth: '97%',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  headerIcon: {
	padding: 3,
	margin: 3,
	alignItems: "center",
	justifyContent: "center",
	borderRadius: 100,
	borderColor: "dimgrey",
	borderWidth: 3,
	backgroundColor: "darkgrey",
	height: 65,
	width: 65,
  },
  featherButton: {
	fontSize: 25,
  },
  footerIcon: {
	flexGrow: 1,
	flexShrink: 1,
	padding: 4,
	margin: 4,
	alignItems: "center",
	justifyContent: "center",
	height: 65,
	borderWidth: 3,
	borderRadius: 5,
	borderColor: "dimgrey",
	backgroundColor: "darkgrey",
  },
});
