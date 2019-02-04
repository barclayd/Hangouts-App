import React, {Component} from 'react';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PlaceList from '../../components/PlaceList/PlaceList';

class Places extends Component {

    state = {
        placeName: '',
        places: []
    };

    placeNameChangeHandler = (value) => {
        this.setState({
            placeName: value
        })
    };

    placeAddedHandler = () => {
        if(this.state.placeName.trim () === '') {
            return;
        }
        this.setState(prevState => {
            return {
                places: prevState.places.concat(prevState.placeName),
                placeName: ''
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <PlaceInput
                    placeholder='Enter a place...'
                    placeName={this.state.placeName}
                    btnTitle='Add'
                    addItem={this.placeAddedHandler}
                    inputChange={this.placeNameChangeHandler}
                />
                <PlaceList places={this.state.places}/>
            </React.Fragment>
        )
    }
}


export default Places;
