import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'

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
        id: this.props.navigation.getParam('id', '')
      }
    })
  }

  componentDidMount(){
    this.props.onAddPlace(this.state.place)
  }

  render() {
    return (
      <View>
        <View style={styles.placeholder}>

        </View>
        <View>
            <HeaderText>{this.state.place.name}</HeaderText>
            <Text>Texto</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    placeholder: {
        width: "100%",
        height: Dimensions.get('window').height * 0.5,
        borderColor: "black",
        borderWidth: 1
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