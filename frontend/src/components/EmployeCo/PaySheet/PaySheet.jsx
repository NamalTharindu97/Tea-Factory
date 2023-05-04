import axios from "axios";
import "./paysheet.scss";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import logo from "../../../asserts/EmployeAs/Img/logo.png";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: green["A400"],
    },
  },
});

export const PaySheet = ({ formData }) => {
  const basicSalary = parseFloat(formData.basicSalary);
  const overtime = parseFloat(formData.overtime);
  const bonus = parseFloat(formData.bonus);
  const federalTaxRate = parseFloat(formData.federalTax);
  const stateTaxRate = parseFloat(formData.stateTax);
  const medicareRate = parseFloat(formData.medicare);
  const empName = formData.employeeName;
  const empId = formData.employeeId;

  let federalTax = 0;
  let stateTax = 0;
  let medicare = 0;
  let totalEarnings = 0;
  let totalDeduction = 0;
  let netPay = 0;

  if (isNaN(basicSalary) || isNaN(overtime) || isNaN(bonus) || isNaN(federalTaxRate) || isNaN(stateTaxRate) || isNaN(medicareRate)) {
    // Handle error
    console.log("One or more form values are invalid");
  } else {
    totalEarnings = basicSalary + overtime + bonus;
    federalTax = totalEarnings * (federalTaxRate / 100);
    stateTax = totalEarnings * (stateTaxRate / 100);
    medicare = totalEarnings * (medicareRate / 100);

    totalDeduction = federalTax + stateTax + medicare;
    netPay = totalEarnings - totalDeduction;
  }

  const handleSubmit = () => {
    axios
      .post("/payrolls/", {
        empName: empName,
        empId: empId,
        basicSalary: basicSalary,
        overtime: overtime,
        bonus: bonus,
        totoalEarnings: totalEarnings,
        fedaralTax: federalTax,
        stateTax: stateTax,
        medicare: medicare,
        totalDeduction: totalDeduction,
        netPay: netPay,
      })
      .then((response) => {
        console.log(response);
        toast.success("PaySlip Created!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="PaySheet">
      <div className="sheet">
        <div className="sheet-upper">
          <p className="slip-heading-1">Employee Salary Slip</p>
          <img src={logo} alt="logo" width="110" height="60" />
        </div>

        <div className="slip-item">
          <div className="slip-item-label">Company Name:</div>
          <div className="slip-item-value">Ambrosia Tea Co (Pvt) Ltd</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Employee Name:</div>
          <div className="slip-item-value">{formData.employeeName}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Employee ID:</div>
          <div className="slip-item-value">{formData.employeeId}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Pay Date:</div>
          <div className="slip-item-value">{new Date().toLocaleDateString()}</div>
        </div>
        <p className="basic-tag earings">Earnings</p>
        <div className="slip-item">
          <div className="slip-item-label">Basic Salary:</div>
          <div className="slip-item-value">{basicSalary.toFixed(2)}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Overtime:</div>
          <div className="slip-item-value">{overtime.toFixed(2)}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Bonus:</div>
          <div className="slip-item-value">{bonus.toFixed(2)}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Total Earnings:</div>
          <div className="slip-item-value">{totalEarnings.toFixed(2)}</div>
        </div>
        <p className="basic-tag deductions">Deduction</p>
        <div className="slip-item">
          <div className="slip-item-label">Federal Tax:</div>
          <div className="slip-item-value">{federalTax.toFixed(2)}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">State Tax:</div>
          <div className="slip-item-value">{stateTax.toFixed(2)}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Medicare:</div>
          <div className="slip-item-value">{medicare.toFixed(2)}</div>
        </div>
        <div className="slip-item">
          <div className="slip-item-label">Total Deduction:</div>
          <div className="slip-item-value">{totalDeduction.toFixed(2)}</div>
        </div>
        <div className="slip-item net-pay">
          <div className="slip-item-label">Net Pay:</div>
          <div className="slip-item-value">{netPay.toFixed(2)}</div>
        </div>
        <ThemeProvider theme={theme}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit} className="profile-btn">
            Send
          </Button>
        </ThemeProvider>
        <ToastContainer position="top-center" autoClose={3000} limit={1} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </div>
    </div>
  );
};
