import React from 'react';
import {StyleSheet, FlatList } from 'react-native';
import ListItem from "../../components/PlaceList/ListItem/ListItem";

const placeList = (props) => {
  return (
      <FlatList
          style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
            <ListItem
                  itemId={info.item.key}
                  placeName={info.item.name}
                  placeImage={info.item.image}
                  onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )}
      />
  );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});

export default placeList;
