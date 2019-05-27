import React, { Component } from 'react';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import * as Config from '../../config';

class MapContainer extends Component {
    render() {

        let marker = null;

        const mapStyles = {
            width: this.props.width !== undefined ? this.props.width : '100%',
            height: this.props.height !== undefined ? this.props.height : '100%'
        };

        // const handleApiLoaded = (map, maps) => {
        // 	// use map and maps objects
        // };

        if (this.props.lat !== undefined && this.props.lat !== null) {
            marker = (
                <Marker
                    title={
                        this.props.title !== undefined && this.props.lat !== null ? this.props.title : ''
                    }
                    name={
                        this.props.name !== undefined && this.props.lng !== null ? this.props.name : ''
                    }
                    position={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }} />
            )
        }
        return (
            <Map
                google={this.props.google}
                style={mapStyles}
                initialCenter={{
                    lat: (this.props.lat !== undefined && this.props.lat !== null ? this.props.lat : 22.28552),
                    lng: (this.props.lng !== undefined && this.props.lng !== null ? this.props.lng : 114.15769)
                }}
                center={{
                    lat: (this.props.lat !== undefined && this.props.lat !== null ? this.props.lat : 22.28552),
                    lng: (this.props.lng !== undefined && this.props.lng !== null ? this.props.lng : 114.15769)
                }}
                zoom={18}
                disableDefaultUI={true}
                // options={
                //     function (maps) {
                //         return {
                // 		zoomControl: false,
                // 		streetViewControl: false,
                //             scaleControl: false,
                //             mapTypeControl: false,
                // 		disableDefaultUI: true
                //         }
                //     }
                // }


                // onClick={this.onMapClicked}
            >
                {marker}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: Config.UAT_GOOGLE_MAP_KEY,
    language: 'en-us'
})(MapContainer);