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
        minZoom: 6,
        maxZoom: 15
    };

    constructor(props) {
        super(props);
        this.state = {
            aircraft: true,
            lat: 46.91569,
            lng: -114.08781,
            bearing: "NE (44.966)",
            alititude: "3113 ft",
            speed: "0.30 mph",
            accuracy: "97.1 ft"
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
        if (Aircraft[0].data) {
            this.setState({ aircraft: true })
            this.updateInterval = setInterval(this.updateCoords, 500)
            clearInterval(this.dbInterval)
        }
    }

    updateCoords = () => {
        this.setState(
            {
                lat: Number(Aircraft[0].data.getElementsByTagName("gps_lat")[0].innerHTML),
                lng: Number(Aircraft[0].data.getElementsByTagName("gps_lon")[0].innerHTML),
                bearing: Aircraft[0].data.getElementsByTagName("gps_bear")[0].innerHTML,
                alititude: Aircraft[0].data.getElementsByTagName("gps_alt")[0].innerHTML,
                speed: Aircraft[0].data.getElementsByTagName("gps_speed")[0].innerHTML,
                accuracy: Aircraft[0].data.getElementsByTagName("gps_accuracy")[0].innerHTML
            }
        )
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
                    defaultCenter={{ lat: 46.8721, lng: -113.9940 }}
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
                    <div id='accuracy-container'>
                        <img src='/res/accuracy.png' alt='accuracy'></img>
                        {this.state.accuracy && <p>{this.state.accuracy}</p>}
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