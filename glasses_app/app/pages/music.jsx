import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from "react";
import glassesServices from "../services/glasses";

const Music = ({ song, setSong }) => {
	const [line, setLine] = useState(0)
	const [isSearching, setIsSearching] = useState(false)

	const changeLine = (index) => {
		setLine(index)

	}

	const find_song = async () => {
		setIsSearching(true)
		const song_response = await glassesServices.get_song()
		setSong({ ...song_response })
		setIsSearching(false)
	  }

	return (
		<View style={styles.container}>
			{(song.title) ? (
				<FlatList
					ListHeaderComponent={
						<LinearGradient colors={[styles.container.backgroundColor, 'rgba(48,41,42,0)']} start={{ x: 0.5, y: 0.1 }} end={{ x: 0.5, y: 1 }} style={{height: 90}}>
							<Text style={{...styles.title, fontFamily: "Didot"}}>{song.title}</Text>
							<Text style={{...styles.title, fontSize: 20, paddingTop: 0}}>{song.artist}</Text>
						</LinearGradient>}
					showsVerticalScrollIndicator={false} bounces={false} stickyHeaderIndices={[0]}
					renderItem={({item, index}) => (
						<TouchableOpacity onPress={() => changeLine(index)}>
							<Text style={{...styles.lyrics, opacity: (index == line) ? 0.85 : (index < line) ? 0.65 : 0.4, fontWeight: (index == line) ? "bold" : ""}}>{item}</Text>
						</TouchableOpacity>
					)}
					data={
						song.lyrics.split('\n').slice(1)
					}
					style={{marginBottom: 60}}
				/>
			) : ((isSearching) ? (
					<View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
						<Text style={{...styles.title, paddingBottom: 100}}>Listening to the song...</Text>
					</View>
				) : (
					<View style={{flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 60}}>
					<Text style={styles.largeText}>{"No lyrics to display! Please search for a song first!"}</Text>
					<TouchableOpacity style={styles.connectButton}>
					  <Text style={styles.connectLabel} onPress={find_song}>Start Searching!</Text>
					</TouchableOpacity>
				  </View>
				)
			)}
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
	height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
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

  songBox: {
	display: "flex",
	justifyContent: "flex-start",
	gap: 30,
	borderColor: "orange",
	borderWidth: 3,
	width: 350,
	height: "35%",
  },

  title: {
    fontSize: 32,
	color: "#ACBFA4",
    fontWeight: "bold",
	paddingTop: 10,
  },

  lyrics: {
	fontSize: 22,
	color: "#ACBFA4",
    fontWeight: "medium",
	lineHeight: 30,
	marginVertical: 5,
	width: 340,
  },

  connectButton: {
    width: 200,
    height: 40,
    backgroundColor: "#769568",
    color: "#38434D",
    marginHorizontal: "auto",
    marginBottom: 200,
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

  largeText: {
    fontSize: 24,
    color: "#ACBFA4",
    fontWeight: "normal",
    marginBottom: 30,
  },
});

export default Music