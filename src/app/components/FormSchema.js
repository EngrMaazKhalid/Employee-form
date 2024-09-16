import * as Yup from "yup";

export const FormSchema = Yup.object({
  name: Yup.string().min(2).max(30).required("Please enter your name"),
  Fname: Yup.string().min(2).max(30).required("Please enter your father name"),
  // Address:Yup.string().min(2).max(300).required("Please enter your Address"),
  City: Yup.string().min(3).max(30).required("Please enter City"),
  CNIC: Yup.string()
    .min(15)
    .max(15)
    .required("Please enter your CNIC with dashes"),
  dob: Yup.date().required("Please enter your Date of Birth"),
  blood: Yup.string().min(2).max(2).required("Please enter your blood Group"),
  image: Yup.mixed().test("fileSize", "File size is too large", value => !value || (value && value.size <= 5242880)) // 5MB limit
    .test("fileType", "Unsupported file format", value => !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)))
    .required("Please upload your image"),
});

export const SubSchema = Yup.object({
  CAddress: Yup.string()
    .min(2)
    .max(300)
    .required("Please enter your current address"),
  CArea: Yup.string().min(2).max(30).required("Please enter your current area"),
  Ccity: Yup.string().min(2).max(30).required("Please enter your current city"),
  PAddress: Yup.string()
    .min(2)
    .max(300)
    .required("Please enter your permenant address"),
  PArea: Yup.string()
    .min(2)
    .max(30)
    .required("Please enter your permenant area"),
  Pcity: Yup.string()
    .min(2)
    .max(30)
    .required("Please enter your permenant city"),
  mobile: Yup.string()
    .min(10)
    .max(14)
    .required("Please enter your mobile number"),
  phone: Yup.string()
    .min(10)
    .max(14)
    .required("Please enter your phone number"),
  Ename: Yup.string()
    .min(2)
    .max(30)
    .required("Please enter your emergency contact number"),
  ECname: Yup.string()
    .min(2)
    .max(30)
    .required("Please enter your Emergency contact Relation"),
  Emobile: Yup.string()
    .min(10)
    .max(14)
    .required("Please enter your emergency mobile number"),
  email: Yup.string().email().required("Please enter your name"),
  doj: Yup.date().required("Please enter your Date of joining"),
});

export const ExperienceSchema = Yup.object({
  job: Yup.string().min(2).max(50).required("Please enter your job title"),
  company: Yup.string()
    .min(2)
    .max(50)
    .required("Please enter your company name"),
  years: Yup.string()
    .min(1)
    .max(30)
    .required("Please enter your years of experience"),
  Clocation: Yup.string()
    .min(3)
    .max(50)
    .required("Please enter your company location"),
});

export const EducationSchema = Yup.object({
  degree: Yup.string()
    .min(2)
    .max(50)
    .required("Please enter your degree title"),
  institute: Yup.string()
    .min(2)
    .max(50)
    .required("Please enter your institute name"),
  Syear: Yup.date().required("Please enter degree's starting date"),
  Fyear: Yup.date().required("Please enter degree's Passing date"),
  grade: Yup.string().min(3).max(50).required("Please enter your grade/cgpa"),
  City: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter your institute City"),
});
