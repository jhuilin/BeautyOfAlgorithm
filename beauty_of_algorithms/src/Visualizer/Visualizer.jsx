import React from "react";
import "./Visualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";

let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let SIZE_OF_ARRAY = parseInt((WINDOW_WIDTH - 30) / 8);

function reportWindowSize() {
  WINDOW_WIDTH = window.innerWidth;
  WINDOW_HEIGHT = window.innerHeight;
  SIZE_OF_ARRAY = parseInt((WINDOW_WIDTH - 30) / 8);
}
window.onresize = reportWindowSize;

const PRIMARY_COLOR = "white";
const SECONDARY_COLOR = "red";

const PRIMARY_COLOR_FOR_DOT = "black";
const DOT_PRIMARY_COLOR = "white";
const DEFAULT_SIZE = "2px";
const CHANGE_SIZE = "8px";
const ANIMATION_SPEED_MS = 0.4;

//Tooltips for buttons
const DISABLED_BUTTON = "Currently Disabled";
const ENABLED_BUTTON = {
  nlogn: "O(NlogN) Time Complexity",
  nSquare: "O(N^2) Time Complexity"
};

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      dotPick: false
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  select() {
    this.setState({
      dotPick: !this.state.dotPick
    });
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < SIZE_OF_ARRAY; i++) {
      array.push(randomIntFromInterval(25, WINDOW_HEIGHT - 30));
    }
    this.setState({ array: array });
    this.restoreStoreButtons();
  }
  disableSortButtons() {
    document.getElementById("bubbleSort").disabled = true;
    const buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "black";
  }
  restoreStoreButtons() {
    document.getElementById("bubbleSort").disabled = false;
    const buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#47535E";
    buttonStyle.cursor = "pointer";
  }
  bubbleSort() {
    this.disableSortButtons();
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      const dots = document.getElementsByClassName("dot");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : DOT_PRIMARY_COLOR;
        const size = i % 4 === 0 ? CHANGE_SIZE : DEFAULT_SIZE;
        const [barOneIndex, barTwoIndex] = animations[i];
        const dotOne = dots[barOneIndex].style;
        const dotTwo = dots[barTwoIndex].style;

        // const barOneStyle = arrayBars[barOneIndex].style;
        // const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          // barOneStyle.backgroundColor = color;
          // barTwoStyle.backgroundColor = color;
          dotOne.backgroundColor = color;
          dotOne.height = size;
          dotOne.width = size;
          dotTwo.backgroundColor = color;
          dotTwo.height = size;
          dotTwo.width = size;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    // const RESTORE_TIME = parseInt(
    //   (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    // );
    // setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  render() {
    const array = this.state.array;
    const SORT_BUTTONS = 6;
    const TOTAL_BUTTONS = 1 + SORT_BUTTONS;
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
                backgroundColor: PRIMARY_COLOR_FOR_DOT,
                height: `${value}px`
              }}
            >
              <div
                className="dot"
                key={idx}
                style={{
                  backgroundColor: DOT_PRIMARY_COLOR,
                  height: DEFAULT_SIZE,
                  width: DEFAULT_SIZE
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button
            title="Generate a new array"
            style={{
              position: "relative",
              top: `${(0 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`
            }}
            onClick={() => this.resetArray()}
          >
            Shuffling The Array
          </button>

          <button
            title="Display in Dots or Bars"
            style={{
              position: "relative",
              top: `${(0 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`
            }}
            onClick={() => this.select()}
          >
            Change Mode
          </button>

          <button
            title="O(N^2) Time Complexity"
            id="bubbleSort"
            style={{
              position: "relative",
              top: `${(2.5 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`
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

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Visualizer;
