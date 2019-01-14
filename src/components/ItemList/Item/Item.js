import React from "react";
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Item = props => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: props.image ? props.image : "http://via.placeholder.com/70x70"
          }}
        />
        <View style={styles.information}>
          <View style={styles.topText}>
            <Text style={styles.nameText}>{props.text}</Text>
            <View style={styles.rating}>
              <Text style={styles.text}>{props.rating}</Text>
              <Icon name="md-star" color="gold" size={20} />
            </View>
          </View>
          {props.display_phone ? 
          (<View style={styles.phone}>
            <Icon name="md-call" size={15} color="black"></Icon>
            <Text style={styles.phoneText}>{props.display_phone.slice(4)}</Text>
          </View>)
          : null }
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    marginTop: 10,
    padding: 10,
    height: 90,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 5
  },
  nameText: {
    fontSize: 15,
    color: "black",
    width: "80%"
  },
  rating: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "flex-end"
  },
  topText: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 100,
    justifyContent: "space-between"
  },
  information: {
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  phone:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  phoneText:{
    fontSize: 14,
    marginLeft: 5
  }
});

export default Item;
