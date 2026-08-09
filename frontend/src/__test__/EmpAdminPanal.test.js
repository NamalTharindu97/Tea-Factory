import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import EmployeeDashboard from "../pages/employee/Dashboard";
import Adapter from "@cfaester/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new Adapter() });

describe("EmployeeDashboard", () => {
  it("renders without throwing an error", () => {
    const wrapper = shallow(<EmployeeDashboard />);
    expect(wrapper).toBeTruthy();
  });

  it("renders a page header", () => {
    const wrapper = shallow(<EmployeeDashboard />);
    expect(wrapper.find("PageHeader").exists()).toBe(true);
  });

  it("renders the four stat cards", () => {
    const wrapper = shallow(<EmployeeDashboard />);
    expect(wrapper.find("StatCard").length).toBe(4);
  });
});
