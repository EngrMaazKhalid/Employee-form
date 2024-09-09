"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import { SubSchema } from "./FormSchema";

function Sub() {
  const router = useRouter();
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

  const initialValues = {
    CAddress: "",
    CArea: "",
    Ccity: "",
    PAddress: "",
    PArea: "",
    Pcity: "",
    mobile: "",
    phone: "",
    Ename: "",
    ECname: "",
    Emobile: "",
    email: "",
    doj: "",
  };

  const InputCAddress = useRef();
  const InputCArea = useRef();
  const InputCcity = useRef();
  const InputPAddress = useRef();
  const InputPArea = useRef();
  const InputPcity = useRef();
  const Inputmobile = useRef();
  const Inputphone = useRef();
  const InputEname = useRef();
  const InputECname = useRef();
  const InputEmobile = useRef();
  const Inputemail = useRef();
  const Inputdoj = useRef();

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
    validationSchema: SubSchema,
    onSubmit: async ( formValues) => {
      if (!employeeId) {
        console.error("Employee ID is missing. Cannot submit form.");
        return; // Stop form submission
      }
      try {
        const res = await fetch('/api/employee/sub', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
           { ...formValues,
          employeeId,}
          ),
        });
  
        const result = await res.json();
        if (result.success) {
          console.log("Data saved:", result);
          router.push(`/experience?employee_id=${employeeId}`);
        } else {
          console.log(values)
          console.error("Failed to save data", result.error);
          
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
  
  
    },
  });

  const handleBackClick = (e) => {
    // Navigate to the Sub page
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="container auto flex flex-col justify-center items-center p-15">
      <h1 className="text-2xl font-bold mt-8">
        Employee's sub Information Form
      </h1>
      {employeeId ? (
      <p>Employee ID: {employeeId}</p>
    ) : (
      <p>Employee ID not found</p>
    )}

      <form
        className="flex flex-wrap justify-center flex-col items-center mt-9 w-[80%] mb-8"
        onSubmit={handleSubmit}
      >
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Current Address"
            ref={InputCAddress}
            value={values.CAddress}
            name="CAddress"
            onChange={handleChange}
            onBlur={handleBlur}
            className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 m-2 w-[100%]"
          />
          {errors.CAddress && touched.CAddress ? (
            <p className="form-error">{errors.CAddress}</p>
          ) : null}
          <div className="flex w-[100%] flex-col gap-3 justify-between  md:flex-row md:gap-5 m-2">
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Current Area"
                ref={InputCArea}
                value={values.CArea}
                onChange={handleChange}
                name="CArea"
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2  md:w-[100%]"
              />
              {errors.CArea && touched.CArea ? (
                <p className="form-error">{errors.CArea}</p>
              ) : null}
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Current City"
                value={values.Ccity}
                name="Ccity"
                onChange={handleChange}
                onBlur={handleBlur}
                ref={InputCcity}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 md:w-[100%]"
              />
              {errors.Ccity && touched.Ccity ? (
                <p className="form-error">{errors.Ccity}</p>
              ) : null}
            </div>
          </div>

          <input
            type="text"
            value={values.PAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={InputPAddress}
            name="PAddress"
            placeholder="Permenant Address"
            className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 m-2 w-[100%]"
          />
          {errors.PAddress && touched.PAddress ? (
            <p className="form-error">{errors.PAddress}</p>
          ) : null}
          <div className="flex w-[100%] flex-col gap-3 justify-between  md:flex-row md:gap-5 m-2">
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Permenant Area"
                ref={InputPArea}
                name="PArea"
                value={values.PArea}
                onChange={handleChange}
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2  md:w-[100%]"
              />
              {errors.PArea && touched.PArea ? (
                <p className="form-error">{errors.PArea}</p>
              ) : null}
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                placeholder="Permenant City"
                ref={InputPcity}
                value={values.Pcity}
                onChange={handleChange}
                name="Pcity"
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 md:w-[100%]"
              />
              {errors.Pcity && touched.Pcity ? (
                <p className="form-error">{errors.Pcity}</p>
              ) : null}
            </div>
          </div>
          <div className="flex w-[100%] flex-col gap-3  justify-between  md:flex-row md:gap-5 m-2">
            <div className="w-[100%] mt-2">
              <input
                type="tel"
                pattern="[0-9]{4}-[0-9]{7}"
                placeholder="Mobile No."
                ref={Inputmobile}
                value={values.mobile}
                name="mobile"
                onChange={handleChange}
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2  md:w-[100%]"
              />
              {errors.mobile && touched.mobile ? (
                <p className="form-error">{errors.mobile}</p>
              ) : null}
            </div>
            <div className="w-[100%] mt-2">
              <input
                 type="tel"
                pattern="[0-9]{4}-[0-9]{7}"
                placeholder="Phone No."
                name="phone"
                ref={Inputphone}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 md:w-[100%]"
              />
              {errors.phone && touched.phone ? (
                <p className="form-error">{errors.phone}</p>
              ) : null}
            </div>
          </div>
          <div className="flex w-[100%] flex-col gap-3 justify-between  md:flex-row md:gap-5 m-2">
            <div className="w-[100%] mt-2">
              <input
                type="text"
                placeholder="Emergency Contact Name"
                ref={InputEname}
                name="Ename"
                value={values.Ename}
                onChange={handleChange}
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2  md:w-[100%]"
              />
              {errors.Ename && touched.Ename ? (
                <p className="form-error">{errors.Ename}</p>
              ) : null}
            </div>
            <div className="w-[100%] mt-2">
              <input
                type="text"
                placeholder="Emergency Contact Relation"
                ref={InputECname}
                name="ECname"
                value={values.ECname}
                onChange={handleChange}
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 md:w-[100%]"
              />
              {errors.ECname && touched.ECname ? (
                <p className="form-error">{errors.ECname}</p>
              ) : null}
            </div>
            <div className="w-[100%] mt-2">
              <input
                type="text"
                ref={InputEmobile}
                value={values.Emobile}
                onChange={handleChange}
                name="Emobile"
                onBlur={handleBlur}
                placeholder="Emergency Contact Number"
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 md:w-[100%]"
              />
              {errors.Emobile && touched.Emobile ? (
                <p className="form-error">{errors.Emobile}</p>
              ) : null}
            </div>
          </div>
          <div className="flex w-[100%] flex-col gap-3 justify-between  md:flex-row md:gap-5 m-2">
            <div className="w-[100%] mt-2">
              <input
                type="email"
                placeholder="Email Address"
                ref={Inputemail}
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2  md:w-[100%]"
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="w-[100%] mt-2">
              <input
                type="date"
                placeholder="Date Of Joining"
                ref={Inputdoj}
                value={values.doj}
                onChange={handleChange}
                name="doj"
                onBlur={handleBlur}
                className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  border-gray-300 p-2 md:w-[100%]"
              />
              {errors.doj && touched.doj ? (
                <p className="form-error">{errors.doj}</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between items-center w-[100%] px-2 mt-8">
            <button onClick={handleBackClick} className="button-back">
              <div className="flex justify-between flex-col">
                <span className="button-icon-back">
                  <ArrowBackIcon className="text-3xl" />
                </span>
                <span className="button-text"> BACK</span>
              </div>
            </button>
            <p>Page 2/4</p>
            <button type="submit" className="button">
              <span className="button-text"> SEND</span>
              <span className="button-icon">
                <SendIcon className="text-3xl" />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sub;
