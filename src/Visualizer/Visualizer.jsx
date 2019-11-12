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
import { getCocktailSortAnimations } from "../Algorithms/CocktailSort";

let window_width = window.innerWidth;
let window_height = window.innerHeight;
let size_of_array = parseInt(window_width / 4.2);

function reportWindowSize() {
  window_width = window.innerWidth;
  window_height = window.innerHeight;
  size_of_array = parseInt(window_width / 4.2);
}
window.onresize = reportWindowSize;

const Primary_color = "white";
const Secondary_color = "red";

const Primary_color_for_dot = "black";
const Primary_size = "1.7px";
const Secondary_size = "8px";
let Animation_speed_ms = 0.1;

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      algorithmSets: [
        "Mode",
        "Shuffling",
        "BubbleSort",
        "SelectionSort",
        "QuickSort",
        "InsertionSort",
        "MergeSort",
        "BinaryInsertionSort",
        "RadixSort",
        "HeapSort",
        "CocktailSort"
      ],
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

  disableSortButtons(algorithmName) {
    for (let i = 0; i < this.state.algorithmSets.length; ++i) {
      document.getElementById(this.state.algorithmSets[i]).disabled = true;
      const buttonStyle = document.getElementById(this.state.algorithmSets[i])
        .style;
      buttonStyle.background = "black";
      buttonStyle.color =
        algorithmName === this.state.algorithmSets[i] ? "#3e8e41" : "black";
      buttonStyle.cursor = "default";
    }
  }

  restoreShffling() {
    document.getElementById("Shuffling").disabled = false;
    const shuffButton = document.getElementById("Shuffling").style;
    shuffButton.background = "#47535E";
    shuffButton.color = "white";
    shuffButton.cursor = "pointer";

    document.getElementById("Mode").disabled = false;
    const modeButton = document.getElementById("Mode").style;
    modeButton.background = "#47535E";
    modeButton.color = "white";
    modeButton.cursor = "pointer";
  }

  restoreButtons() {
    for (let i = 0; i < this.state.algorithmSets.length; ++i) {
      document.getElementById(this.state.algorithmSets[i]).disabled = false;
      const buttonStyle = document.getElementById(this.state.algorithmSets[i])
        .style;
      buttonStyle.background = "#47535E";
      buttonStyle.color = "white";
      buttonStyle.cursor = "pointer";
    }
  }

  sort(sortingAlgorithm) {
    this.disableSortButtons(sortingAlgorithm);
    let animations = getBubbleSortAnimations(this.state.array);
    Animation_speed_ms = 0.25;
    if (sortingAlgorithm === "SelectionSort") {
      animations = getSelectionSortAnimations(this.state.array);
      Animation_speed_ms = 0.3;
    } else if (sortingAlgorithm === "QuickSort") {
      animations = getQuickSortAnimations(this.state.array);
      Animation_speed_ms = 0.8;
    } else if (sortingAlgorithm === "InsertionSort") {
      animations = getInsertionSortAnimations(this.state.array);
      Animation_speed_ms = 0.4;
    } else if (sortingAlgorithm === "MergeSort") {
      animations = getMergeSortAnimations(this.state.array);
      Animation_speed_ms = 1.1;
    } else if (sortingAlgorithm === "BinaryInsertionSort") {
      animations = getBinaryInsertionSortAnimations(this.state.array);
      Animation_speed_ms = 0.25;
    } else if (sortingAlgorithm === "RadixSort") {
      animations = getRadixSortAnimations(this.state.array);
      Animation_speed_ms = 0.7;
    } else if (sortingAlgorithm === "HeapSort") {
      animations = getHeapSortAnimations(this.state.array);
      Animation_speed_ms = 0.7;
    } else if (sortingAlgorithm === "CocktailSort") {
      animations = getCocktailSortAnimations(this.state.array);
      Animation_speed_ms = 0.15;
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
            id="Shuffling"
            style={{
              position: "relative",
              top: `${(0 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.resetArray()}
          >
            Shuffling The Array
          </button>

          <button
            id="Mode"
            style={{
              position: "relative",
              top: `${(0.01 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.selectMode()}
          >
            Change Display Mode
          </button>
          <button
            id="BinaryInsertionSort"
            style={{
              position: "relative",
              top: `${(0.02 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("BinaryInsertionSort")}
          >
            Binary Insertion Sort
          </button>
          <button
            id="SelectionSort"
            style={{
              position: "relative",
              top: `${(0.035 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("SelectionSort")}
          >
            Selection Sort
          </button>
          <button
            id="InsertionSort"
            style={{
              position: "relative",
              top: `${(0.045 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("InsertionSort")}
          >
            Insertion Sort
          </button>
          <button
            id="CocktailSort"
            style={{
              position: "relative",
              top: `${(0.055 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("CocktailSort")}
          >
            Cocktail Sort
          </button>
          <button
            id="BubbleSort"
            style={{
              position: "relative",
              top: `${(0.07 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("BubbleSort")}
          >
            Bubble Sort
          </button>
          <button
            id="MergeSort"
            style={{
              position: "relative",
              top: `${(0.08 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("MergeSort")}
          >
            Merge Sort
          </button>
          <button
            id="QuickSort"
            style={{
              position: "relative",
              top: `${(0.095 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("QuickSort")}
          >
            Quick Sort
          </button>
          <button
            id="RadixSort"
            style={{
              position: "relative",
              top: `${(0.11 * (window_height - 20)) / Total_buttons}px`
            }}
            onClick={() => this.sort("RadixSort")}
          >
            Radix Sort
          </button>
          <button
            id="HeapSort"
            style={{
              position: "relative",
              top: `${(0.12 * (window_height - 20)) / Total_buttons}px`
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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Visualizer;
