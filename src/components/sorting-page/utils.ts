import { Direction } from "../../types/direction";


type TColumn = {
  renderArray: number[];
  leftIndex?: number;
  rightIndex?: number;
};

//Функция для выполнения перестановок в массиве
export const swap = (
  arr: number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

// Функция раскладывает сортировку массива методом выбора по шагам 
export const getSelectSortSteps = (arr: number[], direction: Direction): TColumn[] => {
  //сюда будем вставлять промежуточные результаты сортировки
  const sortStep: TColumn[] = [];
  const { length } = arr;
  if (length === 0) {
    return [{ renderArray: [] }]
  } else if (length === 1) {
    return [{ renderArray: arr }]
  } else {
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let k = i + 1; k < length; k++) {
        if (
          direction === Direction.Ascending
            ? arr[k] < arr[minInd]
            : arr[k] > arr[minInd]
        ) {
          minInd = k;
        }
      }
      if (minInd !== i) {
        swap(arr, i, minInd);
        // после каждого случая перестановки чисел записываем промежуточные
        //массивы в объект
        sortStep.push({
          renderArray: [...arr],
          leftIndex: i,
          rightIndex: minInd,
        });
         }
    }
    return sortStep;

  }
};

// Функция раскладывает сортировку массива методом пузырька по шагам 
export const getBubbleSortSteps = (
  arr: number[],
  direction: Direction
): TColumn[] => {
  //сюда будем вставлять промежуточные результаты сортировки
  const sortStep: TColumn[] = [];
  const { length } = arr;
  if (length === 0) {
    return [{ renderArray: [] }]
  } else if (length === 1) {
    return [{ renderArray: arr }]
  } else { 

    for (let i = 0; i < arr.length; i++) {
      let swapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (
          direction === Direction.Ascending
            ? arr[j] > arr[j + 1]
            : arr[j] < arr[j + 1]
        ) {
          swap(arr, j, j + 1);
          swapped = true;
        }
        // после каждого случая перестановки чисел записываем промежуточные
        //массивы в объект
        sortStep.push({
          renderArray: [...arr],
          leftIndex: j,
          rightIndex: j + 1,
        });
      }
      if (!swapped) {
        break;
      }
    }
    return sortStep;
  }
};