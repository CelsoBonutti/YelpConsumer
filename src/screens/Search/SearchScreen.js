import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker } from 'react-native'

import ItemList from '../../components/ItemList/ItemList'

teste = [
  {
    text:"Teste",
    key:"1"
  }
]

const priceOptions = [1, 2, 3, 4]

export default class SearchScreen extends Component {
  state={
    selectedPriceRange: null
  }

  priceRangeChangedHandler = (priceRange) =>{
    this.setState({
      selectedPriceRange: priceRange,
    })
  }
 
  render() {
    const generateOptions = priceOptions.map(option => 
      <Picker.Item label={"$".repeat(option)} key={option} value={option}/>
    )


    return (
      <View>
        <Picker
          selectedValue={this.state.selectedPriceRange}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => this.priceRangeChangedHandler(itemValue)}
        >
          {generateOptions}
        </Picker>
        <ItemList itemList={teste}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  picker:{

  }
})
