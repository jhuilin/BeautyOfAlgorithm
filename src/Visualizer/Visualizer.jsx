import React from "react";
import "./Visualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getSelectionSortAnimations } from "../Algorithms/SelectionSort";
import { getQuickSortAnimations } from "../Algorithms/QuickSort";
import { getInsertionSortAnimations } from "../Algorithms/InsertionSort";
import { getMergeSortAnimations } from "../Algorithms/MergeSort";
import { getBinaryInsertionSortAnimations } from "../Algorithms/BinaryInsertionSort";
import { getRadixSortAnimations } from "../Algorithms/RadixSort";
import { getHeapSortAnimations } from "../Algorithms/HeapSort";

let window_width = window.innerWidth;
let window_height = window.innerHeight;
let size_of_array = parseInt(window_width / 4.1);

function reportWindowSize() {
  window_width = window.innerWidth;
  window_height = window.innerHeight;
  size_of_array = parseInt(window_width / 4.1);
}
window.onresize = reportWindowSize;

const Primary_color = "white";
const Secondary_color = "red";

const Primary_color_for_dot = "black";
const Primary_size = "1.5px";
const Secondary_size = "8px";
let Animation_speed_ms = 0.1;

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

  disableSortButtons(sortingAlgorithm) {
    document.getElementById("shuffling").disabled = true;
    const shuffButton = document.getElementById("shuffling").style;
    shuffButton.background = "black";
    shuffButton.color = "black";
    shuffButton.cursor = "default";

    document.getElementById("mode").disabled = true;
    const modeButton = document.getElementById("mode").style;
    modeButton.background = "black";
    modeButton.color = "black";
    modeButton.cursor = "default";

    document.getElementById("bubbleSort").disabled = true;
    const buttonStyle = document.getElementById("bubbleSort").style;
    buttonStyle.background = "black";
    buttonStyle.color = sortingAlgorithm === "BubbleSort" ? "#3e8e41" : "black";
    buttonStyle.cursor = "default";

    document.getElementById("selectionSort").disabled = true;
    const SelectionButton = document.getElementById("selectionSort").style;
    SelectionButton.background = "black";
    SelectionButton.color =
      sortingAlgorithm === "SelectionSort" ? "#3e8e41" : "black";
    SelectionButton.cursor = "default";

    document.getElementById("quickSort").disabled = true;
    const QuickButton = document.getElementById("quickSort").style;
    QuickButton.background = "black";
    QuickButton.color = sortingAlgorithm === "QuickSort" ? "#3e8e41" : "black";
    QuickButton.cursor = "default";

    document.getElementById("insertionSort").disabled = true;
    const InsertionButton = document.getElementById("insertionSort").style;
    InsertionButton.background = "black";
    InsertionButton.color =
      sortingAlgorithm === "InsertionSort" ? "#3e8e41" : "black";
    InsertionButton.cursor = "default";

    document.getElementById("mergeSort").disabled = true;
    const MergeButton = document.getElementById("mergeSort").style;
    MergeButton.background = "black";
    MergeButton.color = sortingAlgorithm === "MergeSort" ? "#3e8e41" : "black";
    MergeButton.cursor = "default";

    document.getElementById("binaryInsertionSort").disabled = true;
    const BinaryInsertionButton = document.getElementById("binaryInsertionSort")
      .style;
    BinaryInsertionButton.background = "black";
    BinaryInsertionButton.color =
      sortingAlgorithm === "BinaryInsertionSort" ? "#3e8e41" : "black";
    BinaryInsertionButton.cursor = "default";

    document.getElementById("radixSort").disabled = true;
    const RadixButton = document.getElementById("radixSort").style;
    RadixButton.background = "black";
    RadixButton.color = sortingAlgorithm === "RadixSort" ? "#3e8e41" : "black";
    RadixButton.cursor = "default";

    document.getElementById("heapSort").disabled = true;
    const heapButton = document.getElementById("heapSort").style;
    heapButton.background = "black";
    heapButton.color = sortingAlgorithm === "HeapSort" ? "#3e8e41" : "black";
    heapButton.cursor = "default";
  }

  restoreShffling() {
    document.getElementById("shuffling").disabled = false;
    const shuffButton = document.getElementById("shuffling").style;
    shuffButton.background = "#47535E";
    shuffButton.color = "white";
    shuffButton.cursor = "pointer";

    document.getElementById("mode").disabled = false;
    const modeButton = document.getElementById("mode").style;
    modeButton.background = "#47535E";
    modeButton.color = "white";
    modeButton.cursor = "pointer";
  }

  restoreButtons() {
    document.getElementById("bubbleSort").disabled = false;
    const buttonStyle = document.getElementById("bubbleSort").style;
    buttonStyle.background = "#47535E";
    buttonStyle.color = "white";
    buttonStyle.cursor = "pointer";

    document.getElementById("selectionSort").disabled = false;
    const SelectionButton = document.getElementById("selectionSort").style;
    SelectionButton.background = "#47535E";
    SelectionButton.color = "white";
    SelectionButton.cursor = "pointer";

    document.getElementById("quickSort").disabled = false;
    const QuickButton = document.getElementById("quickSort").style;
    QuickButton.background = "#47535E";
    QuickButton.color = "white";
    QuickButton.cursor = "pointer";

    document.getElementById("insertionSort").disabled = false;
    const InsertionButton = document.getElementById("insertionSort").style;
    InsertionButton.background = "#47535E";
    InsertionButton.color = "white";
    InsertionButton.cursor = "pointer";

    document.getElementById("mergeSort").disabled = false;
    const MergeButton = document.getElementById("mergeSort").style;
    MergeButton.background = "#47535E";
    MergeButton.color = "white";
    MergeButton.cursor = "pointer";

    document.getElementById("binaryInsertionSort").disabled = false;
    const BinaryInsertionButton = document.getElementById("binaryInsertionSort")
      .style;
    BinaryInsertionButton.background = "#47535E";
    BinaryInsertionButton.color = "white";
    BinaryInsertionButton.cursor = "pointer";

    document.getElementById("radixSort").disabled = false;
    const RadixButton = document.getElementById("radixSort").style;
    RadixButton.background = "#47535E";
    RadixButton.color = "white";
    RadixButton.cursor = "pointer";

    document.getElementById("heapSort").disabled = false;
    const heapButton = document.getElementById("heapSort").style;
    heapButton.background = "#47535E";
    heapButton.color = "white";
    heapButton.cursor = "pointer";
  }

  sort(sortingAlgorithm) {
    this.disableSortButtons(sortingAlgorithm);
    let animations = getBubbleSortAnimations(this.state.array);
    Animation_speed_ms = 0.15;
    if (sortingAlgorithm === "SelectionSort") {
      animations = getSelectionSortAnimations(this.state.array);
      Animation_speed_ms = 0.1;
    } else if (sortingAlgorithm === "QuickSort") {
      animations = getQuickSortAnimations(this.state.array);
      Animation_speed_ms = 0.8;
    } else if (sortingAlgorithm === "InsertionSort") {
      animations = getInsertionSortAnimations(this.state.array);
      Animation_speed_ms = 0.2;
    } else if (sortingAlgorithm === "MergeSort") {
      animations = getMergeSortAnimations(this.state.array);
      Animation_speed_ms = 1;
    } else if (sortingAlgorithm === "BinaryInsertionSort") {
      animations = getBinaryInsertionSortAnimations(this.state.array);
      Animation_speed_ms = 0.1;
    } else if (sortingAlgorithm === "RadixSort") {
      animations = getRadixSortAnimations(this.state.array);
      Animation_speed_ms = 0.8;
    } else if (sortingAlgorithm === "HeapSort") {
      animations = getHeapSortAnimations(this.state.array);
      Animation_speed_ms = 0.8;
    }
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      const dots = document.getElementsByClassName("dot");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparision1" ? Secondary_color : Primary_color;
        const size =
          animations[i][0] === "comparision1" && this.state.dotPick
            ? Secondary_size
            : Primary_size;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
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
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * Animation_speed_ms);
      }
    }
    const Restore_time = parseInt(Animation_speed_ms * animations.length);
    setTimeout(() => this.restoreShffling(), Restore_time);
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
              top: `${(0.01 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.selectMode()}
          >
            Change Display Mode
          </button>
          <button
            id="binaryInsertionSort"
            style={{
              position: "relative",
              top: `${(0.02 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("BinaryInsertionSort")}
          >
            Binary Insertion Sort
          </button>
          <button
            id="selectionSort"
            style={{
              position: "relative",
              top: `${(0.035 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("SelectionSort")}
          >
            Selection Sort
          </button>
          <button
            id="insertionSort"
            style={{
              position: "relative",
              top: `${(0.045 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("InsertionSort")}
          >
            Insertion Sort
          </button>
          <button
            id="bubbleSort"
            style={{
              position: "relative",
              top: `${(0.06 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("BubbleSort")}
          >
            Bubble Sort
          </button>
          <button
            id="mergeSort"
            style={{
              position: "relative",
              top: `${(0.07 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("MergeSort")}
          >
            Merge Sort
          </button>
          <button
            id="quickSort"
            style={{
              position: "relative",
              top: `${(0.08 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("QuickSort")}
          >
            Quick Sort
          </button>
          <button
            id="radixSort"
            style={{
              position: "relative",
              top: `${(0.095 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("RadixSort")}
          >
            Radix Sort
          </button>
          <button
            id="heapSort"
            style={{
              position: "relative",
              top: `${(0.11 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("HeapSort")}
          >
            Heap Sort
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
