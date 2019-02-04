import React from 'react';
import {StyleSheet, View } from 'react-native';
import ListItem from "../../components/PlaceList/ListItem/ListItem";

const placeList = (props) => {
    const placesOutput = props.places.map((place, index) => {
        return <ListItem key={index} placeName={place} />
    });

  return (
      <View style={styles.listContainer}>
          {placesOutput}
      </View>
  );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});

export default placeList;
