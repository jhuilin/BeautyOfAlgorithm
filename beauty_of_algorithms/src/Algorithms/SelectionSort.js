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
      animations.push([j, minIndex]);
      animations.push([j, minIndex]);
      if (auxillaryArray[j] < auxillaryArray[minIndex]) {
        minIndex = j;
      }
    }
    animations.push([minIndex, auxillaryArray[i]]);
    animations.push([i, auxillaryArray[minIndex]]);
    // Swap the found minimum element with the first element
    swap(auxillaryArray, minIndex, i);
  }
}
