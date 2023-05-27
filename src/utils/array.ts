export function getRandomElementsFromArray<T>(arr: T[], n: number) {
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Return the first n elements of the shuffled array
  return arr.slice(0, n);
}

type ElementsArray = {
  [key: string]: any;
  category: string;
}[];

const MAX_QUESTION_PER_CATEGORY = 2;

export function getRandomElementsPerCategory(
  A: ElementsArray,
  weighting: { [category: string]: number }
) {
  console.log({ weighting });
  const result: ElementsArray = [];

  // Create a map to track the count of selected elements for each category
  const categoryCountMap: Map<string, number> = new Map();

  // Shuffle array A randomly
  const shuffledA = A.slice().sort(() => Math.random() - 0.5);

  // Iterate over each item in the shuffled array A
  for (const item of shuffledA) {
    const { category } = item;
    console.log({
      categoryCountMap,
    });
    // Check if the maximum limit of MAX_QUESTION_PER_CATEGORY elements per category has been reached
    if (
      categoryCountMap.get(category) != null &&
      categoryCountMap.get(category) ===
        Math.ceil(weighting[category] * MAX_QUESTION_PER_CATEGORY)
    ) {
      continue; // Skip to the next item if the limit is reached
    }

    // Add the item to the result array
    result.push(item);

    // Increment the count of selected elements for the category
    categoryCountMap.set(category, (categoryCountMap.get(category) || 0) + 1);
  }

  return result;
}
