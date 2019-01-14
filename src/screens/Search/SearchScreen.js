import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker } from 'react-native'


import ItemList from '../../components/ItemList/ItemList'

const priceOptions = [1, 2, 3, 4]

export default class SearchScreen extends Component {
  state = {
    selectedPriceRange: '',
    places: [],
    page: 1,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLocation: position.coords
        })

        this.makeRemoteRequest()
      },
      err => {
        console.log(err);
        alert('Houve um problema ao tentar executar sua ação :(')
      }
    )
  }

  makeRemoteRequest = () => {
    const url = `https://api.yelp.com/v3/businesses/search?${this.selectedPriceRange}categories=restaurants&sort_by=distance&latitude=${this.state.currentLocation.latitude}&longitude=${this.state.currentLocation.longitude}`
    options = {
      headers: {
        'Authorization': 'Bearer OR6RXMGAKp4ZDXGPc4138PAfjC4FBvKIM1pjzTnp6Hi-xAYGtiD9iQ1qsKJUznWFVwef1M8ahFd7hMMqlhZ_82rQEkxFp4u39glpfhvkKN2bu8AJnEyE8SNlNHM3XHYx'
      }
    }
    
    this.setState({loading: true})
    fetch(url, options)
      .then(res => res.json())
      .then( resJson => {
        this.setState({
          places: resJson
        })
      })
  }

  priceRangeChangedHandler = (priceRange) => {
    this.setState({
      selectedPriceRange: priceRange,
    })
  }

  onItemSelectedHandler = id => {
    const place = this.state.places.businesses.find(place => place.id == id)
    this.props.navigation.navigate('Details', { place, userLocation: this.state.currentLocation });
  }

  render() {

    const generateOptions = priceOptions.map(option =>
      <Picker.Item label={"$".repeat(option)} key={option} value={`price=${option}&`} />
    )

    const itemList = this.state.places.businesses

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