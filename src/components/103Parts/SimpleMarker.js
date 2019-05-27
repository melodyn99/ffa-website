import React, { Component } from "react";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

export default class SingleMarker extends Component {
  static defaultProps = {
    active: false
  };

  render() {
    const { marker, active, ...rest } = this.props;
    return (
      <MarkerWithLabel
        {...rest}
        className="marker-with-label"
        opacity={0}
        labelAnchor={new window.google.maps.Point(0, 0)}
      >
        <div className={`marker${active ? " active" : ""}`}>
          <span className="icon" />
          <span className="price">{marker.get("price")}</span>
        </div>
      </MarkerWithLabel>
    );
  }
}
