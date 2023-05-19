import React from "react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import EmpAdminPanal from "../pages/employee/AdminPanal/empAdminPanal";
import Adapter from "@cfaester/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new Adapter() });

describe("EmpAdminPanal", () => {
  it("renders without throwing an error", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper).toBeTruthy();
  });

  it("renders SideBar component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("SideBar").exists()).toBe(true);
  });

  it("renders NavBar component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("NavBar").exists()).toBe(true);
  });

  it("renders Widget components", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("Widget").length).toBe(4);
  });

  it("renders Payroll component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("Payroll").exists()).toBe(true);
  });

  it("renders Recent component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("Recent").exists()).toBe(true);
  });

  it("renders HeadCount component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("HeadCount").exists()).toBe(true);
  });

  it("renders BarChart component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("BarChart").exists()).toBe(true);
  });

  it("renders PieChart component", () => {
    const wrapper = shallow(<EmpAdminPanal />);
    expect(wrapper.find("PieChart").exists()).toBe(true);
  });
});
