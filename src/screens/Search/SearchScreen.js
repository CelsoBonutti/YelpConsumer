import React, { Component } from "react";
import { View, Picker, ActivityIndicator } from "react-native";
import { ButtonGroup, Button } from 'react-native-elements'

import ItemList from "../../components/ItemList/ItemList";

const priceOptions = ["Todos", "$", "$$", "$$$", "$$$$"];

const headerOptions = {
  headers: {
    Authorization:
      "Bearer OR6RXMGAKp4ZDXGPc4138PAfjC4FBvKIM1pjzTnp6Hi-xAYGtiD9iQ1qsKJUznWFVwef1M8ahFd7hMMqlhZ_82rQEkxFp4u39glpfhvkKN2bu8AJnEyE8SNlNHM3XHYx"
  }
};

export default class SearchScreen extends Component {
  state = {
    places: [],
    page: 0,
    loading: true,
    selectedPriceRange: 0
  };

  makeRemoteRequest = () => {
    const url = `https://api.yelp.com/v3/businesses/search?${
      this.state.selectedPriceRange ? `price=${this.state.selectedPriceRange}&` : ""
    }offset=${20 *
      this.state.page}&categories=restaurants&sort_by=distance&latitude=${
      this.state.currentLocation.latitude
    }&longitude=${this.state.currentLocation.longitude}`;

    fetch(url, headerOptions)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          loading: false,
          places:
            this.state.page == 0
              ? resJson.businesses
              : [...this.state.places, ...resJson.businesses]
        });
      });
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
        alert(
          "Houve um problema ao tentar conseguir sua localização. Você autorizou o GPS?"
        );
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedPriceRange !== this.state.selectedPriceRange ||
      prevState.page !== this.state.page
    ) {
      this.makeRemoteRequest();
    }
  }

  priceRangeChangedHandler = priceRange => {
    this.setState({
      selectedPriceRange: priceRange,
      page: 0,
      loading: true
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

  onEndReachedHandler = () => {
    this.setState({
      page: this.state.page + 1
    });
  };

  render() {
    return (
      <View>
        <ButtonGroup
          onPress={this.priceRangeChangedHandler}
          selectedIndex={this.state.selectedPriceRange}
          buttons={priceOptions}
        />
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        ) : (
          <ItemList
            itemList={this.state.places}
            onItemSelected={this.onItemSelectedHandler}
            onEndReached={this.onEndReachedHandler}
          />
        )}
      </View>
    );
  }
}
