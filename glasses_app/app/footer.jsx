import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const Footer = ({ currentPage, setCurrentPage }) => {
    return (
        <View style={{...styles.buttonBox, flexDirection: "row"}}>
            <TouchableOpacity style={{...styles.footerIcon, backgroundColor: currentPage == "home" ? "grey" : "dimgrey" }} onPress={() => setCurrentPage('home')}>
                <Feather name='home' style={styles.featherButton}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.footerIcon, backgroundColor: currentPage == "music" ? "grey" : "dimgrey" }} onPress={() => setCurrentPage('music')}>
                <Feather name='music' style={styles.featherButton}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.footerIcon, backgroundColor: currentPage == "history" ? "grey" : "dimgrey" }} onPress={() => setCurrentPage('history')}>
                <Feather name='rotate-ccw' style={styles.featherButton}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.footerIcon, backgroundColor: currentPage == "settings" ? "grey" : "dimgrey" }} onPress={() => setCurrentPage('settings')}>
                <Feather name='settings' style={styles.featherButton}/>
            </TouchableOpacity>
	  </View>
    );
}

const styles = StyleSheet.create({
    buttonBox: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "stretch",

        paddingBottom: 10,
        backgroundColor: "dimgrey",

    },

    footerIcon: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 65,
        borderWidth: 3,
        borderColor: "dimgrey",
        backgroundColor: "dimgrey",
    },

    featherButton: {
        fontSize: 25,
    },
})

export default Footer