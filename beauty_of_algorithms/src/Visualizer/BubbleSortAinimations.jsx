import React from "react";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";

function BubbleSortAnimations() {
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
export default BubbleSortAnimations;
