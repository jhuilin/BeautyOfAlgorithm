import React from "react";
import "./Visualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getSelectionSortAnimations } from "../Algorithms/SelectionSort";

let window_width = window.innerWidth;
let window_height = window.innerHeight;
let size_of_array = parseInt((window_width - 20) / 8);

function reportWindowSize() {
  window_width = window.innerWidth;
  window_height = window.innerHeight;
  size_of_array = parseInt((window_width - 20) / 8);
}
window.onresize = reportWindowSize;

const Primary_color = "white";
const Secondary_color = "red";

const Primary_color_for_dot = "black";
const Primary_size = "2px";
const Secondary_size = "8px";
const Animation_speed_ms = 0.4;

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      dotPick: true
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  selectMode() {
    this.setState({
      dotPick: !this.state.dotPick
    });
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < size_of_array; i++) {
      array.push(randomIntFromInterval(15, window_height - 20));
    }
    this.setState({ array: array });
    this.restoreButtons();
  }

  disableSortButtons() {
    document.getElementById("shuffling").disabled = true;
    const shuffButton = document.getElementById("shuffling").style;
    shuffButton.background = "black";
    shuffButton.cursor = "default";

    document.getElementById("mode").disabled = true;
    const modeButton = document.getElementById("mode").style;
    modeButton.background = "black";
    modeButton.cursor = "default";

    document.getElementById("bubbleSort").disabled = true;
    const buttonStyle = document.getElementById("bubbleSort").style;
    buttonStyle.background = "black";
    buttonStyle.cursor = "default";

    document.getElementById("SelectionSort").disabled = true;
    const SelectionButton = document.getElementById("SelectionSort").style;
    SelectionButton.background = "black";
    SelectionButton.cursor = "default";
  }

  restoreButtons() {
    document.getElementById("shuffling").disabled = false;
    const shuffButton = document.getElementById("shuffling").style;
    shuffButton.background = "#47535E";
    shuffButton.cursor = "pointer";

    document.getElementById("mode").disabled = false;
    const modeButton = document.getElementById("mode").style;
    modeButton.background = "#47535E";
    modeButton.cursor = "pointer";

    document.getElementById("bubbleSort").disabled = false;
    const buttonStyle = document.getElementById("bubbleSort").style;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";

    document.getElementById("SelectionSort").disabled = false;
    const SelectionButton = document.getElementById("SelectionSort").style;
    SelectionButton.background = "#47535E";
    SelectionButton.cursor = "pointer";
  }

  bubbleSort() {
    this.disableSortButtons();
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      const dots = document.getElementsByClassName("dot");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? Secondary_color : Primary_color;
        const size =
          i % 4 === 0 && this.state.dotPick ? Secondary_size : Primary_size;
        const [barOneIndex, barTwoIndex] = animations[i];

        const dotOne = dots[barOneIndex].style;
        const dotTwo = dots[barTwoIndex].style;
        const barOneStyle = this.state.dotPick
          ? dots[barOneIndex].style
          : arrayBars[barOneIndex].style;
        const barTwoStyle = this.state.dotPick
          ? dots[barTwoIndex].style
          : arrayBars[barTwoIndex].style;
        setTimeout(() => {
          if (!this.state.dotPick) {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }
          dotOne.backgroundColor = color;
          dotOne.height = size;
          dotOne.width = size;
          dotTwo.backgroundColor = color;
          dotTwo.height = size;
          dotTwo.width = size;
        }, i * Animation_speed_ms);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * Animation_speed_ms);
      }
    }
    const Restore_time = parseInt(
      (Animation_speed_ms * animations.length) / 2 + 3500
    );
    setTimeout(() => this.restoreButtons(), Restore_time);
  }
  render() {
    const array = this.state.array;
    const Sorting_buttons = 6;
    const Total_buttons = 2 + Sorting_buttons;
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
                backgroundColor: this.state.dotPick
                  ? Primary_color_for_dot
                  : Primary_color,
                height: `${value}px`
              }}
            >
              <div
                className="dot"
                key={idx}
                style={{
                  backgroundColor: Primary_color,
                  height: Primary_size,
                  width: Primary_size
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button
            id="shuffling"
            style={{
              position: "relative",
              top: `${(0 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.resetArray()}
          >
            Shuffling The Array
          </button>

          <button
            id="mode"
            style={{
              position: "relative",
              top: `${(0 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.selectMode()}
          >
            Change Mode
          </button>
          <button
            id="bubbleSort"
            style={{
              position: "relative",
              top: `${(2.5 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.bubbleSort()}
          >
            Bubble Sort
          </button>

          <button
            id="SelectionSort"
            style={{
              position: "relative",
              top: `${(2.5 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.bubbleSort()}
          >
            Selection Sort
          </button>
        </div>
      </>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Visualizer;
