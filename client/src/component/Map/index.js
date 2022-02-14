import React, { Component } from "react";
import MapGL, { Popup } from "react-map-gl";
import Marker from "../Marker";
import Geocoder from "../GeoCode";
import InfoLabel from "../InfoLabel";
import { getUpdatedata } from '../../api/Map'

import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

//API_KEY for MAPBOX
const MAPBOX_TOKEN = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: "100%",
        height: "100%",
        latitude: 51.1657,
        longitude: 10.4515,
        zoom: 5,
      },
      viewState: {
        latitude: 51.1657,
        longitude: 10.4515,
        zoom: 5,
      },
      markers: [],
      currMarker: null,
      selectedMarkerId: null,
      selectedMarker: null,
    };

    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleGeocoderViewportChange =
      this.handleGeocoderViewportChange.bind(this);
    if (!this.intervalRef) clearInterval(this.intervalRef.current);

  }

  // Reference Variable
  // Reference variable attached with React Element
  // Create map,inervalRef and geocoderContainerRef for handle and access DOM Event  mapRef = React.createRef();
  intervalRef = React.createRef();

  geocoderContainerRef = React.createRef();


  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  addMarker() {
    const { currMarker } = this.state;
    this.setState((prevState) => ({
      markers: [...prevState.markers, currMarker],
      currMarker: null,
    }));
  }

  // Update Data Every 10 Sec
  intevalFun() {
    this.intervalRef.current = setInterval(async () => {
      try {
        this.loadData();
      } catch (error) {
        console.error(error);
        clearInterval(this.intervalRef.current)
      }
    }, 10000);
  }

  componentWillUnmount() {
    //Unmout Data when DOM remove
    window.removeEventListener("resize", this.resize);
    this.setState(() => { });
    clearInterval(this.intervalRef.current);
  }

  handleViewportChange(viewport) {
    this.setState((prevState) => ({
      viewport: { ...prevState.viewport, ...viewport },
    }));
  }

  handleMarkerClick(idx) {
    this.setState({
      selectedMarker: this.state.markers[idx],
      selectedMarkerId: idx,
    });
  }

  handleClose = () => {
    this.setState({
      selectedMarker: null,
    });
  };

  handleGeocoderViewportChange = (newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return this.handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  };

  async updateData(data) {
    try {
      this.setState(function (state, props) {
        var list = state.markers;
        for (const item of data) {
          var pos = list.findIndex(i => i?.id === item.id);
          if (pos !== -1) {
            list[pos] = data.find(i => i.id === list[pos].id);
          } else {
            list.push(item);
          }
        }
        return {
          markers: [...list]
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async loadData() {
    try {
      const { data } = await getUpdatedata();
      this.updateData(data);
    } catch (error) {
      throw error;
    }
  }

  componentDidMount() {
    this.loadData();
    this.intevalFun();
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  render() {
    const { viewport, markers } = this.state;
    return (
      <>
        <MapGL
          style={{ width: "100%", height: "100%" }}
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {/* Search Box With Result*/}
          <Geocoder
            mapRef={this.mapRef}
            handleGeocoderViewportChange={this.handleGeocoderViewportChange}
            MAPBOX_TOKEN={MAPBOX_TOKEN}
            position="top-left"
            containerRef={this.geocoderContainerRef}
          />

          {/* Marker */}
          <Marker
            datas={markers}
            handleMarkerClick={this.handleMarkerClick}
          ></Marker>

          {/* Popup Box when Marker Click */}
          {this.state.selectedMarker && (
            <Popup
              mapRef={this.mapRef}
              latitude={parseFloat(markers[this.state.selectedMarkerId].lat)}
              longitude={parseFloat(markers[this.state.selectedMarkerId].lng)}
              closeButton={true}
              closeOnClick={false}
              onClose={this.handleClose}
            >
              <>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {markers[this.state.selectedMarkerId].city}
                    </h5>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-6">CO2 - </div>
                      <div className="col-6">
                        <span>{markers[this.state.selectedMarkerId].co2}</span>
                      </div>
                      <div className="col-6">Update Time - </div>
                      <div className="col-6">
                        <span>
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }).format(markers[this.state.selectedMarkerId].timestamp)}
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <span>Lat - </span>
                        </div>
                        <div className="col-6">
                          <span>{markers[this.state.selectedMarkerId].lat}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <span>Long - </span>
                        </div>
                        <div className="col-6">
                          <span>{markers[this.state.selectedMarkerId].lng}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </Popup>
          )}
        </MapGL>
        <InfoLabel></InfoLabel>
      </>
    );
  }
}

export default Map;
