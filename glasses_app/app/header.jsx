import { View, StyleSheet } from "react-native"

const Header = () => {
    return (
        <View style={styles.header}>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 100,
        alignItems: "stretch",
        backgroundColor: "#262626",
    },
})

export default Header