"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import { ExperienceSchema } from "./FormSchema";

function Experience() {
  const searchParams = useSearchParams();
  const [employeeId, setEmployeeId] = useState(null);
  const [forms, setForms] = useState([{ id: Date.now(), isSaved: false, isDisabled: false }]);  // State to keep track of all forms




  useEffect(() => {
    if (searchParams) {
      const employee_id = searchParams.get("employee_id"); // Get the employee_id from query
      if (employee_id) {
        setEmployeeId(employee_id); // Save employee_id to state
        console.log("Employee ID from query:", employee_id);
      } else {
        console.error("Employee ID is missing from query.");
      }
    }
  }, [searchParams]);
  const router = useRouter();
  const handleButtonClick = (e) => {
    e.preventDefault();
    router.push(`/education?employee_id=${employeeId}`);
  };

  const handleBackClick = (e) => {
    // Navigate to the Sub page
    e.preventDefault();
    router.push(`/sub?employee_id=${employeeId}`);
  };

  // State to keep track of all forms
  

  // Function to add a new form
  const addForm = () => {
    setForms([...forms, { id: Date.now(), isSaved: false, isDisabled: false }]);
  };

  const initialValues = {
    job: "",
    company: "",
    years: "",
    Clocation: "",
    summary: "",
  };
  const Inputjob = useRef();
  const Inputcompany = useRef();
  const Inputyears = useRef();
  const InputClocation = useRef();
  const Inputsummary = useRef();

  const {
    values,
    errors,
    touched,
    status,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ExperienceSchema,
    onSubmit: async (values, formValues) => {
      try {
        const res = await fetch("/api/employee/experience", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, employeeId }),
        });

        const result = await res.json();
        if (result.success) {
          console.log("Data saved:", result);
          setForms((prevForms) =>
            prevForms.map((form, index) => {
              if (index === prevForms.length - 1) {
                return { ...form, isSaved: true, isDisabled: true }; // Disable and mark form as saved
              }
              return form;
            })
          );
          // router.push(`/experience?employee_id=${employeeId}`);
        } else {
          console.log(values);
          console.log(formValues);
          console.log(employeeId);
          console.error("Failed to save data", result.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      console.log(values);
      // {errors.job && touched.job && errors.company && touched.company && errors.years && touched.years && errors.Clocation && touched.Clocation ? null : router.push("/education")}
    },
  });

  return (
    <div className="container auto flex flex-col justify-center items-center mt-8 mb-8 p-15">
      <h1 className="text-xl md:text-3xl text-center mt-8 font-bold">
        Employee's Job Experience Form
      </h1>

      {forms.map((form, index) => (
        <form
          key={form.id}
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center flex-col items-center mt-9 w-[95%] px-2 sm:px-0 md:w-[80%] mb-8"
        >
          <div className="w-[100%]">
            <input
              type="text"
              value={values.job}
              onChange={handleChange}
              onBlur={handleBlur}
              name="job"
              ref={Inputjob}
              disabled={form.isDisabled}
              placeholder="Job Title"
              className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  p-2 mt-2 mb-2 w-[100%]"
            />
            {errors.job && touched.job ? (
              <p className="form-error">{errors.job}</p>
            ) : null}
          </div>
          <div className="flex w-[100%] flex-col gap-3 justify-between  sm:flex-row sm:gap-5 mt-2 mb-2">
            <div className="w-[100%]">
              <input
                type="text"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                name="company"
                disabled={form.isDisabled}
                ref={Inputcompany}
                placeholder="Company Name"
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  p-2  w-[100%]"
              />
              {errors.company && touched.company ? (
                <p className="form-error">{errors.company}</p>
              ) : null}
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Number of Years"
                value={values.years}
                onChange={handleChange}
                disabled={form.isDisabled}
                onBlur={handleBlur}
                name="years"
                ref={Inputyears}
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6 p-2 w-[100%]"
              />
              {errors.years && touched.years ? (
                <p className="form-error">{errors.years}</p>
              ) : null}
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Company Location"
                value={values.Clocation}
                onChange={handleChange}
                onBlur={handleBlur}
                name="Clocation"
                disabled={form.isDisabled}
                ref={InputClocation}
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6 p-2 w-[100%]"
              />
              {errors.Clocation && touched.Clocation ? (
                <p className="form-error">{errors.Clocation}</p>
              ) : null}
            </div>
          </div>
          <textarea
            placeholder="Summary"
            value={values.summary}
            onChange={handleChange}
            disabled={form.isDisabled}
            onBlur={handleBlur}
            name="summary"
            ref={Inputsummary}
            className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  min-h-[10rem] p-2 mt-2 mb-2 w-[100%]"
          />
          <div className="flex w-[100%] justify-end gap-3 px-2 mt-2 mb-2">
            <button className="bg-blue-800 duration-200 hover:bg-blue-700 text-white justify-start text-sm md:text-base  rounded-3xl px-5 py-3">
              Save
            </button>
          </div>
          {form.isSaved && (
            <p className="text-green-600">Form saved successfully!</p>
          )}
        </form>
      ))}
      <div className="flex justify-end w-[95%] md:w-[80%]">
      {forms.length === 0 || forms[forms.length - 1].isSaved  ? (
        <button
          onClick={addForm}
          className="border-2 border-blue-600 duration-200 text-sm md:text-base uppercase hover:bg-blue-600 text-white text-blue mb-5 rounded-3xl px-5 py-3"
        >
          Add
        </button>
      ) : null}
        <button
          onClick={handleButtonClick}
          className="border-2 border-red-600 ml-5 uppercase duration-200 hover:bg-red-600 text-white text-blue mb-5 rounded-3xl text-sm md:text-base px-5 py-3"
        >
          skip
        </button>
      </div>
      <div className="flex justify-between items-center w-[95%] md:w-[80%] px-2 mt-8 mx-3">
        <button onClick={handleBackClick} className="button-back">
          <div className="flex justify-between flex-col">
            <span className="button-icon-back">
              <ArrowBackIcon className="text-xl md:text-2xl" />
            </span>
            <span className="button-text"> BACK</span>
          </div>
        </button>
        <p className="text-sm md:text-base ">Page 3/4</p>
        <button onClick={handleButtonClick} className="button">
          <span className="button-text"> NEXT</span>
          <span className="button-icon">
            <SendIcon className="text-xl md:text-2xl" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Experience;
