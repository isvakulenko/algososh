import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

// Проверяем при помощи снэпшотов корректную отрисовку элемента:

//     без буквы;
it("circle without text", () => {
  const tree = renderer.create(<Circle />).toJSON();
  expect(tree).toMatchSnapshot();
});
//     с буквами (Snapshot);
it("circle with text", () => {
  const tree = renderer
    .create(<Circle text={"Testing circle with letter"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
//     с head (Snapshot);
it("circle with text in head", () => {
  const tree = renderer.create(<Circle head={"head"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
//     с react-элементом в head;
it("circle with react element in head", () => {
  const tree = renderer
    .create(<Circle head={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
//     с tail;
it("circle with text in tail", () => {
  const tree = renderer.create(<Circle tail={"tail"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
//     с react-элементом в tail;
it("circle with react element in tail", () => {
  const tree = renderer
    .create(<Circle tail={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
//     с index;
it("circle with index", () => {
  const tree = renderer.create(<Circle index={1} />).toJSON();
  expect(tree).toMatchSnapshot();
});
//     с пропсом isSmall ===  true;
it("circle with props isSmall ===  true", () => {
  const tree = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
//     в состоянии default;
it("circle with default state", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
//     в состоянии changing;
it("circle with changing state", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
//     в состоянии modified;
it("circle with modified state", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
