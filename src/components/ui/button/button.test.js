import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

// Проверяем при помощи снэпшотов корректную отрисовку:

//     кнопки с текстом;
it("button with text", () => {
  const tree = renderer
    .create(<Button text={"Testing button with text"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
//      кнопки без текста;
it("button without text", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
// //     заблокированной кнопки;
it("disabled button", () => {
  const tree = renderer.create(<Button disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
// //     кнопки с индикацией загрузки.
it("button with loader", () => {
  const tree = renderer.create(<Button isLoader={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
//Проверяем корректность вызова колбека при клике на кнопку.
it("Нажатие на кнопку вызывает корректный alert", () => {
  window.alert = jest.fn();
  // Рендерим компонент
  render(
    <Button
      text={"Testing alert"}
      onClick={() => {
        alert("Test alert");
      }}
    />
  );
  // Находим элемент кнопки
  const button = screen.getByText("Testing alert");
  // Имитируем нажатие на кнопку
  fireEvent.click(button);
  // Проверяем, что alert сработал с правильным текстом предупреждения
  expect(window.alert).toHaveBeenCalledWith("Test alert");
});
