import React from 'react'
import { View, FlatList } from 'react-native'

import Item from './Item/Item'

const ItemList = (props) => {
  const placeList = (info) =>
    <Item
      text={info.item.text}
    />
  

  return (
    <FlatList
      data={props.itemList}
      renderItem={placeList}
    />
  )
}

export default ItemList
