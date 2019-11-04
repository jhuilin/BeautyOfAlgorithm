import React from "react";
import "./Visualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";

let window_width = window.innerWidth;
let window_height = window.innerHeight;
let array_size = parseInt((window_width - 200) / 8);

function reportWindowSize() {
  window_width = window.innerWidth;
  window_height = window_height;
  array_size = parseInt((window_width - 200) / 8);
}
window.onresize = reportWindowSize;

const primary_color = "white";
const secondary_color = "red";
const animation_speed = 10;
const disabled_buttons = "currently disabled";
const enable_buttons = {
  nlogn: "O(NlogN) Time Complexity",
  nSquare: "O(N^2) Time Complexity"
};

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.reserArray();
  }
  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  reserArray = () => {
    const array = [];
    for (let i = 0; i < array_size; i++) {
      array.push(this.randomIntFromInterval(25, window_height - 30));
    }
    this.setState({ array: array });
    this.restoreButtons();
  };

  disableButtons = () => {
    document.getElementById("bubbleSort").disabled = true;
    // buttonStyle = document.getElementById("bubbleSort").style;
    // document.getElementById("bubbleSort").title = disabled_buttons;
    // buttonStyle.cursor = "default";
    // buttonStyle.background = "#000000";
  };
  restoreButtons = () => {
    document.getElementById("bubbleSort").disabled = false;
    // buttonStyle = document.getElementById("bubbleSort").style;
    // document.getElementById("bubbleSort").title = enable_buttons.nSquare;
    // buttonStyle.background = "#47535E";
    // buttonStyle.cursor = "pointer";
  };

  bubbleSort = () => {
    this.disableSortButtons();
    const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? secondary_color : primary_color;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animation_speed);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * animation_speed);
      }
    }
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (animation_speed * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreButtons(), RESTORE_TIME);
  };
  render() {
    const array = this.state.array;
    return (
      <>
        <div
          className="array-container"
          style={{ position: "absolute", right: `20px` }}
        >
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: primary_color,
                height: `${value}px`
              }}
            ></div>
          ))}
        </div>
        <div className="buttons">
          <button
            title="Array Shuffling"
            style={{
              position: "relative",
              top: `${0 * (window_height - 20)}px`
            }}
            onClick={() => this.resetArray()}
          >
            Generate New Array
          </button>
        </div>
        <div className="buttons">
          <button
            title="O(N^2) Time Complexity"
            id="bubbleSort"
            style={{
              position: "relative",
              top: `${2.5 * (window_height - 20)}px`
            }}
            onClick={() => this.bubbleSort()}
          >
            Bubble Sort
          </button>
        </div>
      </>
    );
  }
}

export default Visualizer;
