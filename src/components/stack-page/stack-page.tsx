import React from "react";
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./stack-page.module.css";
import { Stack } from "./stack";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  // Тип для визуальных данных стека
  type TCircle = {
    head?: string;
    element: string;
    state: ElementStates;
  };
  // Создадим экземпляр класса стека
  const [stack] = useState(new Stack<string>());
  const [inputValue, setInputValue] = useState<string>("");
  const [isExecute, setIsExecute] = useState(false);
  const [itemsArr, setItemsArr] = useState<TCircle[]>([]);

  const pushItem = () => {
    //Заблокируем кнопки
    setIsExecute(true);
    //Кладем данные в стек
    stack.push(inputValue);
    //Очистим поле ввода
    setInputValue("");
    // Сформируем объект для управления анимацией каждого элемента стека
    for (let i = 0; i <= itemsArr.length - 1; i++) {
      itemsArr[i].head = "";
      itemsArr[i].state = ElementStates.Default;
    }
    // Берем последний элемент стека, m.к только что его туда добавили
    const lastitems = stack.peak();
    //и кладём в state
    itemsArr.push({
      element: lastitems!,
      state: ElementStates.Default,
    });
    // Над последним элементом стека установим надпись top
    itemsArr[itemsArr.length - 1].head = "top";
    itemsArr[itemsArr.length - 1].state = ElementStates.Changing;
    setItemsArr([...itemsArr]);
    // Через полсекунды вернется синяя окантовка
    setTimeout(() => {
      itemsArr[itemsArr.length - 1].state = ElementStates.Default;
      setItemsArr([...itemsArr]);
    }, SHORT_DELAY_IN_MS);
    //Разблокируем кнопки
    setIsExecute(false);
  };

  const popItem = () => {
    //Заблокируем кнопки
    setIsExecute(true);
    //Извлечем последний элемент из стека
    stack.pop();
    if (itemsArr) {
      itemsArr[itemsArr.length - 1].state = ElementStates.Changing;
      setItemsArr([...itemsArr]);
      itemsArr.pop();
      itemsArr[itemsArr.length - 1].head = "top";
      setTimeout(() => {
        itemsArr[itemsArr.length - 1].head = "top";
        setItemsArr([...itemsArr]);
      }, SHORT_DELAY_IN_MS);
    } else {
      setItemsArr([]);
    }
    //Разблокируем кнопки
    setIsExecute(false);
  };

  const clearStack = () => {
    stack.clear();
    setItemsArr([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <Input
          disabled={isExecute}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value);
          }}
          isLimitText={true}
          min={1}
          maxLength={4}
          value={inputValue}
          extraClass={styles.input}
        ></Input>
        <Button
          isLoader={isExecute}
          onClick={() => pushItem()}
          disabled={!inputValue || itemsArr.length > 10}
          type="button"
          text={"Добавить"}
        ></Button>
        <Button
          isLoader={isExecute}
          onClick={() => popItem()}
          disabled={!itemsArr.length || isExecute}
          type="button"
          text={"Удалить"}
        ></Button>
        <Button
          onClick={() => clearStack()}
          disabled={!itemsArr.length || isExecute}
          type="button"
          text={"Очистить"}
        ></Button>
      </div>
      <ul className={styles.list}>
        {itemsArr.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                head={item.head}
                state={item.state}
                index={index}
                letter={item.element}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
