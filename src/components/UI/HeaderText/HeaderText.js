import React from 'react'
import { Text, StyleSheet } from 'react-native'

const HeaderText = (props) => {
  return (
    <Text style={[styles.header, props.style]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: "black",
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold"
  }
})


export default HeaderText
