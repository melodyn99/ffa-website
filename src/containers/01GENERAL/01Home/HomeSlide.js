import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
    };
    return (
      <div className="container">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <img src={require('../../../images/600-400.png')} alt="" />
          </div>
          <div>
            <img src={require('../../../images/600-400.png')} alt="" />
          </div>
          <div>
            <img src={require('../../../images/600-400.png')} alt="" />
          </div>
          <div>
            <img src={require('../../../images/600-400.png')} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}
