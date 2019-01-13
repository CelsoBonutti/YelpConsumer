import React from 'react'
import { View, TouchableNativeFeedback, StyleSheet, Text } from 'react-native'

const Item = (props) => {
    return (
        <TouchableNativeFeedback onPress={()=>{alert("Test")}}>
            <View style={styles.container}>
                <Text>
                    {props.text}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#bbb",
      marginTop: 10,
      padding: 10,
      height: 50,
      justifyContent: "center",
      alignItems: "flex-start",
  }
})


export default Item
