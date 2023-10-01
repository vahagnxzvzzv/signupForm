import React from "react";
import { Formik } from "formik";
import * as yup  from 'yup';
import { useEffect } from "react";
import { useState } from "react";
import './Form.css';

function Todo() {


        const intialValues = { email: "", password: "" };
        const [formValues, setFormValues] = useState(intialValues);
        const [formErrors, setFormErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);
      

      const submitForm = () => {
        console.log(formValues);
      };
    
     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        console.log(intialValues.email, intialValues.password)
      };
    
    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
          errors.email = "Cannot be blank";
        } else if (!regex.test(values.email)) {
          errors.email = "Invalid email format";
        }
        if (!values.password) {
          errors.password = "Cannot be blank";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        }
        return errors;
      };
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
          submitForm();
        }
      }, [formErrors]);

      return (
        <Formik
          initialValues={intialValues}
          validate={validate}
          onSubmit={submitForm}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty
            } = formik;
            return (
                <div className="container">
                  <h1>Sign in to continue</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? 
                        "input-error" : null}
                      />
                      {errors.email && touched.email && (
                        <span className="error">{errors.email}</span>
                      )}
                    </div>
    
                    <div className="form-row">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? 
                         "input-error" : null}
                      />
                      {errors.password && touched.password && (
                        <span className="error">{errors.password}</span>
                      )}
                    </div>
    
                    <button
                      type="submit"
                      className={dirty && isValid ? "" : "disabled-btn"}
                      disabled={!(dirty && isValid)}
                        onClick={handleSubmit}
                      >
                      Sign In
                    </button>
                  </form>
                </div>
            );
          }}
        </Formik>
      );
}

export default Todo