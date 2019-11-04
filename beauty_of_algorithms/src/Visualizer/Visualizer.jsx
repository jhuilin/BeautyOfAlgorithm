import React from "react";
import "./Visualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";

let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200) / 8);

function reportWindowSize() {
  WINDOW_WIDTH = window.innerWidth;
  WINDOW_HEIGHT = window.innerHeight;
  NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200) / 8);
}
window.onresize = reportWindowSize;

const PRIMARY_COLOR = "white";
const SECONDARY_COLOR = "red";
const ANIMATION_SPEED_MS = 0.001;

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
      array: []
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  //Generates new random array
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(25, WINDOW_HEIGHT - 30));
    }
    this.setState({ array: array });
    this.restoreStoreButtons();
  }
  disableSortButtons() {
    document.getElementById("bubbleSort").disabled = true;
    // buttonStyle = document.getElementById("bubbleSort").style;
    // document.getElementById("bubbleSort").title = DISABLED_BUTTON;
    // buttonStyle.cursor = "default";
    // buttonStyle.background = "#000000";
  }
  restoreStoreButtons() {
    document.getElementById("bubbleSort").disabled = false;
    // buttonStyle = document.getElementById("bubbleSort").style;
    // document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
    // buttonStyle.background = "#47535E";
    // buttonStyle.cursor = "pointer";
  }
  bubbleSort() {
    this.disableSortButtons();
    const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
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
    // this.setState({array: sortArray})
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
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
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`
              }}
            ></div>
          ))}
        </div>

        <div className="buttons">
          <button
            title="Generates a new random array"
            style={{
              position: "relative",
              top: `${(0 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`
            }}
            onClick={() => this.resetArray()}
          >
            Generate New Array
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
