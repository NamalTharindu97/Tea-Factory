import "./AddForm.css";
import Forminput from "../../../components/InventoryCo/FormInput/FormInput";
import { useState } from "react";

function App() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "Name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Name should be 3-16 characters and shouldn't be include any special characters!",
      label: " Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "description...",
      label: " Description",
      required: true,
    },
    {
      id: 3,
      name: "Quantity",
      type: "Number",
      placeholder: "Quantity",
      label: " Quantity",
    },
    {
      id: 4,
      name: "location",
      type: "text",
      placeholder: "ex : Warehouse A",
      label: " Location",
      required: true,
    },
    {
      id: 5,
      name: "inTime",
      type: "Time",
      placeholder: "inTime",
      label: " inTime",
      required: true,
    },
    {
      id: 6,
      name: "Supplier",
      type: "text",
      placeholder: "Supplier name",
      label: " Supplier",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

  return (
    <div className="app">
      
      <form onSubmit={handleSubmit}>
      <h2>Add Inventory</h2>
        {inputs.map((input) => (
          <Forminput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
