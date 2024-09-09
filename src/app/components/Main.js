"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik'
import { FormSchema } from "./FormSchema";



function Main() {
  const router = useRouter();

  const handleButtonClick = (e) => {
    // Navigate to the Sub page
    e.preventDefault();
    router.push("/sub");
  };

    const [submitting, setSubmitting] = useState();
  const initialValues =
  {
      name: "",
      Fname: "",
      Address: "",
      City: "",
      CNIC: "",
      dob: "",
      blood: ""
  };
     const Inputname = useRef();
     const InputFname = useRef();
     const InputAddress= useRef();
     const InputCity = useRef();
     const InputCNIC = useRef();
     const Inputdob = useRef();
    const Inputblood = useRef();

  const { values, errors, touched, status, handleBlur, handleChange, handleSubmit } = useFormik({
   initialValues: initialValues,
    validationSchema: FormSchema,
    onSubmit:  async (values, errors, touched, actions) => {
      try {
        const res = await fetch('/api/employee/main', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const data = await res.json();
        if (res.ok) {
          console.log('Form submitted successfully:', data);
          // Navigate to the next page if successful
          // router.push("/sub");
          const employeeId = data.employeeId; // Use the employeeId from the response
          router.push(`/sub?employee_id=${employeeId}`);
        } else {
          console.error('Error submitting form:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
      actions.setSubmitting(false);
      console.log(values);
      {errors.name && touched.name && errors.Fname && touched.Fname && errors.Address && touched.Address && errors.City && touched.City && errors.CNIC && touched.CNIC && errors.dob && touched.dob && errors.blood && touched.blood ? null : router.push("/sub")}
    }
  });

  return (
    <div className="container auto flex flex-col justify-center items-center p-15">
      <h1 className="text-2xl font-bold">Employee's Form</h1>

      <form className="flex flex-wrap justify-center flex-col items-center mt-9 w-[80%]" onSubmit={handleSubmit}>
     <div className="w-[100%]">
        <input
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          ref={Inputname}
          placeholder="Your Name"
          className=" Input rounded-3xl duration-200 bg-primarylight py-4 px-5 m-2 w-[100%]"
        />
        {errors.name && touched.name ? (<p className='form-error'>{errors.name}</p>) : null}
        <input
          type="name"
          value={values.Fname}
          onChange={handleChange}
          onBlur={handleBlur}
          name="Fname"
          ref={InputFname}
          placeholder="Father Name"
          className="Input rounded-3xl duration-200 bg-primarylight py-4 px-5 m-2 w-[100%]"
        />
        {errors.Fname && touched.Fname ? (<p className='form-error'>{errors.Fname}</p>) : null}
        <input
          type="text"
          placeholder="Address"
          value={values.Address}
          onChange={handleChange}
          onBlur={handleBlur}
          name="Address"
          ref={InputAddress}
          className="rounded-3xl Input duration-200 bg-primarylight py-4 m-2 px-5 w-[100%]"
        />
        {errors.Address && touched.Address ? (<p className='form-error'>{errors.Address}</p>) : null}
    </div>


        <div className="flex w-[100%]  flex-col justify-between gap-4  md:flex-row md:m-2">
          <div className="w-[100%]">
          <input
            type="text"
            value={values.City}
            onChange={handleChange}
            onBlur={handleBlur}
            name="City"
            ref={InputCity}
            placeholder="City"
            className="rounded-3xl Input duration-200 bg-primarylight py-4 px-5 w-[100%] "
          />
          {errors.City && touched.City ? (<p className='form-error'>{errors.City}</p>) : null}
          </div>
          <div className="w-[100%]">
          <input
            type="text"
            value={values.CNIC}
            onChange={handleChange}
            onBlur={handleBlur}
            name="CNIC"
            ref={InputCNIC}
            placeholder="CNIC"
            className="rounded-3xl duration-200 Input bg-primarylight px-5 w-[100%] py-4"
          />
          {errors.CNIC && touched.CNIC ? (<p className='form-error'>{errors.CNIC}</p>) : null}
          </div>
        </div>
        <div className="flex w-[100%] justify-between gap-2 md:gap-9 m-2">
        <div className="w-[100%]">
          <input
            type="date"
            value={values.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            name="dob"
            ref={Inputdob}
            placeholder="Date of birth"
            className=" rounded-3xl duration-200 Input bg-primarylight py-4 px-5 w-[100%]"
          />
          {errors.dob && touched.dob ? (<p className='form-error'>{errors.dob}</p>) : null}
          </div>
          <div className="w-[100%]">
          <input
            type="text"
            value={values.blood}
            onChange={handleChange}
            onBlur={handleBlur}
            name="blood"
            ref={Inputblood}
            placeholder="Blood Group"
            className="rounded-3xl duration-200 Input bg-primarylight px-5 py-4 w-[100%]"
          />
          {errors.blood && touched.blood ? (<p className='form-error'>{errors.blood}</p>) : null}
          </div>
        </div>
        <div className="flex justify-between w-[100%] items-center px-2 mt-8">
        <p className="text-xl">Page 1/4</p>
        <button type='submit'  className='button'>
                        
                        <span className='button-text'> SEND</span>
                            <span className='button-icon'>
                             <SendIcon className="text-3xl" />
                             </span>
                             </button>

        </div>
      </form>
    </div>
  );
}

export default Main;
