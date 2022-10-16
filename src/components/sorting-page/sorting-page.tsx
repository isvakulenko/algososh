import React from "react";
import { useState, useEffect } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<string>("select");
  const [initialArr, setInitialArr] = useState<number[]>([]);
  const [inExecute, setinExecute] = useState(false);

  enum Direction {
    Ascending = "ascending",
    Descending = "descending",
  }
  const randomArr = (): number[] => {
    //Минимальнная длинна массива
    const minLen = 3;
    //Максимальная длинна массива
    const maxLen = 17;
    // Максимальное число в массиве
    const maxNum = 100;
    // Максимальное число в массиве
    const minNum = 0;
    //Выберем длинну массива
    const arrLen = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
    console.log(arrLen);
    let arr = [];
    for (let i = 0; i <= arrLen - 1; i++) {
      //Случайное число для массива
      let randNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
      arr.push(randNum);
    }
    // Чтобы не было повторов
    return Array.from(new Set(arr));
  };
  const swap = (
    arr: number[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const generateNewArray = () => {
    setInitialArr(randomArr());
    console.log(initialArr);
  };

  // При первоначальной загрузки страницы отобразим произвольный массив
  useEffect(() => {
    generateNewArray();
  }, []);

  const getBubbleSortSteps = (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
      let swapped = false;
      let sortState: number[][] = [[...arr]];
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] < arr[j + 1]) {
          swap(arr, j, j + 1);
          sortState.push([...arr]);
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
    }
    return arr;
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <RadioInput
          label="Выбор"
          value="select"
          onChange={() => setSortingType("select")}
          checked={sortingType === "select"}
          extraClass={styles.radio}
        ></RadioInput>
        <RadioInput
          label="Пузырёк"
          value="bubble"
          onChange={() => setSortingType("bubble")}
          checked={sortingType === "bubble"}
        ></RadioInput>
        <Button
          sorting={Direction.Ascending}
          type="button"
          text={"По возрастанию"}
          // onClick={() => sortArr(Direction.Ascending)}
          // isLoader={sortDirection === Direction.Ascending && isExecute}
          // disabled={sortDirection !== Direction.Ascending && isExecute}
        ></Button>
        <Button
          type="button"
          text={"По убыванию"}
          sorting={Direction.Ascending}
          //     onClick={() => sortArr(Direction.Descending)}
          // isLoader={sortDirection === Direction.Descending && isExecute}
          // disabled={sortDirection !== Direction.Descending && isExecute}
        ></Button>
        <Button
          text={"Новый массив"}
          onClick={() => generateNewArray()}
          // disabled={isExecute}
          type="button"
        ></Button>
      </div>
      <div>
        <ul className={styles.list}>
          {initialArr &&
            initialArr.map((item, index) => {
              return (
              <li key={index}>
                <Column index={item} />
              </li>)
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
