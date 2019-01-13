import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const HeaderText = (props) => {
  return (
    <Text style={[styles.header, props.style]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: "black",
    margin: 5,
    fontWeight: "bold"
  }
})


export default HeaderText
