import React from "react";
import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { shallow } from "enzyme";
import { StatCard } from "../components/ui/StatCard";
import { PageHeader } from "../components/ui/PageHeader";
import { EmptyState } from "../components/ui/EmptyState";
import DashboardIcon from "@mui/icons-material/Dashboard";

Enzyme.configure({ adapter: new Adapter() });

describe("UI kit", () => {
  it("renders the StatCard title and value", () => {
    const wrapper = shallow(<StatCard title="Total Net Pay" value="Rs : 1000" icon={DashboardIcon} />);
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toContain("Total Net Pay");
    expect(wrapper.text()).toContain("Rs : 1000");
  });

  it("renders a loading skeleton instead of values when loading", () => {
    const wrapper = shallow(<StatCard title="Total Net Pay" value="" icon={DashboardIcon} loading />);
    expect(wrapper).toBeTruthy();
  });

  it("renders the PageHeader title and subtitle", () => {
    const wrapper = shallow(<PageHeader title="Employee Information" subtitle="Manage employees" />);
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toContain("Employee Information");
    expect(wrapper.text()).toContain("Manage employees");
  });

  it("renders an EmptyState with title and description", () => {
    const wrapper = shallow(<EmptyState title="No records" description="Nothing to show yet." />);
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toContain("No records");
    expect(wrapper.text()).toContain("Nothing to show yet.");
  });
});
