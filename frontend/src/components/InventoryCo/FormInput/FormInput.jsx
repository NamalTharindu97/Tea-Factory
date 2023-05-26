import { useState } from "react";
import "./FormInput.css";

const Forminput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="formInput">
      <label className="formLabel">{label}</label>
      <input className="FormInput"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="FormSpan">{errorMessage}</span>
    </div>
  );
};

export default Forminput;
