// Performance-ready algorithm implementations for complexity analysis
// These are simplified versions without visualization steps for accurate performance measurement

export const bubbleSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  
  return array;
};

export const insertionSortPerformance = (arr) => {
  const array = [...arr];
  
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = current;
  }
  
  return array;
};

export const selectionSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  
  return array;
};

export const quickSortPerformance = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }
  
  return [
    ...quickSortPerformance(left),
    ...equal,
    ...quickSortPerformance(right)
  ];
};

export const mergeSortPerformance = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  return merge(
    mergeSortPerformance(left),
    mergeSortPerformance(right)
  );
};

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

// ✅ Added Cocktail Shaker Sort performance implementation
export const cocktailShakerSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;
  
  while (swapped) {
    swapped = false;
    
    // Forward pass
    for (let i = start; i < end; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
    
    end--;
    swapped = false;
    
    // Backward pass
    for (let i = end; i > start; i--) {
      if (array[i] < array[i - 1]) {
        [array[i], array[i - 1]] = [array[i - 1], array[i]];
        swapped = true;
      }
    }
    
    start++;
  }
  
  return array;
};

// ✅ Added Counting Sort performance implementation
export const countingSortPerformance = (arr) => {
  if (arr.length === 0) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = [];
  
  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  // Build output array
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      output.push(i + min);
      count[i]--;
    }
  }
  
  return output;
};

// ✅ Added Heap Sort performance implementation
export const heapSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0);
  }
  
  return array;
};

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

export const linearSearchPerformance = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
};

export const binarySearchPerformance = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
};

// New performance implementations for missing algorithms

export const bucketSortPerformance = (arr) => {
  if (arr.length <= 1) return [...arr];
  
  const array = [...arr];
  const n = array.length;
  const max = Math.max(...array);
  const min = Math.min(...array);
  const bucketCount = Math.floor(Math.sqrt(n));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);
  
  // Create buckets
  const buckets = Array(bucketCount).fill().map(() => []);
  
  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(Math.floor((array[i] - min) / bucketSize), bucketCount - 1);
    buckets[bucketIndex].push(array[i]);
  }
  
  // Sort individual buckets and concatenate
  const result = [];
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      // Using insertion sort for individual buckets
      const sortedBucket = insertionSortPerformance(buckets[i]);
      result.push(...sortedBucket);
    }
  }
  
  return result;
};


export const introSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  const maxDepth = Math.floor(Math.log2(n)) * 2;
  introSortHelper(array, 0, n - 1, maxDepth);
  return array;
};

function introSortHelper(array, low, high, depthLimit) {
  const size = high - low + 1;
  
  if (size <= 16) {
    // Use insertion sort for small arrays
    insertionSortRange(array, low, high);
  } else if (depthLimit === 0) {
    // Use heap sort when depth limit is reached
    heapSortRange(array, low, high);
  } else {
    // Use quick sort
    if (low < high) {
      const pivot = partition(array, low, high);
      introSortHelper(array, low, pivot - 1, depthLimit - 1);
      introSortHelper(array, pivot + 1, high, depthLimit - 1);
    }
  }
}

function insertionSortRange(array, low, high) {
  for (let i = low + 1; i <= high; i++) {
    const key = array[i];
    let j = i - 1;
    
    while (j >= low && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = key;
  }
}

function heapSortRange(array, low, high) {
  // Build max heap
  for (let i = Math.floor((high + low) / 2) - 1; i >= low; i--) {
    heapifyRange(array, low, high, i);
  }
  
  // Extract elements from heap one by one
  for (let i = high; i > low; i--) {
    [array[low], array[i]] = [array[i], array[low]];
    heapifyRange(array, low, i - 1, low);
  }
}

function heapifyRange(array, low, high, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left <= high && array[left] > array[largest]) {
    largest = left;
  }
  
  if (right <= high && array[right] > array[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    heapifyRange(array, low, high, largest);
  }
}

function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

export const jumpSearchPerformance = (arr, target) => {
  const array = [...arr];
  const n = array.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  // Jump through the array until we find an element greater than target
  while (array[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  // Linear search within the block
  while (array[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  
  // Check if element is found
  if (array[prev] === target) return prev;
  
  return -1;
};

export const radixSortPerformance = (arr) => {
  if (arr.length <= 1) return [...arr];
  
  const array = [...arr];
  const max = Math.max(...array);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp);
  }
  
  return array;
};

function countingSortByDigit(array, exp) {
  const n = array.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] so that count[i] now contains actual
  // position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    count[digit]--;
  }
  
  // Copy the output array to array[], so that array[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
}

export const shellSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        array[j] = array[j - gap];
      }
      
      // Put temp (the original array[i]) in its correct location
      array[j] = temp;
    }
  }
  
  return array;
};

export const sleepSortPerformance = (arr) => {
  // Sleep sort is not suitable for performance testing as it relies on setTimeout
  // Returning a simple sorted array using built-in sort for performance testing
  return [...arr].sort((a, b) => a - b);
};

export const timSortPerformance = (arr) => {
  // Simplified TimSort implementation
  const array = [...arr];
  const RUN = 32;
  
  // Sort individual subarrays of size RUN
  for (let i = 0; i < array.length; i += RUN) {
    insertionSortRange(array, i, Math.min((i + RUN - 1), (array.length - 1)));
  }
  
  // Start merging from size RUN (or 32). It will merge to form size 64, then 128, 256 and so on...
  for (let size = RUN; size < array.length; size = 2 * size) {
    // Pick starting point of left sub array. We are going to merge array[left..left+size-1]
    // and array[left+size, left+2*size-1]. After every merge, we increase left by 2*size
    for (let left = 0; left < array.length; left += 2 * size) {
      // Find ending point of left sub array
      // mid+1 is starting point of right sub array
      const mid = left + size - 1;
      const right = Math.min((left + 2 * size - 1), (array.length - 1));
      
      // Merge sub array array[left.....mid] & array[mid+1....right]
      if (mid < right) {
        mergeRange(array, left, mid, right);
      }
    }
  }
  
  return array;
};

function mergeRange(array, l, m, r) {
  // Original array is broken in two parts: left and right array
  const leftArray = array.slice(l, m + 1);
  const rightArray = array.slice(m + 1, r + 1);
  
  let i = 0, j = 0, k = l;
  
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
  }
  
  // Store remaining elements of leftArray[] if any
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    k++;
    i++;
  }
  
  // Store remaining elements of rightArray[] if any
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    k++;
    j++;
  }
}

export const exponentialSearchPerformance = (arr, target) => {
  const array = [...arr];
  const n = array.length;
  
  // If first element is the target
  if (array[0] === target) return 0;
  
  // Find range for binary search by repeated doubling
  let i = 1;
  while (i < n && array[i] <= target) {
    i = i * 2;
  }
  
  // Call binary search for the found range
  return binarySearchRange(array, Math.floor(i / 2), Math.min(i, n - 1), target);
};

function binarySearchRange(array, left, right, target) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
};

export const fibonacciSearchPerformance = (arr, target) => {
  const array = [...arr];
  const n = array.length;
  
  let fibMMm2 = 0; // (m-2)'th Fibonacci No.
  let fibMMm1 = 1; // (m-1)'th Fibonacci No.
  let fibM = fibMMm2 + fibMMm1; // m'th Fibonacci
  
  // fibM is going to store the smallest Fibonacci Number greater than or equal to n
  while (fibM < n) {
    fibMMm2 = fibMMm1;
    fibMMm1 = fibM;
    fibM = fibMMm2 + fibMMm1;
  }
  
  // Marks the eliminated range from front
  let offset = -1;
  
  // While there are elements to be inspected. Note that we compare array[fibMMm2] with target.
  // When fibM becomes 1, fibMMm2 becomes 0
  while (fibM > 1) {
    // Check if fibMMm2 is a valid location
    const i = Math.min(offset + fibMMm2, n - 1);
    
    // If target is greater than the value at index fibMMm2, cut the subarray from offset to i
    if (array[i] < target) {
      fibM = fibMMm1;
      fibMMm1 = fibMMm2;
      fibMMm2 = fibM - fibMMm1;
      offset = i;
    }
    // If target is less than the value at index fibMMm2, cut the subarray after i+1
    else if (array[i] > target) {
      fibM = fibMMm2;
      fibMMm1 = fibMMm1 - fibMMm2;
      fibMMm2 = fibM - fibMMm1;
    }
    // Element found. Return index
    else {
      return i;
    }
  }
  
  // Comparing the last element with target
  if (fibMMm1 && offset + 1 < n && array[offset + 1] === target) {
    return offset + 1;
  }
  
  // Element not found. Return -1
  return -1;
};

export const ternarySearchPerformance = (arr, target) => {
  const array = [...arr];
  return ternarySearchHelper(array, 0, array.length - 1, target);
};

function ternarySearchHelper(array, left, right, target) {
  if (left > right) return -1;
  
  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);
  
  if (array[mid1] === target) return mid1;
  if (array[mid2] === target) return mid2;
  
  if (target < array[mid1]) {
    return ternarySearchHelper(array, left, mid1 - 1, target);
  } else if (target > array[mid2]) {
    return ternarySearchHelper(array, mid2 + 1, right, target);
  } else {
    return ternarySearchHelper(array, mid1 + 1, mid2 - 1, target);
  }
};

// Algorithm map for easy access
export const performanceAlgorithms = {
  "Bubble Sort": bubbleSortPerformance,
  "Insertion Sort": insertionSortPerformance,
  "Selection Sort": selectionSortPerformance,
  "Quick Sort": quickSortPerformance,
  "Merge Sort": mergeSortPerformance,
  "Cocktail Shaker Sort": cocktailShakerSortPerformance, // ✅ Added
  "Counting Sort": countingSortPerformance,             // ✅ Added
  "Heap Sort": heapSortPerformance,                     // ✅ Added
  "Linear Search": linearSearchPerformance,
  "Binary Search": binarySearchPerformance,
  "Bucket Sort": bucketSortPerformance,

  "Intro Sort": introSortPerformance,
  "Jump Search": jumpSearchPerformance,
  "Radix Sort": radixSortPerformance,
  "Shell Sort": shellSortPerformance,
  "Sleep Sort": sleepSortPerformance,
  "Tim Sort": timSortPerformance,
  "Exponential Search": exponentialSearchPerformance,
  "Fibonacci Search": fibonacciSearchPerformance,
  "Ternary Search": ternarySearchPerformance
};