import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const Music = () => {
	const [song, setSong] = useState({});
	useEffect(() => {
		setTimeout(() => {
			setSong({
				title: "Stick Season",
				lyrics: "stick stick stick ".repeat(40),
			})
		}, 2000)
	}, [])
	
	return (
		<View style={styles.container}>
			<View style={styles.buttonBox}>
				<TouchableOpacity onPress={() => console.log("test")} style={styles.bluetooth}>
				<Feather name='bluetooth' style={styles.featherButton}/>
				</TouchableOpacity>
			</View>
			{
				((song) ? (
					<View style={styles.songBox}>
						<Text style={styles.title}>{song.title}</Text>
						<Text style={styles.lyrics}>{song.lyrics}</Text>
					</View>
				) : (
					<View>
						<Text style={styles.title}>Listing to the song...</Text>
					</View>
				))
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

  songBox: {
	display: "flex",
	justifyContent: "flex-start",
	gap: 30,
	borderColor: "orange",
	borderWidth: 3,
	overflow: "scroll",
	height: "80%",
  },

  title: {
    fontSize: 32,
	color: "white",
    fontWeight: "bold",
  },

  lyrics: {
	fontSize: 16,
	color: "white",
    fontWeight: "medium",
	marginBottom: 400,
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