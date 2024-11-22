import { StyleSheet, Text, Image, View, ScrollView } from "react-native";

const History = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <ScrollView style={styles.historyBox}>
        <View style={styles.dayBox}>
          <Text style={styles.daytitle}>Today</Text>
          <View style={styles.songBox} >
            <Image source={require('../assets/cheese.png')} style={styles.songImage} />
            <View>
              <Text style={styles.songTitle}>Test</Text>
              <Text style={styles.songArtist}>by testing</Text>
            </View>
          </View>
          <View style={styles.songBox} >
            <Image source={require('../assets/cheese.png')} style={styles.songImage} />
            <View>
              <Text style={styles.songTitle}>Test</Text>
              <Text style={styles.songArtist}>by testing</Text>
            </View>
          </View>
        </View>

        <View style={styles.dayBox}>
          <Text style={styles.daytitle}>Yesterday</Text>
          <View style={styles.songBox} >
            <Image source={require('../assets/cheese.png')} style={styles.songImage} />
            <View>
              <Text style={styles.songTitle}>Test</Text>
              <Text style={styles.songArtist}>by testing</Text>
            </View>
          </View>
        </View>

        <View style={styles.dayBox}>
          <Text style={styles.daytitle}>Nov 18, 2024</Text>
          <View style={styles.songBox} >
            <Image source={require('../assets/cheese.png')} style={styles.songImage} />
            <View>
              <Text style={styles.songTitle}>Test</Text>
              <Text style={styles.songArtist}>by testing</Text>
            </View>
          </View>
        </View>

      </ScrollView>
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

  },

  historyBox: {
    width: "100%",

  },

  dayBox: {
    marginBottom: 24,
    display: "flex",
    gap: 10,
  },

  daytitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
  },

  songBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  songImage: {
    width: 80,
    height: 80,
    padding: 4,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,
  },

  songTitle: {
    color: "white",
    fontWeight: "medium",
    fontSize: 16,
    marginBottom: 4,
  },

  songArtist: {
    color: "white",
    fontWeight: "medium",
    fontSize: 12,
  }
});

export default History