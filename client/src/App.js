import React, { Component } from 'react';
import './App.css';

import io from 'socket.io-client'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = () => (
  <React.Fragment>
   <span style={{
     height: '55px',
     width: '55px',
     backgroundColor: '#2ECC40',
     borderRadius: '50%',
     display: 'inline-block'
   }}/>
    <p style={{
      color: 'white',
      fontSize: '15px',
      fontWeight: '400'
    }}>asdsadwas§</p>
  </React.Fragment>
)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mentions: [
        {lat: 51.507351, long: -0.127758, receivedAt: new Date()}
      ],
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 1,
      concurrentMentions: 10
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:5000')
    socket.on('tweet', msg => {
      // do stuff
      const { lat, long } = msg
      this.handleNewLat(lat, long)
    })
  }

  handleNewLat(lat, long) {
    const newMention = {lat, long, receivedAt: new Date()}
    const mentions = this.state.mentions
    if(mentions.length > this.state.concurrentMentions - 1) {
      mentions.splice(0, 1)
    }
    mentions.push(newMention)
    this.setState({ mentions })
  }

  render() {
    return (
      <React.Fragment>

        <div style={{ height: '800px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDSXbAvHCip_VCyGnnWrsBq4Zy_uuqMIos' }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.state.mentions.map(mention => (
              <AnyReactComponent
                lat={mention.lat}
                lng={mention.long}
                text="Tweet!!!"
              />
            ))}
          </GoogleMapReact>
        </div>
      </React.Fragment>
    )
  }
}

export default App
