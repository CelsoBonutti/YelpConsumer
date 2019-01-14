import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import geolib from "geolib";
import Icon from "react-native-vector-icons/Ionicons";

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
        latitudeDelta: 0.15,
        longitudeDelta: 0.15
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
          <View style={styles.topContainer}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>{this.state.place.rating}</Text>
              <Icon name="md-star" color="gold" size={28} />
            </View>
            {this.state.place.display_phone ? (
              <View style={styles.phone}>
                <Icon name="md-call" size={25} color="black" />
                <Text style={styles.phoneText}>
                  {this.state.place.display_phone.slice(4)}
                </Text>
              </View>
            ) : null}
          </View>
          <View>
            <Label
              label="Distância"
              text={`${geolib.getDistance(
                this.state.userLocation,
                this.state.place.coordinates
              )}m`}
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
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: Dimensions.get("window").height * 0.5
  },
  informationContainer: {
    margin: 10
  },
  rating: {
    flexDirection: "row",
    alignItems: "center"
  },
  ratingText: {
    fontSize: 20,
    color: "black"
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText:{
    fontSize: 20,
    marginLeft: 5
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
