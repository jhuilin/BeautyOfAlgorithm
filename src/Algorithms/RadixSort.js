import { isEqual } from "./helper/IsEqual";

export function getRadixSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  RadixSort(auxillaryArray, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}
function RadixSort(auxillaryArray, animations) {
  let count = [];
  let mx = auxillaryArray[0];
  let c = 0;
  for (let i = 0; i < auxillaryArray.length; ++i) {
    if (auxillaryArray[i] > mx) {
      mx = auxillaryArray[i];
    }
  }
  for (let m = 1; Math.floor(mx / m) > 0; m *= 10) {
    count = [[], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < auxillaryArray.length; i++) {
      let temp = Math.floor(auxillaryArray[i] / m) % 10;
      count[temp].push(auxillaryArray[i]);
      animations.push(["comparision1", i, temp]);
      animations.push(["comparision1", temp, i]);
      animations.push(["comparision2", i, temp]);
      animations.push(["comparision2", temp, i]);
    }
    c = 0;
    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < count[i].length; ++j) {
        animations.push(["comparision1", c, i + j]);
        animations.push(["comparision1", i + j, c]);
        animations.push(["comparision2", c, i + j]);
        animations.push(["comparision2", i + j, c]);
        animations.push(["swap", c, count[i][j]]);
        auxillaryArray[c] = count[i][j];
        ++c;
      }
    }
  }
}
