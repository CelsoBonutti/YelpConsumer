import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import ItemList from '../../components/ItemList/ItemList'

class HistoryScreen extends Component {
  onItemSelectedHandler = id => {
    const place = this.props.places.find(place => place.id == id)
    this.props.navigation.navigate('Details', place);
  }

  render() {
    return (
      <View>
        <ItemList
          itemList={this.props.places}
          onItemSelected={this.onItemSelectedHandler}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.history.placeHistory
  }
}

export default connect(mapStateToProps, null)(HistoryScreen)