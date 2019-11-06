import { isEqual } from "./helper/IsEqual";
import { swap } from "./helper/swap";

export function getQuickSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}

function quickSort(auxillaryArray, startIndex, endIndex, animations) {
  let pivotIndex;
  if (startIndex < endIndex) {
    pivotIndex = partitionArray(
      auxillaryArray,
      startIndex,
      endIndex,
      animations
    );
    quickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
    quickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
  }
}

function partitionArray(auxillaryArray, startIndex, endIndex, animations) {
  let pivot = auxillaryArray[endIndex];
  let pivotIndex = startIndex;
  for (let i = startIndex; i <= endIndex - 1; i++) {
    animations.push(["comparision1", i, endIndex]);
    animations.push(["comparision1", endIndex, i]);
    animations.push(["comparision2", i, endIndex]);
    animations.push(["comparision2", endIndex, i]);

    animations.push(["comparision1", i, pivotIndex]);
    animations.push(["comparision1", pivotIndex, i]);
    animations.push(["comparision2", i, pivotIndex]);
    animations.push(["comparision2", pivotIndex, i]);

    if (auxillaryArray[i] <= pivot) {
      //Swap these two heights
      animations.push(["swap", i, auxillaryArray[pivotIndex]]);
      animations.push(["swap", pivotIndex, auxillaryArray[i]]);
      swap(auxillaryArray, i, pivotIndex);
      pivotIndex++;
    }
  }
  //Swap these two heights
  animations.push(["swap", pivotIndex, auxillaryArray[endIndex]]);
  animations.push(["swap", endIndex, auxillaryArray[pivotIndex]]);
  swap(auxillaryArray, pivotIndex, endIndex);
  return pivotIndex;
}
