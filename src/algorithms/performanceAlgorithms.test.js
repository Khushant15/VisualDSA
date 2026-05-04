// Test file for performance algorithms
import { performanceAlgorithms } from './performanceAlgorithms';

// Test data
const testArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = [11, 12, 22, 25, 34, 64, 90];
const searchArray = [11, 12, 22, 25, 34, 64, 90]; // Must be sorted for search algorithms
const target = 25;

// Test sorting algorithms
console.log('Testing sorting algorithms...');

// Test Bubble Sort
const bubbleSortResult = performanceAlgorithms["Bubble Sort"](testArray);
console.log('Bubble Sort Result:', bubbleSortResult);
console.log('Bubble Sort Correct:', JSON.stringify(bubbleSortResult) === JSON.stringify(sortedArray));

// Test Insertion Sort
const insertionSortResult = performanceAlgorithms["Insertion Sort"](testArray);
console.log('Insertion Sort Result:', insertionSortResult);
console.log('Insertion Sort Correct:', JSON.stringify(insertionSortResult) === JSON.stringify(sortedArray));

// Test Selection Sort
const selectionSortResult = performanceAlgorithms["Selection Sort"](testArray);
console.log('Selection Sort Result:', selectionSortResult);
console.log('Selection Sort Correct:', JSON.stringify(selectionSortResult) === JSON.stringify(sortedArray));

// Test Quick Sort
const quickSortResult = performanceAlgorithms["Quick Sort"](testArray);
console.log('Quick Sort Result:', quickSortResult);
console.log('Quick Sort Correct:', JSON.stringify(quickSortResult) === JSON.stringify(sortedArray));

// Test Merge Sort
const mergeSortResult = performanceAlgorithms["Merge Sort"](testArray);
console.log('Merge Sort Result:', mergeSortResult);
console.log('Merge Sort Correct:', JSON.stringify(mergeSortResult) === JSON.stringify(sortedArray));

// Test new sorting algorithms
console.log('\nTesting new sorting algorithms...');

// Test Bucket Sort
const bucketSortResult = performanceAlgorithms["Bucket Sort"](testArray);
console.log('Bucket Sort Result:', bucketSortResult);
console.log('Bucket Sort Correct:', JSON.stringify(bucketSortResult) === JSON.stringify(sortedArray));

// Test Cocktail Shaker Sort
const cocktailShakerSortResult = performanceAlgorithms["Cocktail Shaker Sort"](testArray);
console.log('Cocktail Shaker Sort Result:', cocktailShakerSortResult);
console.log('Cocktail Shaker Sort Correct:', JSON.stringify(cocktailShakerSortResult) === JSON.stringify(sortedArray));

// Test Counting Sort
const countingSortResult = performanceAlgorithms["Counting Sort"](testArray);
console.log('Counting Sort Result:', countingSortResult);
console.log('Counting Sort Correct:', JSON.stringify(countingSortResult) === JSON.stringify(sortedArray));

// Test Heap Sort
const heapSortResult = performanceAlgorithms["Heap Sort"](testArray);
console.log('Heap Sort Result:', heapSortResult);
console.log('Heap Sort Correct:', JSON.stringify(heapSortResult) === JSON.stringify(sortedArray));

// Test Intro Sort
const introSortResult = performanceAlgorithms["Intro Sort"](testArray);
console.log('Intro Sort Result:', introSortResult);
console.log('Intro Sort Correct:', JSON.stringify(introSortResult) === JSON.stringify(sortedArray));

// Test Radix Sort
const radixSortResult = performanceAlgorithms["Radix Sort"](testArray);
console.log('Radix Sort Result:', radixSortResult);
console.log('Radix Sort Correct:', JSON.stringify(radixSortResult) === JSON.stringify(sortedArray));

// Test Shell Sort
const shellSortResult = performanceAlgorithms["Shell Sort"](testArray);
console.log('Shell Sort Result:', shellSortResult);
console.log('Shell Sort Correct:', JSON.stringify(shellSortResult) === JSON.stringify(sortedArray));

// Test Sleep Sort
const sleepSortResult = performanceAlgorithms["Sleep Sort"](testArray);
console.log('Sleep Sort Result:', sleepSortResult);
console.log('Sleep Sort Correct:', JSON.stringify(sleepSortResult) === JSON.stringify(sortedArray));

// Test Tim Sort
const timSortResult = performanceAlgorithms["Tim Sort"](testArray);
console.log('Tim Sort Result:', timSortResult);
console.log('Tim Sort Correct:', JSON.stringify(timSortResult) === JSON.stringify(sortedArray));

// Test searching algorithms
console.log('\nTesting searching algorithms...');

// Test Linear Search
const linearSearchResult = performanceAlgorithms["Linear Search"](searchArray, target);
console.log('Linear Search Result:', linearSearchResult);
console.log('Linear Search Correct:', linearSearchResult === 3);

// Test Binary Search
const binarySearchResult = performanceAlgorithms["Binary Search"](searchArray, target);
console.log('Binary Search Result:', binarySearchResult);
console.log('Binary Search Correct:', binarySearchResult === 3);

// Test new searching algorithms
console.log('\nTesting new searching algorithms...');

// Test Jump Search
const jumpSearchResult = performanceAlgorithms["Jump Search"](searchArray, target);
console.log('Jump Search Result:', jumpSearchResult);
console.log('Jump Search Correct:', jumpSearchResult === 3);

// Test Exponential Search
const exponentialSearchResult = performanceAlgorithms["Exponential Search"](searchArray, target);
console.log('Exponential Search Result:', exponentialSearchResult);
console.log('Exponential Search Correct:', exponentialSearchResult === 3);

// Test Fibonacci Search
const fibonacciSearchResult = performanceAlgorithms["Fibonacci Search"](searchArray, target);
console.log('Fibonacci Search Result:', fibonacciSearchResult);
console.log('Fibonacci Search Correct:', fibonacciSearchResult === 3);

// Test Ternary Search
const ternarySearchResult = performanceAlgorithms["Ternary Search"](searchArray, target);
console.log('Ternary Search Result:', ternarySearchResult);
console.log('Ternary Search Correct:', ternarySearchResult === 3);

console.log('\nAll tests completed!');