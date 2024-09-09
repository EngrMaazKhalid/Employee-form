'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik'
import { ExperienceSchema } from './FormSchema';

function Experience() {

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
    const router = useRouter();
    const handleButtonClick = (e) => {
        e.preventDefault();
        router.push(`/education?employee_id=${employeeId}`);
    }

    const handleBackClick = (e) => {
      // Navigate to the Sub page
      e.preventDefault();
      router.push('/sub');
    };

      // State to keep track of all forms
  const [forms, setForms] = useState([{ id: Date.now() }]);

  // Function to add a new form
  const addForm = () => {
    setForms([...forms, { id: Date.now() }]);
  };

  
  const initialValues =
  {
      job: "",
      company: "",
      years: "",
      Clocation: "",
      summary: ""
  };
      const Inputjob = useRef();
      const Inputcompany = useRef();
      const Inputyears = useRef();
      const InputClocation = useRef();
      const Inputsummary = useRef();

  const { values, errors, touched, status, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
      validationSchema: ExperienceSchema,
      onSubmit: async (values, formValues) => {
        try {
          const res = await fetch('/api/employee/experience', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
             { ...values,
            employeeId,}
            ),
          });
    
          const result = await res.json();
          if (result.success) {
            console.log("Data saved:", result);
            // router.push(`/experience?employee_id=${employeeId}`);
          } else {
            console.log(values)
            console.log(formValues)
            console.log(employeeId)
            console.error("Failed to save data", result.error);
            
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        }
        console.log(values);
        // {errors.job && touched.job && errors.company && touched.company && errors.years && touched.years && errors.Clocation && touched.Clocation ? null : router.push("/education")}
      }
    });


  return (
    <div className="container auto flex flex-col justify-center items-center mt-8 mb-8 p-15">
      <h1 className="text-2xl text-center mt-8 font-bold">Employee's Job Experience Form</h1>
      
     {forms.map((form, index) => (<form key={form.id} onSubmit={handleSubmit} className="flex flex-wrap justify-center flex-col items-center mt-9 mb-5 w-[80%]">
      <div className='w-[100%]'>
        <input
          type="text"
          value={values.job}
          onChange={handleChange}
          onBlur={handleBlur}
          name="job"
          ref={Inputjob}
          placeholder="Job Title"
          className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  p-2 m-2 w-[100%]"
        />
        {errors.job && touched.job ? (<p className='form-error'>{errors.job}</p>) : null}
      </div>
        <div className="flex w-[100%] flex-col gap-3 justify-between  md:flex-row md:gap-5 m-2">
        <div className='w-[100%]'>
          <input
            type="text"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            name="company"
            ref={Inputcompany}
            placeholder="Company Name"
            className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  p-2  w-[100%]"
          />
          {errors.company && touched.company ? (<p className='form-error'>{errors.company}</p>) : null}
          </div>
          <div className='w-[100%]'>
          <input
            type="text"
            placeholder="Number of Years"
            value={values.years}
            onChange={handleChange}
            onBlur={handleBlur}
            name="years"
            ref={Inputyears}
            className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6 p-2 w-[100%]"
          />
          {errors.years && touched.years ? (<p className='form-error'>{errors.years}</p>) : null}
          </div>
          <div className='w-[100%]'>
          <input
            type="text"
            placeholder="Company Location"
            value={values.Clocation}
            onChange={handleChange}
            onBlur={handleBlur}
            name="Clocation"
            ref={InputClocation}
            className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6 p-2 w-[100%]"
          />
          {errors.Clocation && touched.Clocation ? (<p className='form-error'>{errors.Clocation}</p>) : null}
        </div>
        </div>
        <textarea 
            placeholder="Summary"
            value={values.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            name="summary"
            ref={Inputsummary}
            className="Input duration-200 bg-primarylight py-4 rounded-3xl px-6  min-h-[10rem] p-2 m-2 w-[100%]"
        />
       <div className="flex w-[100%] justify-end gap-3 px-2 m-2">

       
     
       <button className="bg-blue-800 duration-200 hover:bg-blue-700 text-white justify-start  rounded-3xl px-6 py-3">
         Save
        </button>
       </div>
      </form>))}
      <div className='flex justify-end w-[80%]'>
      <button onClick={addForm} className="border-2 border-blue-600 duration-200 uppercase hover:bg-blue-600 text-white text-blue mb-5 rounded-3xl px-6 py-3">
         Add
        </button>
        <button onClick={handleButtonClick} className="border-2 border-red-600 ml-5 uppercase duration-200 hover:bg-red-600 text-white text-blue mb-5 rounded-3xl px-6 py-3">
         skip
        </button>
        </div>
        <div className="flex justify-between items-center w-[80%] px-2 mt-4">
        <button onClick={handleBackClick} className='button-back'>
                            <div className="flex justify-between flex-col">
                             <span className='button-icon-back'>
                             <ArrowBackIcon className="text-3xl" />
                             </span>
                        <span className='button-text'> BACK</span>
                        </div>
                             </button>
                             <p>Page 3/4</p>
        <button onClick={handleButtonClick}   className='button'>
                        
                        <span className='button-text'> SEND</span>
                            <span className='button-icon'>
                             <SendIcon className="text-3xl" />
                             </span>
                             </button>
          
        </div>
    </div>
  )
}

export default Experience