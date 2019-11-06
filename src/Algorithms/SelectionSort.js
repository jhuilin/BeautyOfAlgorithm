import { isEqual } from "./helper/IsEqual";
import { swap } from "./helper/swap";

export function getSelectionSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  selectionSort(auxillaryArray, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}

function selectionSort(auxillaryArray, animations) {
  const length = auxillaryArray.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      animations.push(["comparision1", j, minIndex]);
      animations.push(["comparision1", minIndex, j]);
      animations.push(["comparision2", j, minIndex]);
      animations.push(["comparision2", minIndex, j]);

      if (auxillaryArray[j] < auxillaryArray[minIndex]) {
        minIndex = j;
      }
    }
    animations.push(["comparision1", i, minIndex]);
    animations.push(["comparision1", minIndex, i]);
    animations.push(["comparision2", i, minIndex]);
    animations.push(["comparision2", minIndex, i]);
    animations.push(["swap", minIndex, auxillaryArray[i]]);
    animations.push(["swap", i, auxillaryArray[minIndex]]);
    // Swap the found minimum element with the first element
    swap(auxillaryArray, minIndex, i);
  }
}
