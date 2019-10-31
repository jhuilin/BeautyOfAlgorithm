import React, { Component } from "react";
import "./display.css";
class Display extends Component {
  height = window.innerHeight;
  width = window.innerWidth;

  state = {
    array: []
  };
  componentDidMount() {
    this.loop();
    this.drawCoordinates();
  }
  loop = () => {
    for (let i = 0; i < this.width; i += 1) {
      this.state.array.push(i);
    }
  };

  drawCoordinates = () => {
    for (let i = 0; i < this.state.array.length; i += 1) {
      var pointSize = 1;
      var ctx = document.getElementById("canvas").getContext("2d");
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(
        i * 5,
        this.height - this.state.array[i],
        pointSize,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
    }
  };

  render() {
    // let screenWidth = window.screen.width;
    // let widthStyle = {
    //   width: `${screenWidth}px`
    // };
    return (
      <canvas id="canvas" width={this.width} height={this.height}></canvas>
    );
  }
}

export default Display;
