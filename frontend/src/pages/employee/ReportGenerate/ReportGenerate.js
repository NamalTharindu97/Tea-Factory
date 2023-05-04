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

const names = ["HR Manager", "Inventory Manager", "Suplier Manager", "Production Manager"];

function getStyles(name, personName, theme = {}) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography?.fontWeightRegular : theme.typography?.fontWeightMedium,
  };
}

export const ReportGenerate = () => {
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
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
          <div className="report-container">
            <div className="report-upper">
              <p>Filter data</p>
            </div>
            <div className="report-middle">
              <FormControl style={{ width: 100 }}>
                <InputLabel id="demo-simple-select-label" style={{ width: "80px" }}>
                  Gender
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={gender} label="Gender" onChange={handleChangeGender}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{ width: 150 }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChangeAge}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={40}>Forty</MenuItem>
                </Select>
              </FormControl>

              {/* multi select start here */}
              <FormControl sx={{ m: 0, width: 600 }}>
                <InputLabel id="demo-multiple-chip-label">Role</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="report-lower">lower</div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
