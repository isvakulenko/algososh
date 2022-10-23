import React from "react";
import { useState, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  //Ограничим размер очереди
  const MAX_QUEUE_LENGTH = 7;
 
 type TCircle = {
    head?: string;
    tail?: string;
    element?: string | null;
    state: ElementStates;
  };
   //Для первоначального отображения ячеек очереди создадим
  // массив с пустыми элементами
  const emptyQueue = (): TCircle[] => {
    let arr = [];
    for (let i = 0; i < MAX_QUEUE_LENGTH; i++) {
      arr[i] = { element: "", state: ElementStates.Default };
    }
    return arr;
  };
  // Создадим экземпляр класса очереди
    const [queue] = useState(new Queue<string>(MAX_QUEUE_LENGTH));

  const [inputValue, setInputValue] = useState<string>("");
  const [isExecute, setIsExecute] = useState(false);
  const [itemsArr, setItemsArr] = useState<TCircle[]>(emptyQueue());

   const enqueueItem = () => {
    //Заблокируем кнопки
    setIsExecute(true);
    //Кладем данные в очередь
    queue.enqueue(inputValue);
    setInputValue("");
    const head = queue.getHead();
    const tail = queue.getTail();
      //устанавливаем первый элемент очереди
    itemsArr[head.index].element = head.item;
    itemsArr[head.index].head = "head";
    //обновляем конец очереди
    if (tail.index > 0) itemsArr[tail.index - 1].tail = "";
    // новый конец очереди
    itemsArr[tail.index].element = tail.item;
    itemsArr[tail.index].tail = "tail";
    itemsArr[tail.index].state = ElementStates.Changing;
    //задержка для анимации
      setTimeout(() => {
      itemsArr[tail.index].state = ElementStates.Default;
      setItemsArr([...itemsArr]);
    }, SHORT_DELAY_IN_MS);
      //Разблокируем кнопки
    setIsExecute(false);
  };

 const dequeueItem = () => {
  //Заблокируем кнопки
  setIsExecute(true);
  const head = queue.getHead();
  const tail = queue.getTail();
  if (head.index === tail.index) {
    clearQueue();
  } else {
    queue.dequeue();
    //Вызовем повторно для получения изменившегося значения head 
    const head = queue.getHead();
    itemsArr[head.index - 1].state = ElementStates.Changing;
    setItemsArr([...itemsArr])
    //задержка для анимации
    setTimeout(() => {
      itemsArr[head.index - 1].state = ElementStates.Default;
           setItemsArr([...itemsArr])
     }, SHORT_DELAY_IN_MS);
     if (head.index > 0) {
      itemsArr[head.index - 1].head = "";
      itemsArr[head.index - 1].element = "";
    }
    itemsArr[head.index].head = "head";
    itemsArr[head.index].element = head.item;
  }
    //Разблокируем кнопки
  setIsExecute(false);
  }

  const clearQueue = () => {
    queue.clear();
    setItemsArr(emptyQueue);
  }
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <Input
          disabled={isExecute}
          onChange={(e: FormEvent<HTMLInputElement>) => {
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
          onClick={() => enqueueItem()}
          disabled={!inputValue || itemsArr.length > 10}
          type="button"
          text={"Добавить"}
        ></Button>
        <Button
          isLoader={isExecute}
            onClick={() => dequeueItem()}
          disabled={!itemsArr.length || isExecute}
          type="button"
          text={"Удалить"}
        ></Button>
        <Button
            onClick={() => clearQueue()}
          disabled={queue.isEmpty() || isExecute}
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
                tail={item.tail}
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
