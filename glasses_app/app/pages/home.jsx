import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import glassesServices from "../services/glasses";

const Home = ({ setCurrentPage, song, setSong }) => {
  const [isSearching, setIsSearching] = useState(false)

  const find_song = async () => {
    setIsSearching(true)
    const song_response = await glassesServices.get_song()
    setSong({ ...song_response })
    setIsSearching(false)
  }
  
  return (
    <View style={styles.container}>
      <Text style={{...styles.title, fontFamily: "Didot", paddingTop: 25,}}>GLASSES</Text>
      {
        isSearching ? (
          <Text style={styles.searchingMessage}>Listening...</Text>
        ) : (
          song.title ? (
            <View style={{ marginBottom: 150 }}>
              <Text style={styles.songFound}>Song found!</Text>
              <Text style={styles.songDescription}>{song.title} by {song.artist}</Text>
              <View style={styles.connectedbuttons}>
                <TouchableOpacity style={styles.connectedButton}>
                  <Text style={styles.connectLabel} onPress={find_song}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connectedButton}>
                  <Text style={styles.connectLabel} onPress={() => setCurrentPage("music")}>Go to Lyrics</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 60}}>
              <Text style={styles.largeText}>{"No song detected :("}</Text>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectLabel} onPress={find_song}>Start Listening!</Text>
              </TouchableOpacity>
            </View>
          )
        )
      }

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
    color: "#ACBFA4",
    fontWeight: "bold",
    marginBottom: 40,
  },

  searchingMessage: {
    fontSize: 48,
    color: "#ACBFA4",
    fontWeight: "bold",
    marginBottom: 400,
  },

  connectButton: {
    width: 200,
    height: 40,
    backgroundColor: "#769568",
    color: "#38434D",
    marginHorizontal: "auto",
    marginBottom: 200,
  },

  songFound: {
    fontSize: 36,
    color: "#ACBFA4",
    fontWeight: "bold",
    marginBottom: 12,
  },

  songDescription: {
    fontSize: 24,
    color: "#ACBFA4",
    fontWeight: "semibold",
    marginBottom: 24,
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
    backgroundColor: "#769568",
    color: "#38434D",
  },

  connectLabel: {
    fontSize: 18,
    margin: "auto"
  },


});

export default Home