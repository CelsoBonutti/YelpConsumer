import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import ItemList from "../../components/ItemList/ItemList";

class HistoryScreen extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLocation: position.coords
        });
      },
      err => {
        console.log(err);
        alert("Houve um problema ao tentar executar sua ação :(");
      }
    );
  }

  onItemSelectedHandler = id => {
    const url = `https://api.yelp.com/v3/businesses/${id}`;
    options = {
      headers: {
        Authorization:
          "Bearer OR6RXMGAKp4ZDXGPc4138PAfjC4FBvKIM1pjzTnp6Hi-xAYGtiD9iQ1qsKJUznWFVwef1M8ahFd7hMMqlhZ_82rQEkxFp4u39glpfhvkKN2bu8AJnEyE8SNlNHM3XHYx"
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(place => {
        this.props.navigation.navigate("Details", {
          place,
          userLocation: this.state.currentLocation
        });
      });
  };

  render() {
    return (
      <View>
        <ItemList
          itemList={this.props.places}
          onItemSelected={this.onItemSelectedHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.history.placeHistory
  };
};

export default connect(mapStateToProps,null)(HistoryScreen);
