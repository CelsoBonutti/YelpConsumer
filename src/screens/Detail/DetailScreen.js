import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import geolib from "geolib";

import { addPlace } from "../../store/actions/index";
import HeaderText from "../../components/UI/HeaderText/HeaderText";
import Label from "../../components/UI/Label/Label";

class DetailScreen extends Component {
  state = {
    place: {
      name: "",
      id: ""
    }
  };

  componentWillMount() {
    this.setState({
      place: this.props.navigation.getParam("place", ""),
      userLocation: {
        latitude: this.props.navigation.getParam("userLocation", "").latitude,
        longitude: this.props.navigation.getParam("userLocation", "").longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }
    });
  }

  componentDidMount() {
    this.props.onAddPlace(this.state.place);
  }

  render() {
    return (
      <View>
        <MapView
          initialRegion={this.state.userLocation}
          region={this.state.userLocation}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={this.state.userLocation}
            pinColor="blue"
            title="Você"
          />
          <MapView.Marker
            coordinate={this.state.place.coordinates}
            title={this.state.place.name}
          />
        </MapView>
        <View style={styles.informationContainer}>
          <HeaderText>{this.state.place.name}</HeaderText>
          <View>
            <Label 
              label="Distância"
              text={`${geolib.getDistance(this.state.userLocation, this.state.place.coordinates)}m`}
            />
            <Label
              label="Aberto no momento"
              text={
                this.state.place.hours
                  ? this.state.place.hours.is_open_now
                    ? "Sim"
                    : "Não"
                  : "Sem informações"
              }
            />
            {this.state.place.display_phone ? 
              (<Label label="Telefone" text={(this.state.place.display_phone).slice(4)} />) 
              : null}
            <Label label="Nota" text={this.state.place.rating} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: Dimensions.get("window").height * 0.4
  },
  informationContainer: {
    margin: 10
  }
});

mapDispatchToProps = dispatch => {
  return {
    onAddPlace: place => {
      dispatch(addPlace(place));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DetailScreen);
