import axios from "axios";
import "./paysheet.scss";

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="PaySheet">
      <div className="sheet">
        <h2>Pay Sheet</h2>
        <br />
        {formData.employeeName}
        <br />
        {formData.employeeId}
        <br />
        {basicSalary.toFixed(2)}
        <br />
        {overtime.toFixed(2)}
        <br />
        {bonus.toFixed(2)}
        <br />
        *********
        <br />
        {totalEarnings.toFixed(2)}
        <br />
        <br />
        {federalTax.toFixed(2)}
        <br />
        <br />
        {stateTax.toFixed(2)}
        <br />
        <br />
        {medicare.toFixed(2)}
        <br />
        <br />
        {totalDeduction.toFixed(2)}
        <br />
        <br />
        {netPay.toFixed(2)}
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
