import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

import { addPlace } from '../../store/actions/index'
import HeaderText from '../../components/UI/HeaderText/HeaderText'

class DetailScreen extends Component {
  state={
    place:{
      name: '',
      id: ''
    }
  }

  componentWillMount(){
    this.setState({
      place: {
        name: this.props.navigation.getParam('name', ''),
        id: this.props.navigation.getParam('id', ''),
        userLocation: {
          latitude: this.props.navigation.getParam('userLocation', '').latitude,
          longitude: this.props.navigation.getParam('userLocation', '').longitude,
        }
      }
    })
  }

  componentDidMount(){
    this.props.onAddPlace(this.state.place)
  }

  render() {
    return (
      <View>
        <MapView
          initialRegion={this.state.userLocation}
          region={this.state.userLocation}
          style={styles.map}

        />
        <View>
            <HeaderText>{this.state.place.name}</HeaderText>
            <Text>Texto</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: Dimensions.get('window').height * 0.4,
    },
    detailContainer: {

    }
})

mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (place) => {
      dispatch(addPlace(place))
    }
  }
}

export default connect(null, mapDispatchToProps)(DetailScreen)