import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Label = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {props.label}:
            </Text>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        width: "100%",
        marginBottom: 10
    },
    label: {
        color: "black",
        marginRight: 5,
        fontWeight: "bold",
        fontSize: 17,
    },
    text: {
        fontSize: 17,
        width: "90%"
    }
})


export default Label
