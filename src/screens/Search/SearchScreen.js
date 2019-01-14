import React, { Component } from "react";
import { Text, StyleSheet, View, Picker } from "react-native";

import ItemList from "../../components/ItemList/ItemList";

const priceOptions = [1, 2, 3, 4];

const headerOptions = {
  headers: {
    Authorization:
      "Bearer OR6RXMGAKp4ZDXGPc4138PAfjC4FBvKIM1pjzTnp6Hi-xAYGtiD9iQ1qsKJUznWFVwef1M8ahFd7hMMqlhZ_82rQEkxFp4u39glpfhvkKN2bu8AJnEyE8SNlNHM3XHYx"
  }
};

export default class SearchScreen extends Component {
  state = {
    selectedPriceRange: "",
    places: [],
    page: 0
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLocation: position.coords
        });

        this.makeRemoteRequest();
      },
      err => {
        console.log(err);
        alert("Houve um problema ao tentar executar sua ação :(");
      }
    );
  }

  // componentDidUpdate(prevState){
  //   if (prevState.selectedPriceRange !== this.state.selectedPriceRange)
  //     this.makeRemoteRequest()
  // }

  makeRemoteRequest = () => {
    const url = `https://api.yelp.com/v3/businesses/search?offset=${
      this.state.selectedPriceRange
    }${20 * this.state.page}&categories=restaurants&sort_by=distance&latitude=${
      this.state.currentLocation.latitude
    }&longitude=${this.state.currentLocation.longitude}`;

    fetch(url, headerOptions)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          places: resJson
        });
      });
  };

  priceRangeChangedHandler = priceRange => {
    this.setState({
      selectedPriceRange: priceRange
    });
  };

  onItemSelectedHandler = id => {
    const url = `https://api.yelp.com/v3/businesses/${id}`;
    fetch(url, headerOptions)
      .then(res => res.json())
      .then(place => {
        this.props.navigation.navigate("Details", {
          place,
          userLocation: this.state.currentLocation
        });
      });
  };

  render() {
    const generateOptions = priceOptions.map(option => (
      <Picker.Item
        label={"$".repeat(option)}
        key={option}
        value={`price=${option}&`}
      />
    ));

    const itemList = this.state.places.businesses;

    return (
      <View>
        <Picker
          selectedValue={this.state.selectedPriceRange}
          onValueChange={(itemValue, itemIndex) =>
            this.priceRangeChangedHandler(itemValue)
          }
        >
          {generateOptions}
        </Picker>
        <ItemList
          itemList={itemList}
          onItemSelected={this.onItemSelectedHandler}
        />
      </View>
    );
  }
}
