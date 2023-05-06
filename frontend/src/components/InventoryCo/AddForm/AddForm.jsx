import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddForm.css";

const AddInventoryForm = () => {
  // Define the initial form values
  const initialValues = {
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemQuantity: "",
  };

  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    itemName: Yup.string().required("Item name is required"),
    itemDescription: Yup.string().required("Item description is required"),
    itemPrice: Yup.number()
      .required("Item price is required")
      .min(0, "Item price must be a positive number"),
    itemQuantity: Yup.number()
      .required("Item quantity is required")
      .integer("Item quantity must be a whole number")
      .min(0, "Item quantity must be a positive number"),
  });

  // Handle form submission
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Add Inventory Item</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="itemName">Item Name:</label>
              <Field type="text" id="itemName" name="itemName" />
              <ErrorMessage name="itemName" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="itemDescription">Item Description:</label>
              <Field type="text" id="itemDescription" name="itemDescription" />
              <ErrorMessage name="itemDescription" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="itemPrice">Item Price:</label>
              <Field type="number" id="itemPrice" name="itemPrice" />
              <ErrorMessage name="itemPrice" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="itemQuantity">Item Quantity:</label>
              <Field type="number" id="itemQuantity" name="itemQuantity" />
              <ErrorMessage name="itemQuantity" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add Item
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddInventoryForm;
