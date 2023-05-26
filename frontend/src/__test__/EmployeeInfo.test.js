import Enzyme from "enzyme";
import React from "react";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { shallow } from "enzyme";
import { EmployeeInfo } from "../pages/employee/EmployeeInfo/EmployeeInfo";
import { JSDOM } from "jsdom";
import "@babel/preset-env";
import "@babel/preset-react";

Enzyme.configure({ adapter: new Adapter() });

// Configure JSDOM to provide a global document
const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};

describe("EmployeeInfo component", () => {
  it("renders without throwing an error", () => {
    const wrapper = shallow(<EmployeeInfo />);
    expect(wrapper).toBeTruthy();
  });

  it("should render with empty state", () => {
    const wrapper = shallow(<EmployeeInfo />);
    expect(wrapper.find(".data-grid").length).toBe(0);
    expect(wrapper.find(".spinner").length).toBe(1);
  });
});
