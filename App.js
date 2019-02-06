import React, {Component} from 'react';
import {connect} from 'react-redux';
import Places from './src/containers/Places/Places';

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Places/>
      </React.Fragment>
    );
  }
}

export default connect(App);
