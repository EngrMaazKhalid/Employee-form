"use client";

import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { EducationSchema } from "./FormSchema";

function Education() {
  const searchParams = useSearchParams();
  const [employeeId, setEmployeeId] = useState(null);
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
  const [forms, setForms] = useState([{ id: Date.now() }]);

  const addForm = () => {
    setForms([...forms, { id: Date.now }]);
  };

  const router = useRouter();
  const handleBackClick = (e) => {
    // Navigate to the Sub page
    e.preventDefault();
    router.push(`/experience?employee_id=${employeeId}`);
  };

  const initialValues = {
    degree: "",
    institute: "",
    Syear: "",
    Fyear: "",
    grade: "",
    City: "",
    summary: "",
  };

  const Inputdegree = useRef();
  const Inputinstitute = useRef();
  const InputSyear = useRef();
  const InputFyear = useRef();
  const Inputgrade = useRef();
  const Inputsummary = useRef();
  const InputCity = useRef();

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
    validationSchema: EducationSchema,
    onSubmit: async (values, formValues) => {
      try {
        const res = await fetch("/api/employee/education", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, employeeId }),
        });

        const result = await res.json();
        if (result.success) {
          console.log("Data saved:", result);
          // Optionally, redirect or show a success message
        } else {
          console.error("Failed to save data", result.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
  return (
    <div className="container auto flex flex-col justify-center items-center mt-8 mb-8 p-15">
      <h1 className="text-xl md:text-3xl text-center font-bold">
        Employee's Education Form
      </h1>
      {/* {employeeId ? (
      <p>Employee ID: {employeeId}</p>
    ) : (
      <p>Employee ID not found</p>
    )} */}
      {forms.map((form, index) => (
        <form
          key={form.id}
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center flex-col items-center mt-9 w-[95%] px-2 sm:px-0 md:w-[80%] mb-8"
        >
          <div className="w-[100%]">
            <input
              type="text"
              value={values.degree}
              onChange={handleChange}
              onBlur={handleBlur}
              name="degree"
              ref={Inputdegree}
              placeholder="Degree"
              className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6 border-gray-300 p-2 mt-2 mb-2 w-[100%]"
            />
            {errors.degree && touched.degree ? (
              <p className="form-error">{errors.degree}</p>
            ) : null}
            <input
              type="text"
              value={values.institute}
              onChange={handleChange}
              onBlur={handleBlur}
              name="institute"
              ref={Inputinstitute}
              placeholder="Institute"
              className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 mt-2 mb-2 w-[100%]"
            />

            {errors.institute && touched.institute ? (
              <p className="form-error">{errors.institute}</p>
            ) : null}
          </div>
          <div className="flex w-[100%] justify-between gap-2 md:gap-9 mt-2 mb-2">
            <div className="w-[100%]">
              <input
                type="text"
                value={values.Syear}
                onChange={handleChange}
                onBlur={handleBlur}
                name="Syear"
                ref={InputSyear}
                placeholder="Starting Year"
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 w-[100%]"
              />
              {errors.Syear && touched.Syear ? (
                <p className="form-error">{errors.Syear}</p>
              ) : null}
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                value={values.Fyear}
                onChange={handleChange}
                onBlur={handleBlur}
                name="Fyear"
                ref={InputFyear}
                placeholder="Passing Year"
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 w-[100%]"
              />
              {errors.Fyear && touched.Fyear ? (
                <p className="form-error">{errors.Fyear}</p>
              ) : null}
            </div>
          </div>
          <div className="flex w-[100%] justify-between gap-2 md:gap-9 mt-2 mb-2">
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Grade"
                value={values.grade}
                onChange={handleChange}
                onBlur={handleBlur}
                name="grade"
                ref={Inputgrade}
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 w-[100%]"
              />
              {errors.grade && touched.grade ? (
                <p className="form-error">{errors.grade}</p>
              ) : null}
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="City"
                value={values.City}
                onChange={handleChange}
                onBlur={handleBlur}
                name="City"
                ref={InputCity}
                className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 w-[100%]"
              />
              {errors.City && touched.City ? (
                <p className="form-error">{errors.City}</p>
              ) : null}
            </div>
          </div>
          <textarea
            placeholder="Summary"
            value={values.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            name="summary"
            ref={Inputsummary}
            className="Input text-sm md:text-base duration-200 bg-primarylight py-4 rounded-3xl px-6  min-h-[10rem] border-gray-300 p-2 mt-2 mb-2 w-[100%]"
          />

          <div className="flex w-[100%] justify-end gap-3 px-2 mt-2 mb-2">
            <button className="bg-blue-800 duration-200 text-sm md:text-base hover:bg-blue-700 text-white justify-start  rounded-3xl px-5 py-3">
              Save
            </button>
          </div>
        </form>
      ))}

      <div className="flex justify-end w-[85%] md:mr-2 md:w-[80%]">
        <button
          onClick={addForm}
          className="border-2 border-blue-600 duration-200 text-sm md:text-base hover:bg-blue-600 text-white text-blue mb-5 rounded-3xl px-5 py-3"
        >
          Add
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
        <p className="text-sm md:text-base">Page 4/4</p>
        <button type="submit" className="button">
          <span className="button-text"> Submit </span>
          <span className="button-icon">
            <SendIcon className="text-xl md:text-2xl" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Education;
