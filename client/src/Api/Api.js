import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
const baseURL = "http://localhost:8000 ";
export { baseURL };
const client = axios.create({
    baseURL,
});
export const getUpdatedata = () => client.get("/data");

console.log(getUpdatedata())

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2b3BzOTAiLCJhIjoiY2t6aXMxMmF2MW5nMzJwbzBtZXR3YTYyNSJ9.H5Kd2qmEe9cb2vWS0o4g7w';

export default class Api extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: 9.9167,
            lat: 51.5167,
            zoom: 5
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container" />
            </div>
        );
    }
}
