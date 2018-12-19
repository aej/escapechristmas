import React, { Component } from 'react';
import './App.css';

import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"
import io from 'socket.io-client'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
))


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mentions: [
        {lat: 12, long: 12312, receivedAt: new Date()}
      ]
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:5000')
    socket.on('tweet', msg => {
      // do stuff
      console.log(msg)
    })
  }

  render() {
    return (
      <div>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDSXbAvHCip_VCyGnnWrsBq4Zy_uuqMIos"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '700px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
      </div>
    )
  }
};

export default App;
