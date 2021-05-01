import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";
import { mapStyles } from './NightMode'
import KeyStore from '../KeyStore.js'
import Aircraft from '../Aircraft'
import Snow from '../Snow/Snow'
import '../Map/Map.css'

class Map extends Component {

    mapMounted = false;
    defaultMapOptions = {
        styles: mapStyles,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        gestureHandling: 'greedy',
        zoom: 11,
        maxZoom: 15
    };

    constructor(props) {
        super(props);
        this.state = {
            aircraft: true,
            lat: 46.9042156,
            lng: -114.0423713,
            bearing: "",
            alititude: "",
            speed: "",
            accuracy: "",
        }
    }

    componentDidMount() {
        this.mapMounted = true;
        this.dbInterval = setInterval(this.listen4DB, 1000)
    }

    componentWillUnmount() {
        this.mapMounted = false;
        clearInterval(this.updateInterval)
    }

    listen4DB = () => {
        if (Aircraft[0].lat) {
            this.setState({ aircraft: true })
            this.updateCoords()
            this.updateInterval = setInterval(this.updateCoords, 3000)
            clearInterval(this.dbInterval)
        }
    }

    updateCoords = () => {
        try {
            this.setState(
                {
                    lat: Number(Aircraft[0].lat),
                    lng: Number(Aircraft[0].lng),
                    bearing: Aircraft[0].bear.split("+").join(" "),
                    alititude: Aircraft[0].alt.split("+").join(" "),
                    speed: Aircraft[0].speed.split("+").join(" "),
                }
            )
        } catch {
            console.log('failed to set state')
        }
    }

    render = () => {

        let aircraftMarker = new window.google.maps.MarkerImage(
            './res/sleigh.png',
            null,
            null,
            null,
            new window.google.maps.Size(35, 35))

        return (
            <div className="Map">
                <Snow />
                {!this.state.aircraft && <GoogleMap
                    defaultCenter={{ lat: this.state.lng.lat, lng: this.state.lng  }}
                    defaultOptions={this.defaultMapOptions}
                >
                    <>
                    </>
                </GoogleMap>}
                {this.state.aircraft && <GoogleMap
                    defaultCenter={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
                    defaultOptions={this.defaultMapOptions}
                >
                    <>
                    </>
                    <Marker
                        position={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
                        icon={aircraftMarker}
                    />
                </GoogleMap>}
                {this.state.aircraft && <div className="Guages">
                    <div id='bearing-container'>
                        <img src='/res/bearing.png' alt='bearing'></img>
                        {this.state.bearing && <p>{this.state.bearing}</p>}
                    </div>
                    <div id='altitude-container'>
                        <img src='/res/altitude.png' alt='altitude'></img>
                        {this.state.alititude && <p>{this.state.alititude}</p>}
                    </div>
                    <div id='speed-container'>
                        <img src='/res/speed.png' alt='speed'></img>
                        {this.state.speed && <p>{this.state.speed}</p>}
                    </div>
                </div>}
            </div>
        );
    };
}

const MapComponent = withScriptjs(withGoogleMap(Map));
// eslint-disable-next-line
export default () => (
    <MapComponent
        googleMapURL={KeyStore.mapUrl}
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh`, width: "100vw" }} />}
        mapElement={<div style={{ height: `100vh` }} />}
    />
);