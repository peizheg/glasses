import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const Home = ({ setCurrentPage }) => {
  [connectedDevice, setConnectedDevice] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={{...styles.title, fontFamily: "Didot", paddingTop: 25,}}>GLASSES</Text>
      <View>
        {
          connectedDevice ? (
            (connectedDevice.name ? (
              <>
                <Text style={styles.connectMessage}>Connected to: {"\n" + connectedDevice.name}</Text>
                <View style={styles.connectedbuttons}>
                  <TouchableOpacity style={styles.connectedButton}>
                    <Text style={styles.connectLabel}>Disconnect</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.connectedButton}>
                    <Text style={styles.connectLabel}>Start Listening</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={styles.connectingMessage}>Connecting...</Text>
            ))
          ) : (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 60}}>
              <Text style={styles.largeText}>{connectedDevice ? connectedDevice : "No devices paired :("}</Text>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectLabel}>Connect Now!</Text>
              </TouchableOpacity>
            </View>
          )
        }
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
    backgroundColor: "#262626"
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
    color: "#ACBFA4",
    fontWeight: "normal",
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#ACBFA4",
  },

  largeText: {
    fontSize: 60,
    color: "#ACBFA4",
    fontWeight: "normal",
    marginBottom: 30,
  },

  connectMessage: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    marginBottom: 40,
  },

  connectingMessage: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    marginBottom: 400,
  },

  connectButton: {
    width: 200,
    height: 40,
    backgroundColor: "white",
    color: "#38434D",
    marginHorizontal: "auto",
    marginBottom: 200,
  },

  connectedbuttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    gap: 20,
    marginBottom: 200,
  },

  connectedButton: {
    flexGrow: 1,
    width: 100,
    height: 40,
    backgroundColor: "white",
    color: "#38434D",
  },

  connectLabel: {
    fontSize: 18,
    margin: "auto"
  },


});

export default Home