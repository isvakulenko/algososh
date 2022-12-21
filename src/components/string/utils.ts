 // Функция формирует массив с переворотами по шагам
 export const getReverseStringSteps = (str: string): string[][] => {
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