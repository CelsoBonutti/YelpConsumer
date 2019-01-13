import React from 'react'
import { View, FlatList } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Item from './Item/Item'

const ItemList = (props) => {
  const placeList = (info) =>
    <Item
      text={info.item.name}
      key={info.item.id}
      onPress={() => props.onItemSelected(info.item.id)}
    />
  

  return (
    <FlatList
      data={props.itemList}
      renderItem={placeList}
    />
  )
}

export default ItemList
