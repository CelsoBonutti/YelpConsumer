import React from "react";
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  Image
} from "react-native";

const Item = props => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: props.image ? props.image : "http://via.placeholder.com/70x70"}} />
        <View>
        <Text style={styles.text}>{props.text}</Text>
        <Text style={styles.text}>Nota {props.rating}</Text>
        <Text style={styles.text}>{(props.display_phone).slice(4)}</Text>
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
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image:{
    width: 70,
    height: 70,
    marginRight: 5
  },
  text:{
    fontSize: 15,
    color: "black",
  }
});

export default Item;
