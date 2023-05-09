import React from "react";
import { SideBar } from "../../../components/EmployeCo/sidebar/SideBar";
import { NavBar } from "../../../components/EmployeCo/navBar/NavBar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import "./reportGenerate.scss";
import { ThemeProvider, useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { DataFilter } from "../../../components/EmployeCo/DataFilter/DataFilter";
import { motion } from "framer-motion";
import { scaleVariantForm } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = ["HR Manager", "Inventory Manager", "Supplier Manager", "Production Manager"];

function getStyles(role, roleName, theme = {}) {
  return {
    fontWeight: roleName.indexOf(role) === -1 ? theme.typography?.fontWeightRegular : theme.typography?.fontWeightMedium,
  };
}
const genders = ["male", "female"];

function getGenderStyles(genderType, gender, theme = {}) {
  return {
    fontWeight: gender.indexOf(genderType) === -1 ? theme.typography?.fontWeightRegular : theme.typography?.fontWeightMedium,
  };
}

export const ReportGenerate = () => {
  const [gender, setGender] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [roleName, setRoleName] = React.useState([]);

  const theme = useTheme();

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoleName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeGender = (event) => {
    const {
      target: { value },
    } = event;
    setGender(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="ReportGenerate">
        <SideBar />
        <div className="report-generate-container">
          <NavBar />
          <motion.div className="report-container" variants={scaleVariantForm} initial="initial" animate="animate">
            <div className="report-upper">
              <div className="upper-left">
                <p className="report-head">Filter data</p>
                <p className="report-head2">Generate Employee Demographics Report Here</p>
              </div>
            </div>
            <div className="report-middle">
              <FormControl sx={{ m: 0, width: 200, marginBottom: 0 }}>
                <InputLabel id="demo-multiple-chip-label" className="custom-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={gender}
                  onChange={handleChangeGender}
                  input={<OutlinedInput id="select-multiple-chip" label="Gender" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, paddingBottom: 0, marginBottom: -4 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {genders.map((name) => (
                    <MenuItem key={name} value={name} style={getGenderStyles(name, gender, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl style={{ width: 150, marginLeft: 10, marginRight: 10 }}>
                <InputLabel id="demo-simple-select-label" className="custom-label">
                  Under Age
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Under Age" onChange={handleChangeAge}>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={40}>Forty</MenuItem>
                </Select>
              </FormControl>

              {/* multi select start here */}
              <FormControl sx={{ m: 0, width: 600, marginBottom: 0 }}>
                <InputLabel id="demo-multiple-chip-label" className="custom-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={roleName}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Role" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, paddingBottom: 0, marginBottom: -4 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {roles.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, roleName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="report-lower">
              <DataFilter gender={gender} age={age} roleName={roleName} />
            </div>
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
};
