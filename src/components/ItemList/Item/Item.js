import React from "react";
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

const Item = props => {
  return (
    <ListItem
      onPress={props.onPress}
      avatar={{
        uri: props.image ? props.image : "via.placeholder.com/100x100"
      }}
      avatarContainerStyle={styles.avatarContainer}
      avatarStyle={styles.avatar}
      title={props.text}
      subtitle={
        props.display_phone ? (
          <View style={styles.phone}>
            <Icon name="md-call" color="black" />
            <Text style={{ marginLeft: 3 }}>
              {props.display_phone.slice(4)}
            </Text>
          </View>
        ) : null
      }
      rightIcon={
        props.isDeletable ? (
          {
            name: "trash",
            type: "font-awesome",
            color: "red"
          }
        ) : (
          <View style={styles.rating}>
            <Text>{props.rating}</Text>
            <Icon name="md-star" color="gold" size={20} />
          </View>
        )
      }
      onPressRightIcon={props.isDeletable ? props.onDeletePressed : null}
    />
  );
};

const styles = StyleSheet.create({
  phone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  avatarContainer:{
    width: 60,
    height: 60
  },
  avatar:{
    width: "100%",
    height: "100%"
  }
});

export default Item;
