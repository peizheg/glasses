import { StyleSheet, TouchableOpacity, View, Text, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

const pages = [
    {name: "home", icon: "home"},
    {name: "music", icon: "music"},
    {name: "history", icon: "rotate-ccw"},
    {name: "settings", icon: "settings"},
]

const Footer = ({ currentPage, setCurrentPage }) => {
    return (
        <View style={{...styles.buttonBox, flexDirection: "row"}}>
            <FlatList
                style={{width: "100%"}}
                numColumns={4}
                horizontal={false}
                bounces={false}
                contentContainerStyle={{alignItems: "stretch"}}
                renderItem={({item}) => (
                    <TouchableOpacity style={{...styles.footerIcon, backgroundColor: currentPage == item.name ? "rgba(255, 255, 255, 0.05)" : "rgb(3, 2, 2)" }} onPress={() => setCurrentPage(item.name)}>
                        <Feather name={item.icon} style={styles.featherButton}/>
                        {(currentPage != item.name) ? <Text style={{fontWeight: "bold", color: "#ACBFA4", opacity: 0.5}}>{item.name}</Text> : null}
                    </TouchableOpacity>
                )}
                data={pages}
            />
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
        backgroundColor: "rgba(10, 8, 8, 1)",

    },

    footerIcon: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 15,
        height: 65,
        //borderWidth: 3,
        //borderColor: "rgba(75, 30, 30, 0.9)",
        minWidth: 100,
        color: "#ACBFA4",
    },

    featherButton: {
        fontSize: 25,
        color: "#ACBFA4",
        opacity: 0.5,
    },
})

export default Footer