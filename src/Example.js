import React, { Component } from 'react';
import Geolocation from './Geolocation';

class Example extends Component {
  state = {
    loading: false,
    position: null,
    error: false
  };

  render() {
    return (
      <div>
        <Geolocation
          watch
          onChange={({ loading, position, error }) => {
            this.setState({ loading, position, error });
          }}
        />

        {this.state.loading ? (
          <p>Loading...</p>
        ) : this.state.error ? (
          <p style={{ color: 'tomato' }}>{this.state.error}</p>
        ) : this.state.position ? (
          <div>
            <p>Lat: {this.state.position.coords.latitude}</p>
            <p>Lng: {this.state.position.coords.longitude}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Example;
