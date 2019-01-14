import React from "react";
import { View, FlatList } from "react-native";
import {List} from 'react-native-elements'

import Item from "./Item/Item";

const ItemList = props => {
  const placeList = info => (
    <Item
      text={info.item.name}
      image={info.item.image_url}
      display_phone={info.item.display_phone}
      rating={info.item.rating}
      key={info.item.id}
      onPress={() => props.onItemSelected(info.item.id)}
      isDeletable={props.isDeletable}
      onDeletePressed={() => props.onDeletePressed(info.item.id)}
    />
  );

  return (
    <View style={{height: "100%"}}>
      <FlatList
        data={props.itemList}
        renderItem={placeList}
        keyExtractor={item => item.id}
        onEndReached={props.onEndReached}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default ItemList;
