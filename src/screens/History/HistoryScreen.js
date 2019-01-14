import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import _ from "lodash";

import {
  deleteHistory,
  deleteItemFromHistory
} from "../../store/actions/index";
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

  onDeletePressedHandler = id => {
    this.props.onDeleteItemFromHistory(id);
  };

  deleteHistoryHandler = () => {
    this.props.onDeleteHistory();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ItemList
          itemList={_.orderBy(this.props.places, "time", "desc")}
          onItemSelected={this.onItemSelectedHandler}
          onDeletePressed={this.onDeletePressedHandler}
          isDeletable={true}
        />
        <Icon
          name="trash"
          type="font-awesome"
          color="white"
          underlayColor="pink"
          containerStyle={styles.icon}
          onPress={this.deleteHistoryHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10
  }
});

const mapStateToProps = state => {
  return {
    places: state.history.placeHistory
  };
};

mapDispatchToProps = dispatch => {
  return {
    onDeleteHistory: () => {
      dispatch(deleteHistory());
    },
    onDeleteItemFromHistory: id => {
      dispatch(deleteItemFromHistory(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryScreen);
