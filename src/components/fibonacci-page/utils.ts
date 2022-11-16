// Функция формирует массив с числами Фибоначчи
export const getFibonacciNumbersArr = (n: number) => {
  let FibonacciNumbers: number[] = [0, 1];
  if (n === 1) {
    return FibonacciNumbers.slice(0, 1);
  } else if (n === 2) {
    return FibonacciNumbers;
  } else {
    for (let i = 2; i < n + 1; i++) {
      FibonacciNumbers.push(
        FibonacciNumbers[i - 2] + FibonacciNumbers[i - 1]
      );
    }
  }
  return FibonacciNumbers;
};