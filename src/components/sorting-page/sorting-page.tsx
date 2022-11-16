import React from "react";
import { useState, useEffect } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import {getSelectSortSteps, getBubbleSortSteps } from "./utils";


type TColumn = {
  renderArray: number[];
  leftIndex?: number;
  rightIndex?: number;
};

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<string>("select");
  const [sortDirection, setSortDirection] = useState<Direction>();
  const [initialArr, setInitialArr] = useState<Array<number>>([]);
  const [sortStepArr, setSortStepArr] = useState<Array<TColumn>>([]);
  // Номер текущего шага
  const [currentStep, setCurrentStep] = useState(0);
  const [isExecute, setIsExecute] = useState(false);

  const randomArr = () => {
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
    let arr = [];
    for (let i = 0; i <= arrLen - 1; i++) {
      //Случайное число для массива
      let randNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
      arr.push(randNum);
    }
    return arr;
  };
  

  const getNewArray = () => {
    setSortStepArr([]);
    setInitialArr(randomArr());
  };

  // При первоначальной загрузки страницы отобразим произвольный массив
  useEffect(() => {
    getNewArray();
  }, []);

  const startSortArr = (sortDirection: Direction) => {
    setIsExecute(true);
    let steps = (
      sortingType === "select" ? getSelectSortSteps : getBubbleSortSteps
    )(initialArr, sortDirection);
    setSortStepArr(steps);
    setSortDirection(sortDirection);
    //Сбросим счетчик
    setCurrentStep(0);
    stepTimer(steps);
  };




  // Вызовем таймер, увеличивающий шаг каждую секунду
  const stepTimer = (steps: TColumn[]) => {
    if (steps.length > 1) {
      //Счетчик шагов будет увеличиваться на 1 каждые 1000 мс
      let timerId = setInterval(() => {
        setCurrentStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep >= steps.length - 1) {
            clearInterval(timerId);
            setIsExecute(false);
          }
          return nextStep;
        });
      }, SHORT_DELAY_IN_MS);
    }
  };
  // Функция отвечает за цвет при анимировании перехода
  const getElementsState = (
    index: number,
    currentRenderArray: TColumn
  ): ElementStates => {
    if (
      [currentRenderArray.leftIndex, currentRenderArray.rightIndex].includes(
        index
      )
    ) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
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
          extraClass={styles.radio}
        ></RadioInput>
        <Button
          sorting={Direction.Ascending}
          type="button"
          text={"По возрастанию"}
          onClick={() => startSortArr(Direction.Ascending)}
          isLoader={sortDirection === Direction.Ascending && isExecute}
          disabled={sortDirection !== Direction.Ascending && isExecute}
        ></Button>
        <Button
          type="button"
          text={"По убыванию"}
          sorting={Direction.Descending}
          onClick={() => startSortArr(Direction.Descending)}
          isLoader={sortDirection === Direction.Descending && isExecute}
          disabled={sortDirection !== Direction.Descending && isExecute}
        ></Button>
        <Button
          text={"Новый массив"}
          onClick={() => getNewArray()}
          disabled={isExecute}
          type="button"
        ></Button>
      </div>
      <div>
        <ul className={styles.list}>
          {(sortStepArr[currentStep]?.renderArray || initialArr).map(
            (item, index) => {
              return (
                <li key={index}>
                  <Column
                    index={item}
                    state={
                      isExecute
                        ? getElementsState(index, sortStepArr[currentStep])
                        : ElementStates.Default
                    }
                  />
                </li>
              );
            }
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
