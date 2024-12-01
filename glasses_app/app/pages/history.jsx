import { StyleSheet, Text, Image, View, SectionList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

const History = () => {
  const song_data = [
    {day: "2024-11-24",
     data: [{song: "Papaoutai", artist: "Stromae", album_cover: require("../assets/papaoutai.jpeg")},
            {song: "Country Roads", artist: "John Denver", album_cover: require("../assets/country_roads.jpg")},
            {song: "Halo", artist: "Beyonce", album_cover: require("../assets/halo.jpg")},],},
    {day: "2024-11-25",
     data: [{song: "Stick Season", artist: "Noah Kahan", album_cover: require("../assets/stick_season.jpeg")},
            {song: "Fortnight", artist: "Taylor Swfit", album_cover: require("../assets/fortnight.jpeg")},],},
    {day: "2024-11-26",
     data: [{song: "Renegades", artist: "X Ambassadors", album_cover: require("../assets/renegades.jpeg")},
            {song: "Jar of Hearts", artist: "Christina Perri", album_cover: require("../assets/jar_of_hearts.jpeg")},
            {song: "Too Sweet", artist: "Hozier", album_cover: require("../assets/too_sweet.jpeg")},],},
  ]

  var curr_date = new Date(Date.now()).toUTCString();
  curr_date = curr_date.slice(0, curr_date.length-13);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: "#262626"}}>
        <Text style={{...styles.headerText, marginBottom: 14,}}>HISTORY</Text>
      </View>
      <SectionList
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.historyBox}
        sections={song_data}
        data={song_data}
        renderItem={({item}) => {
          return (
            <View style={styles.songBox}>
              <Image source={item.album_cover} style={styles.songImage} />
              <View>
                <Text style={styles.songTitle}>{item.song}</Text>
                <Text style={styles.songArtist}>by {item.artist}</Text>
              </View>
            </View>
          );
        }}
        renderSectionHeader={({section: {day}}) => {
          var temp_date = (new Date(day)).toUTCString();
          temp_date = temp_date.slice(0, temp_date.length-13);
          return (
            <LinearGradient colors={[styles.container.backgroundColor, 'rgba(38,38,38,0)']} start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 1 }} style={{height: 64, paddingTop: 10,}}>
            <Text style={styles.sectionTitle}>{temp_date == curr_date ? "TODAY" : temp_date}</Text>
            </LinearGradient>
            
          );
        }}
        renderSectionFooter={() => {
          return (
            <View style={{height: 10}}/>
          );
        }}
        ListFooterComponent={() => {
          return (
            <View style={{height: 256}}/>
          )
        }}
        stickyHeaderIndices={[0]}>
      </SectionList>
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
    backgroundColor: "#262626",
  },
  

  headerText: {
    fontSize: 70,
    color: "#ACBFA4",
    marginVertical: 30,
    alignSelf: "center",
    fontFamily: "Didot",
    borderBottomWidth: 1,
    borderColor: "#ACBFA4",
  },

  historyBox: {
    width: "100%",
  },

  dayBox: {
    marginBottom: 24,
    display: "flex",
    gap: 10,
    marginVertical: 48,
  },

  sectionTitle: {
    color: "#ACBFA4",
    fontFamily: "Didot",
    flex: 1,
    fontSize: 22,
    textTransform: "uppercase",
    margin: 10,
  },

  songBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginVertical: 10,
  },

  songImage: {
    width: 80,
    height: 80,
    padding: 4,
    borderColor: "#ACBFA4",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "rgba(172, 191, 164, 0.5)",
  },

  songTitle: {
    color: "#ACBFA4",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },

  songArtist: {
    color: "#ACBFA4",
    fontWeight: "medium",
    fontSize: 12,
  }
});

export default History