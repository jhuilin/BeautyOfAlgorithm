import { isEqual } from "./helper/IsEqual";

export function getBinaryInsertionSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  binaryInsertionSort(auxillaryArray, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}
function binaryInsertionSort(auxillaryArray, animations) {
  let i, loc, j, selected;
  for (i = 1; i < auxillaryArray.length; i++) {
    j = i - 1;
    selected = auxillaryArray[i];
    loc = binarySearch(auxillaryArray, selected, 0, j);
    while (j >= loc) {
      animations.push(["comparision1", j, loc]);
      animations.push(["comparision1", loc, j]);
      animations.push(["comparision2", j, loc]);
      animations.push(["comparision2", loc, j]);
      animations.push(["swap", j + 1, auxillaryArray[j]]);
      auxillaryArray[j + 1] = auxillaryArray[j];
      j -= 1;
    }
    animations.push(["swap", j + 1, selected]);
    auxillaryArray[j + 1] = selected;
  }
}
function binarySearch(auxillaryArray, item, low, high) {
  if (high <= low) {
    if (item > auxillaryArray[low]) {
      return low + 1;
    }
    return low;
  }
  let mid = Math.floor((high + low) / 2);
  if (item === auxillaryArray[mid]) {
    return mid + 1;
  }
  if (item > auxillaryArray[mid]) {
    return binarySearch(auxillaryArray, item, mid + 1, high);
  }
  return binarySearch(auxillaryArray, item, low, mid - 1);
}
