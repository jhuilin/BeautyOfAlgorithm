import { isEqual } from "./helper/IsEqual";
import { swap } from "./helper/swap";

export function getHeapSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  let length = auxillaryArray.length;
  HeapSort(auxillaryArray, length, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}

function HeapSort(auxillaryArray, size, animations) {
  let left, right, j, newJ;
  for (let i = Math.floor(size / 2 - 1); i >= 0; --i) {
    animations.push(["comparision1", i, 0]);
    j = newJ = i;
    while (j < size) {
      newJ = j;
      left = j * 2 + 1;
      right = j * 2 + 2;
      if (left < size && auxillaryArray[left] > auxillaryArray[newJ]) {
        newJ = left;
        animations.push(["comparision1", newJ, left]);
        animations.push(["comparision2", newJ, left]);
      }
      if (right < size && auxillaryArray[right] > auxillaryArray[newJ]) {
        newJ = right;
        animations.push(["comparision1", newJ, right]);
        animations.push(["comparision2", newJ, right]);
      }
      if (newJ !== j) {
        animations.push(["swap", j, auxillaryArray[newJ]]);
        animations.push(["swap", newJ, auxillaryArray[j]]);
        swap(auxillaryArray, j, newJ);
        j = newJ;
      } else {
        break;
      }
    }
    animations.push(["comparision2", i, 0]);
  }
  for (let i = size - 1; i >= 0; --i) {
    animations.push(["comparision1", i, 0]);
    animations.push(["swap", 0, auxillaryArray[i]]);
    animations.push(["swap", i, auxillaryArray[0]]);
    swap(auxillaryArray, i, 0);
    j = newJ = 0;
    while (j < i) {
      newJ = j;
      left = j * 2 + 1;
      right = j * 2 + 2;
      if (left < i && auxillaryArray[left] > auxillaryArray[newJ]) {
        animations.push(["comparision1", newJ, left]);
        animations.push(["comparision2", newJ, left]);
        newJ = left;
      }
      if (right < i && auxillaryArray[right] > auxillaryArray[newJ]) {
        animations.push(["comparision1", newJ, right]);
        animations.push(["comparision2", newJ, right]);

        newJ = right;
      }
      if (newJ !== j) {
        animations.push(["comparision1", j, newJ]);
        animations.push(["comparision2", j, newJ]);
        animations.push(["swap", j, auxillaryArray[newJ]]);
        animations.push(["swap", newJ, auxillaryArray[j]]);
        swap(auxillaryArray, newJ, j);
        j = newJ;
      } else {
        break;
      }
    }
    animations.push(["comparision2", i, 0]);
  }
}
