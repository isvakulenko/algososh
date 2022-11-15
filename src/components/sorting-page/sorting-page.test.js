import { getSelectSortSteps, getBubbleSortSteps } from "./utils";
import { Direction } from "../../types/direction";

const unsortedArray = [5, 4, 10, 34, 7];

// Тестирование алгоритмов сортировки выбором и пузырьком
// Корректно сортирует:
//     пустой массив;
it("Sorting empty array select method, ascending", () => {
  expect(getSelectSortSteps([], Direction.Ascending)).toStrictEqual([
    { renderArray: [] },
  ]);
});

it("Sorting empty array select method, descending", () => {
  expect(getSelectSortSteps([], Direction.Descending)).toStrictEqual([
    { renderArray: [] },
  ]);
});

it("Sorting empty array bubble method, ascending", () => {
  expect(getBubbleSortSteps([], Direction.Ascending)).toStrictEqual([
    { renderArray: [] },
  ]);
});

it("Sorting empty array bubble method, descending", () => {
  expect(getBubbleSortSteps([], Direction.Descending)).toStrictEqual([
    { renderArray: [] },
  ]);
});

//     массив из одного элемента;
it("Sorting one element array select method, ascending", () => {
  expect(getSelectSortSteps([3], Direction.Ascending)).toStrictEqual([
    { renderArray: [3] },
  ]);
});

it("Sorting one element array select method, descending", () => {
  expect(getSelectSortSteps([3], Direction.Descending)).toStrictEqual([
    { renderArray: [3] },
  ]);
});

it("Sorting one element array bubble method, ascending", () => {
  expect(getBubbleSortSteps([3], Direction.Ascending)).toStrictEqual([
    { renderArray: [3] },
  ]);
});

it("Sorting one element array bubble method, descending", () => {
  expect(getBubbleSortSteps([3], Direction.Descending)).toStrictEqual([
    { renderArray: [3] },
  ]);
});
//     массив из нескольких элементов.
it("Sorting several elements array bubble method, ascending", () => {
  expect(getBubbleSortSteps(unsortedArray, Direction.Ascending)).toStrictEqual([
    {
      renderArray: [4, 5, 10, 34, 7],
      leftIndex: 0,
      rightIndex: 1,
    },
    {
      renderArray: [4, 5, 10, 34, 7],
      leftIndex: 1,
      rightIndex: 2,
    },
    {
      renderArray: [4, 5, 10, 34, 7],
      leftIndex: 2,
      rightIndex: 3,
    },
    {
      renderArray: [4, 5, 10, 7, 34],
      leftIndex: 3,
      rightIndex: 4,
    },
    {
      renderArray: [4, 5, 10, 7, 34],
      leftIndex: 0,
      rightIndex: 1,
    },
    {
      renderArray: [4, 5, 10, 7, 34],
      leftIndex: 1,
      rightIndex: 2,
    },
    {
      renderArray: [4, 5, 7, 10, 34],
      leftIndex: 2,
      rightIndex: 3,
    },
    {
      renderArray: [4, 5, 7, 10, 34],
      leftIndex: 0,
      rightIndex: 1,
    },
    {
      renderArray: [4, 5, 7, 10, 34],
      leftIndex: 1,
      rightIndex: 2,
    },
  ]);
});

it("Sorting several elements array bubble method, descending", () => {
  expect(getBubbleSortSteps([5, 4, 10, 34, 7], Direction.Descending)).toStrictEqual(
    [
      {
        renderArray: [5, 4, 10, 34, 7],
        leftIndex: 0,
        rightIndex: 1,
      },
      {
        renderArray: [5, 10, 4, 34, 7],
        leftIndex: 1,
        rightIndex: 2,
      },
      {
        renderArray: [5, 10, 34, 4, 7],
        leftIndex: 2,
        rightIndex: 3,
      },
      {
        renderArray: [5, 10, 34, 7, 4],
        leftIndex: 3,
        rightIndex: 4,
      },
      {
        renderArray: [10, 5, 34, 7, 4],
        leftIndex: 0,
        rightIndex: 1,
      },
      {
        renderArray: [10, 34, 5, 7, 4],
        leftIndex: 1,
        rightIndex: 2,
      },
      {
        renderArray: [10, 34, 7, 5, 4],
        leftIndex: 2,
        rightIndex: 3,
      },
      {
        renderArray: [34, 10, 7, 5, 4],
        leftIndex: 0,
        rightIndex: 1,
      },
      {
        renderArray: [34, 10, 7, 5, 4],
        leftIndex: 1,
        rightIndex: 2,
      },
      {
        renderArray: [34, 10, 7, 5, 4],
        leftIndex: 0,
        rightIndex: 1,
      },
    ]
  );
});
it("Sorting several elements array select method, ascending", () => {
  expect(
    getSelectSortSteps([5, 4, 10, 34, 7], Direction.Ascending)
  ).toStrictEqual([
    {
      renderArray: [4, 5, 10, 34, 7],
      leftIndex: 0,
      rightIndex: 1,
    },
    {
      renderArray: [4, 5, 7, 34, 10],
      leftIndex: 2,
      rightIndex: 4,
    },
    {
      renderArray: [4, 5, 7, 10, 34],
      leftIndex: 3,
      rightIndex: 4,
    },
  ]);
});

it("Sorting several elements array select method, descending", () => {
  expect(
    getSelectSortSteps([5, 4, 10, 34, 7], Direction.Descending)
  ).toStrictEqual([
    {
      renderArray: [34, 4, 10, 5, 7],
      leftIndex: 0,
      rightIndex: 3,
    },
    {
      renderArray: [34, 10, 4, 5, 7],
      leftIndex: 1,
      rightIndex: 2,
    },
    {
      renderArray: [34, 10, 7, 5, 4],
      leftIndex: 2,
      rightIndex: 4,
    },
  ]);
});
