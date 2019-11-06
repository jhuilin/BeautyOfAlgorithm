import { isEqual } from "./helper/IsEqual";

export function getMergeSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  MergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
  const sortedArray = array.slice().sort((a, b) => a - b);
  console.log("sort works correctly? ", isEqual(sortedArray, auxillaryArray));
  return animations;
}
function MergeSort(auxillaryArray, left, right, animations) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2);
    MergeSort(auxillaryArray, left, mid, animations);
    MergeSort(auxillaryArray, mid + 1, right, animations);
    Merge(auxillaryArray, left, mid, right, animations);
  }
}

function Merge(auxillaryArray, l, m, r, animations) {
  let left = auxillaryArray.slice(l, m + 1);
  let right = auxillaryArray.slice(m + 1, r + 1);
  let index = l;
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    // animations.push(["comparision1", i, j]);
    // animations.push(["comparision2", i, j]);
    if (left[i] < right[j]) {
      animations.push(["comparision1", index, i]);
      animations.push(["comparision2", index, i]);
      animations.push(["swap", index, left[i]]);
      auxillaryArray[index] = left[i];
      i += 1;
    } else {
      animations.push(["comparision1", index, j]);
      animations.push(["comparision2", index, j]);
      animations.push(["swap", index, right[j]]);
      auxillaryArray[index] = right[j];
      j += 1;
    }
    index += 1;
  }
  while (i < left.length) {
    animations.push(["swap", index, left[i]]);
    auxillaryArray[index] = left[i];
    i += 1;
    index += 1;
  }
  while (j < right.length) {
    animations.push(["swap", index, right[j]]);
    auxillaryArray[index] = right[j];
    j += 1;
    index += 1;
  }
}
