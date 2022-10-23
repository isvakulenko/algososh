import React from "react";
import { useState, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import styles from "./list-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./linked-list";

export const ListPage: React.FC = () => {
  //для первоначального формирования списка
  let initialArr = ["0", "34", "8", "1"];

  //Создадим экземпляр класса списка
  const [linkedList] = useState(new LinkedList<string>(initialArr));

  type TCircle = {
    element?: string | null;
    state: ElementStates;
    add?: boolean;
    delete?: boolean;
    smallCircle?: {
      element?: string | null;
    };
  };

  const setDelay = (delay: number = SHORT_DELAY_IN_MS): Promise<null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, delay);
    });
  };

  //Для первоначального отображения ячеек списка создадим
  //массив с объектами
  const defaultArr = (): TCircle[] => {
    let arr = [];
    for (let i = 0; i <= initialArr.length - 1; i++) {
      arr.push({ element: initialArr[i], state: ElementStates.Default });
    }
    return arr;
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [indexValue, setIndexValue] = useState<string>("");
  const [itemsArr, setItemsArr] = useState<TCircle[]>(defaultArr());
  const [isExecute, setIsExecute] = useState(false);

  //--------------------------------------------------------------------
  //                      ADD TO HEAD
  //--------------------------------------------------------------------
  //linkedList.prepend('55');
  //console.log(linkedList)
  const addHead = async () => {
    //Заблокируем кнопки
    setIsExecute(true);
    // добавляем в начало списка новое значение
    linkedList.prepend(inputValue);
    // управление отображением малым кружком. Введем доп поля add и smalCircle
    itemsArr[0] = {
      ...itemsArr[0],
      add: true,
      smallCircle: {
        element: inputValue,
      },
    };
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    //убираем малый круг
    itemsArr[0] = {
      ...itemsArr[0],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    // Непосредственно вставляем элемент в отображаемый список
    itemsArr.unshift({
      element: inputValue,
      state: ElementStates.Modified,
    });
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    itemsArr[0].state = ElementStates.Default;
    //Раблокируем кнопки
    setIsExecute(false);
    // Очистим поле ввода
    setInputValue("");
  };

  //--------------------------------------------------------------------
  //                      DELETE FROM HEAD
  //--------------------------------------------------------------------
  const deleteHead = async () => {
    //Заблокируем кнопки
    setIsExecute(true);
    // внесем изсенения в нулевой элемент массива itemsArr
    itemsArr[0] = {
      ...itemsArr[0],
      element: "",
      delete: true,
      smallCircle: {
        // удалим из списка первый узел
        element: linkedList.deleteHead(),
      },
    };
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    //удалим первый элемент в массиве
    itemsArr.shift();
    setItemsArr([...itemsArr]);
    //Раблокируем кнопки
    setIsExecute(false);
  };

  //--------------------------------------------------------------------
  //                      ADD TO TAIL
  //--------------------------------------------------------------------
  const addTail = async () => {
    //Заблокируем кнопки
    setIsExecute(true);
    // добавляем в конец списка новое значение
    linkedList.append(inputValue);
    // Узнаем длину нашего списка для получения индекса конца списка
    const { length } = itemsArr;
    itemsArr[length - 1] = {
      ...itemsArr[length - 1],
      add: true,
      smallCircle: {
        element: inputValue,
      },
    };
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    // скроем малый круг
    itemsArr[length - 1] = {
      ...itemsArr[length - 1],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    //добавим в массив itemsArr еще один элемент
    itemsArr[length] = {
      ...itemsArr[length],
      add: false,
      state: ElementStates.Modified,
      element: inputValue,
    };
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    itemsArr[length - 1].state = ElementStates.Default;
    //Раблокируем кнопки
    setIsExecute(false);
    // Очистим поле ввода
    setInputValue("");
  };
  //--------------------------------------------------------------------
  //                      DELETE FROM TAIL
  //--------------------------------------------------------------------
  const deleteTail = async () => {
    //Заблокируем кнопки
    setIsExecute(true);
    // Узнаем длину нашего списка для получения индекса конца списка
    const { length } = itemsArr;

    // внесем изсенения в последний элемент массива itemsArr
    itemsArr[length - 1] = {
      ...itemsArr[length - 1],
      element: "",
      delete: true,
      smallCircle: {
        // удалим из списка последний узел
        element: linkedList.deleteTail(),
      },
    };
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    //удаляем последний элемент массива
    itemsArr.pop();
    setItemsArr([...itemsArr]);
    //Раблокируем кнопки
    setIsExecute(false);
  };
  //--------------------------------------------------------------------
  //                      INSERT BY INDEX
  //--------------------------------------------------------------------
  const insertByIndex = async (indexValue: number) => {
    //Заблокируем кнопки
    setIsExecute(true);
    //Вставка нового элемента с список по заданному индексу
    linkedList.insertByIndex(inputValue, indexValue);
    //Передвижение малого круга
    for (let i = 0; i <= indexValue; i++) {
      itemsArr[i] = {
        ...itemsArr[i],
        add: true,
        smallCircle: {
          element: inputValue,
        },
      };
      //изменения состояния в большом круге
      if (i > 0) {
        itemsArr[i - 1] = {
          ...itemsArr[i - 1],
          add: false,
          smallCircle: {
            element: null,
          },
          state: ElementStates.Changing,
        };
      }
      //Прорисовка
      setItemsArr([...itemsArr]);
      await setDelay(SHORT_DELAY_IN_MS);
    }
    // Вставка в основной ряд нового знчения
    itemsArr[indexValue] = {
      ...itemsArr[indexValue],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    itemsArr.splice(indexValue, 0, {
      element: inputValue,
      state: ElementStates.Modified,
    });
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    //Раблокируем кнопки
    setIsExecute(false);
  };

  //--------------------------------------------------------------------
  //                      DELETE BY INDEX
  //--------------------------------------------------------------------
  const deleteByIndex = async (index: number) => {
    //Заблокируем кнопки
    setIsExecute(true);
    //Изменение состояния большого круга
    for (let i = 0; i <= index; i++) {
      itemsArr[i].state = ElementStates.Changing;
      //Прорисовка
      setItemsArr([...itemsArr]);
      await setDelay(SHORT_DELAY_IN_MS);
    }
    // Отобразим малый круг
    itemsArr[index] = {
      ...itemsArr[index],
      element: "",
      delete: true,
      smallCircle: {
        // удалим из списка  узел с определенным индексом
        element: linkedList.deleteByIndex(index),
      },
    };
    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);

    //Непосредственное удаление из отображаемого массива
    itemsArr.splice(index, 1);

    //Прорисовка
    setItemsArr([...itemsArr]);
    await setDelay(SHORT_DELAY_IN_MS);
    // Вернем всем кружкам синий цвет
    itemsArr.forEach((item) => (item.state = ElementStates.Default));
    //Раблокируем кнопки
    setIsExecute(false);
  };

  return (
    <SolutionLayout title="Связный список">
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
          onClick={() => addHead()}
          disabled={!inputValue || itemsArr.length > 10}
          type="button"
          text={"Добавить в head"}
        ></Button>
        <Button
          isLoader={isExecute}
          onClick={() => addTail()}
          disabled={!inputValue || isExecute}
          type="button"
          text={"Добавить в tail"}
        ></Button>
        <Button
          onClick={() => deleteHead()}
          disabled={isExecute}
          type="button"
          text={"Удалить из head"}
        ></Button>
        <Button
          onClick={() => deleteTail()}
          disabled={isExecute}
          type="button"
          text={"Удалить из tail"}
        ></Button>
      </div>
      <div className={styles.wrapper}>
        <Input
          placeholder="Введите индекс"
          disabled={isExecute}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setIndexValue(e.currentTarget.value);
          }}
          isLimitText={true}
          // min={0}
          max={itemsArr.length - 1}
          value={indexValue}
          extraClass={styles.input}
          type="number"
        ></Input>
        <Button
          isLoader={isExecute}
          onClick={() => insertByIndex(Number(indexValue))}
          disabled={!inputValue || !indexValue || isExecute}
          type="button"
          text={"Добавить по индексу"}
        ></Button>
        <Button
          onClick={() => deleteByIndex(Number(indexValue))}
          disabled={!indexValue || isExecute}
          type="button"
          text={"Удалить по индексу"}
        ></Button>
      </div>
      <ul className={styles.list}>
        {itemsArr.map((item, index) => {
          return (
            <li key={index} className={styles.listCircles}>
              <Circle
                head={index === 0 && !item.add && !item.delete ? "head" : ""}
                tail={
                  index === itemsArr.length - 1 && !item.add && !item.delete
                    ? "tail"
                    : ""
                }
                state={item.state}
                index={index}
                letter={item.element}
              />
              {index !== itemsArr.length - 1 && <ArrowIcon />}
              {item.add && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.smallCircle?.element}
                  extraClass={styles.upCirlce}
                />
              )}
              {item.delete && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.smallCircle?.element}
                  extraClass={styles.downCircle}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
