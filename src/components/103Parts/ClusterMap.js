import React, { Component } from "react";
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import SingleMarker from "./SimpleMarker";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import * as Config from '../../config';

// const API_KEY = "AIzaSyDVI89Fgl9ZaUiDH43m5qMeESQdmrt90QQ";
class ClusterMap extends Component {
    static defaultProps = {
        center: {
            lat: 22.28552,
            lng: 114.15769
        },
        zoom: 11,
        isMarkerShown: true,
        onMarkerClicked: () => { }
    };

    state = {
        selectedMarker: null
    };

    onClick = marker => {
        this.setState({ selectedMarker: marker });
        if (this.props.onMarkerClicked) {
            this.props.onMarkerClicked(marker);
        }
    };

    render() {
        const { center, zoom, isMarkerShown, markers } = this.props;

        const { selectedMarker } = this.state;
        return (
            <GoogleMap
                defaultZoom={zoom}
                defaultCenter={center}
                onClick={() => this.setState({ selectedMarker: null })}
                clickableIcons={false}
                defaultOptions={{
                    // these following 7 options turn certain controls off see link below
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}
            >
                {selectedMarker && (
                    <InfoBox
                        key={selectedMarker.get("id")}
                        defaultPosition={
                            new window.google.maps.LatLng(center.lat, center.lng)
                        }
                        position={
                            new window.google.maps.LatLng(
                                selectedMarker.get("lat"),
                                selectedMarker.get("lng")
                            )
                        }
                        options={{
                            closeBoxURL: ``,
                            enableEventPropagation: true,
                            pixelOffset: new window.google.maps.Size(-191, -150),
                            disableAutoPan: false,
                            maxWidth: 0
                        }}
                    >
                        <div className="info-window">
                            <img
                                className="info-image"
                                src={selectedMarker.get("image")}
                                alt={selectedMarker.get("address")}
                            />
                            <div className="info-detail">
                                <div className="info-detail-address">
                                    {selectedMarker.get("address")}
                                </div>
                                <div className="info-detail-reviews">
                                    <div className="review-rating">
                                        <span
                                            className="review-rating-star"
                                            style={{
                                                width: `${selectedMarker.get("rating") * 100}%`
                                            }}
                                        />
                                    </div>
                                    <div className="review-count">
                                        {selectedMarker.get("reviews")} reviews
                  </div>
                                </div>
                            </div>
                        </div>
                    </InfoBox>
                )}
                <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
                    {isMarkerShown &&
                        markers &&
                        markers.map(marker => (
                            <SingleMarker
                                key={marker.get("id")}
                                active={
                                    selectedMarker &&
                                    marker.get("id") === selectedMarker.get("id")
                                }
                                position={{
                                    lat: marker.get("lat"),
                                    lng: marker.get("lng")
                                }}
                                marker={marker}
                                onClick={() => this.onClick(marker)}
                            />
                        ))}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

const WrapperMapComponent = withScriptjs(withGoogleMap(ClusterMap));

WrapperMapComponent.defaultProps = {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Config.UAT_GOOGLE_MAP_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
};

// export default WrapperMapComponent;

export default props => (
    <div className="clusterMap">
        <WrapperMapComponent {...props} />
    </div>
);
