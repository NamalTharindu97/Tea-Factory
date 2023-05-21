import React from "react";
import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { shallow } from "enzyme";
import { NavBar } from "../components/EmployeCo/navBar/NavBar";

Enzyme.configure({ adapter: new Adapter() });

describe("NavBar", () => {
  it("renders without throwing an error", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the search input correctly", () => {
    const wrapper = shallow(<NavBar />);
    const searchInput = wrapper.find(".search-input");
    expect(searchInput.exists()).toBeTruthy();
    expect(searchInput.prop("type")).toBe("text");
    expect(searchInput.prop("placeholder")).toBe("Search...");
  });

  it("renders the correct number of items", () => {
    const wrapper = shallow(<NavBar />);
    const items = wrapper.find(".item");
    expect(items.length).toBe(6); // Check if there are 6 items in the NavBar
  });

  it("renders the notification and chat counters correctly", () => {
    const wrapper = shallow(<NavBar />);
    const notificationCounter = wrapper.find(".item .counter").at(0);
    const chatCounter = wrapper.find(".item .counter").at(1);
    expect(notificationCounter.text()).toBe("1"); // Check if the notification counter is 1
    expect(chatCounter.text()).toBe("2"); // Check if the chat counter is 2
  });
});
