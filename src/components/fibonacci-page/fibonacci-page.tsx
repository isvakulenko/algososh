import React from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { FormEvent } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  // Номер текущего шага
  const [currentStep, setCurrentStep] = useState(0);
  // Массив с вычисленными числами Фибоначчи
  const [fibonacciNumbersArr, setFibonacciNumbersArr] = useState<number[]>([]);

  // Функция формирует массив с числами Фибоначчи
  const getFibonacciNumbersArr = (n: number) => {
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

  const calcFibonacciNumber = () => {
    const arr = getFibonacciNumbersArr(Number(inputValue));
    setFibonacciNumbersArr(arr);
    setCurrentStep(0);
    stepTimer();
  };
  // Вызовем таймер, увеличивающий шаг каждые полсекунды
  const stepTimer = () => {
    if (+inputValue > 1) {
      //Счетчик шагов будет увеличиваться на 1 каждые 1000 мс
      let timerId = setInterval(() => {
        setCurrentStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep > +inputValue) {
            clearInterval(timerId);
          }
          return nextStep;
        });
      }, SHORT_DELAY_IN_MS);
    }
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <Input
          disabled={currentStep < fibonacciNumbersArr.length - 1}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
          }}
          isLimitText={true}
          max={19}
          value={inputValue}
          extraClass={styles.input}
          type="number"
        ></Input>
        <Button
          isLoader={currentStep < fibonacciNumbersArr.length - 1}
          onClick={(e) => {
            calcFibonacciNumber();
          }}
          disabled={!inputValue || Number(inputValue) > 19}
          type="button"
          text={"Рассчитать"}
        ></Button>
      </div>
      <ul className={styles.fibonacciList}>
        {fibonacciNumbersArr.length > 0 &&
          fibonacciNumbersArr.slice(0, currentStep + 1).map((number, index) => (
            <li key={index}>
              <Circle letter={number.toString()} index={index}></Circle>
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
