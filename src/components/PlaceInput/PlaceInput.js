import React from 'react';
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
    <DefaultInput
        placeholder='Place Name'
        value={props.value}
        onChangeText={props.placeChangeName}
    />
);

export default placeInput;
