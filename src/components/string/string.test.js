import { getReverseStringSteps } from "./utils";

// Тестирование алгоритма разворота строки
// Корректно разворачивает строку:

// с чётным количеством символов.

const evenStringSteps = [
  ["P", "A", "G", "E"],
  ["E", "A", "G", "P"],
  ["E", "G", "A", "P"],
];
it("Reverse the string  with an even number of elements", () => {
  expect(getReverseStringSteps("PAGE")).toEqual(evenStringSteps);
});
// с нечетным количеством символов.
const oddStringSteps = [
  ["P", "A", "G", "E", "S"],
  ["S", "A", "G", "E", "P"],
  ["S", "E", "G", "A", "P"],
];
it("Reverse the string  with an odd number of elements", () => {
  expect(getReverseStringSteps("PAGES")).toEqual(oddStringSteps);
});
// с одним символом.
it("Reverse the string  with an only element", () => {
  expect(getReverseStringSteps("W")).toEqual([["W"]]);
});
// пустую строку.
it("Reverse the empty string", () => {
  expect(getReverseStringSteps("")).toEqual([[]]);
});
