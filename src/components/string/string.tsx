import React from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { FormEvent } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  // Все шаги перевертыши в одном массиве, массив с массивами
  const [reverseSteps, setReverseSteps] = useState<string[][]>([]);
  // Номер текущего шага переворачивания
  const [currentReverseStep, setCurrentReverseStep] = useState(0);

  // Функция формирует массив с переворотами по шагам
  const getReverseStringSteps = (str: string): string[][] => {
    const strArr = str.split(""); // [ "q", "w", "e", "r", "t", "y" ]
    // Создадим массив состояний переворота
    const strArrState: string[][] = [[...strArr]]; // [ [ "q", "w", "e", "r", "t", "y" ], [ "y", "w", "e", "r", "t", "q" ], ... ]
    if (strArr.length <= 1) {
      return [[...strArr]];
    }
    // Центральный элемент остается на месте
    const maxReversSteps = Math.ceil((strArr.length - 1) / 2);
    //пробежимся по массиву с 2 указателями
    for (let leftPos = 0; leftPos < maxReversSteps; leftPos++) {
      const rightPos = strArr.length - 1 - leftPos;
      //меняем местами элементы (swap функция)
      let tmp = strArr[leftPos];
      strArr[leftPos] = strArr[rightPos];
      strArr[rightPos] = tmp;
      //добавляем в массив состояний переворота каждое состояние замены
      strArrState.push([...strArr]);
    }
    return strArrState;
  };

  // Функция отвечает за цвет при анимировании перехода
  const getElementsState = (
    index: number,
    maxIndex: number,
    currentStep: number,
    isFinished: boolean
  ): ElementStates => {
    if (index < currentStep || index > maxIndex - currentStep || isFinished) {
      return ElementStates.Modified;
    }
    if (index === currentStep || index === maxIndex - currentStep) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };
  // Сформируем массив перевернутых состояний
  const reverseString = () => {
    const steps = getReverseStringSteps(inputValue);
    setReverseSteps(steps);
    //Сбросим счетчик
    setCurrentReverseStep(0);
    stepTimer(steps);
  };
  // Вызовем таймер, увеличивающий шаг каждую секунду
  const stepTimer = (steps: string[][]) => {
    if (steps.length > 1) {
      //Счетчик шагов будет увеличиваться на 1 каждые 1000 мс
      let timerId = setInterval(() => {
        setCurrentReverseStep((currentReverseStep) => {
          const nextStep = currentReverseStep + 1;
          if (nextStep >= steps.length - 1) {
            clearInterval(timerId);
          }
          return nextStep;
        });
      }, DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input
          disabled={currentReverseStep < reverseSteps.length - 1}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
          }}
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          extraClass={styles.input}
        ></Input>
        <Button
          isLoader={currentReverseStep < reverseSteps.length - 1}
          onClick={(e) => {
            reverseString();
          }}
          disabled={!inputValue}
          type="button"
          text={"Развернуть"}
        ></Button>
      </div>
      <ul className={styles.reverseList}>
        {reverseSteps.length > 0 &&
          reverseSteps[currentReverseStep].map((letter, index) => (
            <li key={index}>
              <Circle
                letter={letter}
                state={getElementsState(
                  index,
                  reverseSteps[currentReverseStep].length - 1, //maxIndex для [ "q", "w", "e", "r", "t", "y" ]  = 5
                  currentReverseStep, // currentStep
                  currentReverseStep === reverseSteps.length - 1 //isFinished
                )}
              ></Circle>
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
