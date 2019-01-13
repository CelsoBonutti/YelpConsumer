import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import ItemList from '../../components/ItemList/ItemList'

export default class HistoryScreen extends Component {
  render() {
    return (
      <View>
        <ItemList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
