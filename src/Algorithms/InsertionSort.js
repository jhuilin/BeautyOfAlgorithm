import { isEqual } from "./helper/IsEqual";
import { swap } from "./helper/swap";
export function getInsertionSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  insertionSort(auxillaryArray, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}

function insertionSort(auxillaryArray, animations) {
  let length = auxillaryArray.length;
  for (let i = 1; i < length; i++) {
    let j = i;
    while (j > 0 && auxillaryArray[j] < auxillaryArray[j - 1]) {
      animations.push(["comparision1", j - 1, j]);
      animations.push(["comparision2", j - 1, j]);
      animations.push(["swap", j - 1, auxillaryArray[j]]);
      animations.push(["swap", j, auxillaryArray[j - 1]]);
      swap(auxillaryArray, j - 1, j);
      j -= 1;
    }
  }
}
