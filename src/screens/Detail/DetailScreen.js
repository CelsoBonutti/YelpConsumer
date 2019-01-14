import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import geolib from "geolib";
import Icon from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-elements";

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
            <Rating
              imageSize={20}
              readonly
              startingValue={this.state.place.rating}
            />
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
              label="Endereço"            
              text={this.state.place.location.display_address[0]}  
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
            <Label
              label="Distância"
              text={`${geolib.getDistance(
                this.state.userLocation,
                this.state.place.coordinates
              )}m`}
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
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  phone: {
    flexDirection: "row",
    alignItems: "center"
  },
  phoneText: {
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
