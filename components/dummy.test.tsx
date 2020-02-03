import React from "react";
import Enzyme, { shallow } from "enzyme";
import Dummy from "./dummy";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../testutils";

test("renders without Error", () => {
  const wrapper = shallow(<Dummy />);
  console.log(wrapper);

  const Component = findByTestAttr(wrapper, "component-dummy");
  expect(Component.length).toBe(1);
});
