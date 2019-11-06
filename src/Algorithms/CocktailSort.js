import { isEqual } from "./helper/IsEqual";
import { swap } from "./helper/swap";
export function getCocktailSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  cocktailSort(auxillaryArray, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}
function cocktailSort(auxillaryArray, animations) {
  let swapped = true;
  let start = 0;
  let end = auxillaryArray.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      animations.push(["comparision1", i, i + 1]);
      animations.push(["comparision1", i + 1, i]);
      animations.push(["comparision2", i, i + 1]);
      animations.push(["comparision2", i + 1, i]);
      if (auxillaryArray[i] > auxillaryArray[i + 1]) {
        animations.push(["swap", i, auxillaryArray[i + 1]]);
        animations.push(["swap", i + 1, auxillaryArray[i]]);
        swap(auxillaryArray, i, i + 1);
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
    swapped = false;
    --end;
    for (let i = end - 1; i >= start; --i) {
      animations.push(["comparision1", i, i + 1]);
      animations.push(["comparision1", i + 1, i]);
      animations.push(["comparision2", i, i + 1]);
      animations.push(["comparision2", i + 1, i]);
      if (auxillaryArray[i] > auxillaryArray[i + 1]) {
        animations.push(["swap", i, auxillaryArray[i + 1]]);
        animations.push(["swap", i + 1, auxillaryArray[i]]);
        swap(auxillaryArray, i, i + 1);
        swapped = true;
      }
    }
    start++;
  }
}
