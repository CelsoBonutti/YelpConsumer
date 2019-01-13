import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker } from 'react-native'


import ItemList from '../../components/ItemList/ItemList'

teste = [
  {
    name: "Teste",
    id: "1",
    price: "1"
  },
  {
    name: "Teste 2",
    id: "2",
    price: "2"
  },
  {
    name: "Teste 3",
    id: "3",
    price: "3"
  },
  {
    name: "Teste 4",
    id: "4",
    price: "4"
  }
]

const priceOptions = [1, 2, 3, 4]

export default class SearchScreen extends Component {
  state = {
    selectedPriceRange: null,
    places: teste
  }

  priceRangeChangedHandler = (priceRange) => {
    this.setState({
      selectedPriceRange: priceRange,
    })
  }

  onItemSelectedHandler = id => {
    const place = this.state.places.find(place => place.id == id)
    this.props.navigation.navigate('Details', place);
  }

  render() {

    const generateOptions = priceOptions.map(option =>
      <Picker.Item label={"$".repeat(option)} key={option} value={option} />
    )

    const itemList = this.state.selectedPriceRange ? this.state.places.filter(place => place.price == this.state.selectedPriceRange) : this.state.places

    return (
      <View>
        <Picker
          selectedValue={this.state.selectedPriceRange}
          onValueChange={(itemValue, itemIndex) => this.priceRangeChangedHandler(itemValue)}
        >
          {generateOptions}
        </Picker>
        <ItemList
          itemList={itemList}
          onItemSelected={this.onItemSelectedHandler}
        />
      </View>
    )
  }
}