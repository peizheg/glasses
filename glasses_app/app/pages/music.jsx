import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from "react";

const Music = () => {
	const [song, setSong] = useState({});
	const [line, setLine] = useState(0);
	useEffect(() => {
		setTimeout(() => {
			setSong({
				title: "Jar of Hearts",
				lyrics: "We fought, we chained\nour hearts in vain\nWe jumped, never asking why.\nWe kissed, I fell under your spell\nof love\nNo one could deny.\n".repeat(5),
				artist: "Christina Perri",
			})
		}, 2000)
	}, [])
	
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
						<TouchableOpacity onPress={() => {setLine(index)}}><Text style={{...styles.lyrics, opacity: (index == line) ? 0.85 : (index < line) ? 0.65 : 0.4, fontWeight: (index == line) ? "bold" : ""}}>{item}</Text></TouchableOpacity>
					)}
					data={
						["I know I can't take one more step towards you", "'cause all that's waiting is regret.", "And don't you know I'm not your ghost anymore", "You lost the love I loved the most", "I learned to live half alive", "but now you want me one more time", "Who do you think you are?", "Running 'round leaving scars.", "Collecting your jar of hearts", "and tearing love apart", "You're gonna catch a cold", "from the ice inside your soul", "so don't come back for me", "Who do you think you are?", "It took so long just to feel alright", "Remember how to put back the light in my eyes", "I wish that I missed the first time that we kissed", "But you broke all your promises", "And now you're back", "You don't get to get me back"]
					}
					style={{marginBottom: 60}}
				/>
			) : (
				<View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
					<Text style={{...styles.title, paddingBottom: 100}}>Listening to the song...</Text>
				</View>
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