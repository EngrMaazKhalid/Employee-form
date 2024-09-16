"use client";

import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { EducationSchema } from "./FormSchema";
import Box from '@mui/material/Box';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function Education() {
  const searchParams = useSearchParams();
  const [employeeId, setEmployeeId] = useState(null);
  const [forms, setForms] = useState([{ id: Date.now(), isSaved: false, isDisabled: false }]);
  const [statusMessage, setStatusMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (searchParams) {
      const employee_id = searchParams.get("employee_id");
      if (employee_id) {
        setEmployeeId(employee_id);
        console.log("Employee ID from query:", employee_id);
      } else {
        console.error("Employee ID is missing from query.");
      }
    }
  }, [searchParams]);


  const addForm = () => {
    
    setForms([...forms, { id: Date.now(), isSaved: false, isDisabled: false }]); 
    // resetForm();// Add new form when 'Add' is clicked
  };
  const router = useRouter();
  const handleBackClick = (e) => {
    e.preventDefault();
    router.push(`/experience?employee_id=${employeeId}`);
  };
  const handleMainClick = (e) => {
    e.preventDefault();
    router.push(`/`);
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
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
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
         
          setStatusMessage("Form saved successfully!");
          setForms((prevForms) =>
            prevForms.map((form, index) => {
              if (index === prevForms.length - 1) {
                return { ...form, isSaved: true, isDisabled: true }; // Disable and mark form as saved
              }
              return form;
            })
          );
         
        } else {
          console.error("Failed to save data", result.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    borderRadius: '10px',
    bgcolor: '#181A20',
    border: '2px solid #16a34a ',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container auto flex flex-col justify-center items-center mt-8 mb-8 p-15">
      <h1 className="text-xl md:text-3xl text-center font-bold">
        Employee's Education Form
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
               value={values.degree}
               disabled={form.isDisabled}
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
               disabled={form.isDisabled}
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
                 disabled={form.isDisabled}
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
                 disabled={form.isDisabled}
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
                 disabled={form.isDisabled}
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
                 disabled={form.isDisabled}
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
             disabled={form.isDisabled}
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
           {form.isSaved && (
            <p className="text-green-600">Form saved successfully!</p>
          )}
         </form>
       ))}
       {/* {statusMessage && <p className="text-green-600">{statusMessage}</p>} */}
      {forms.length === 0 || forms[forms.length - 1].isSaved  ? ( // Only show add button after first form is saved
        <div className="flex justify-end w-[85%] md:mr-2 md:w-[80%]">
          <button
            onClick={addForm}
            className="border-2 border-blue-600 duration-200 text-sm md:text-base hover:bg-blue-600 text-white text-blue mb-5 rounded-3xl px-5 py-3"
          >
            Add
          </button>
        </div>
      ) : null }

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
        <button type="submit" onClick={handleOpen} className="button">
          <span className="button-text"> SUBMIT </span>
          <span className="button-icon">
            <SendIcon className="text-xl md:text-2xl" />
          </span>
        </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TaskAltIcon className="text-7xl text-green-600"/>
         <h1 >Your form have been submitted successfully</h1>
        <Button onClick={handleMainClick} className="text-lg mt-1 capitalize bg-green-600" variant="contained">Fill another form</Button>
        </Box>
      </Modal>
      </div>
    </div>
  );
}

export default Education;