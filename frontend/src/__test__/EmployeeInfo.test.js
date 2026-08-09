import React from "react";
import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { shallow } from "enzyme";
import EmployeeInfo from "../pages/employee/EmployeeInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("EmployeeInfo component", () => {
  it("renders without throwing an error", () => {
    const wrapper = shallow(<EmployeeInfo />);
    expect(wrapper).toBeTruthy();
  });

  it("renders a page header", () => {
    const wrapper = shallow(<EmployeeInfo />);
    expect(wrapper.find("PageHeader").exists()).toBe(true);
  });

  it("renders the data table", () => {
    const wrapper = shallow(<EmployeeInfo />);
    expect(wrapper.find("DataTable").exists()).toBe(true);
  });
});
