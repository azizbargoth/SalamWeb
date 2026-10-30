//// this file added by aziz

import  { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../app/AuthContext';
import Api from '../../data/api';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { notefyInfo } from '../../js/Tosats';
const inputClass =
  "w-full rounded-lg border border-[#262B36] text-[#E8E6E1] placeholder-[#8B92A3]/60 px-3.5 py-2.5 text-sm outline-none focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D] transition-colors";

const loginSchema= Yup.object({
     email: Yup.string().email("Enter a valid email.").required("Email is required."),
     password: Yup.string()
         .min(8, "Must be at least 8 characters.")
         .matches(/[a-z]/, "Needs a lowercase letter.")
         .matches(/[A-Z]/, "Needs an uppercase letter.")
         .matches(/[0-9]/, "Needs a number.")
         .matches(/[!@#$%^&*]/, "Needs a special character.")
         .required("Password is required.")
})
const LoginForm1 = ({onSuccess}) => {
     const navigate =useNavigate();
      const { login } = useAuth();
      const [showPassword, setShowPassword] = useState(false);
      const [formError, setFormError] = useState("");
      const [resMessage,SetResMessage]=useState("")
      const handleSubmit = async (values, { setSubmitting }) =>{
        try { 
             notefyInfo("loging in ......")
             const resMessage=await Api.post("/auth/login",values)
             
             SetResMessage(resMessage.data.message)
           
            if(!resMessage.data){
                throw new Error(resMessage.data.message || "Couldn't sign in. Check your credentials.");
            }
          
            login(values.user ?? resMessage.data); // updates AuthContext so ProtectedRoute lets you through
            onSuccess?.(resMessage.data.message);
            
            navigate("/admin")
             
        } catch (err) {
          setFormError(err.resMessage.data.message || "Something went wrong. Try again.");
        } finally {
          setSubmitting(false);
        }
      }
  return (
    <div className=" w-full  flex items-center justify-center px-4 py-4 border-gray-500 rounded">
      
      <div>
        <div className='text-center'><ToastContainer />
          <p className="font-mono text-xs tracking-[0.2em]  uppercase mb-2">
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold ">Sign in</h1>
        </div>
        <Formik           
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}>
            {({isSubmitting}) => (
              <Form className="bg-slate-700/50 border border-[#bbdefb] rounded-xl px-6 sm:p-8" noValidate>
                {formError && (
                  <div className="mb-5 rounded-lg border border-[#F87171]/30 bg-[#F87171]/10 px-3 py-2.5">
                    <span className="text-[#9b2226] text-sm">{formError}</span>
                  </div>
                )}
                <div><p>{resMessage}</p></div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <Field id="email" name="email" type="email" autoComplete="email" palceholder="example@email.com" className={inputClass} />
                    <ErrorMessage name="email" component="p" className="mt-1 text-xs text-[#F87171]" />
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block font-mono text-xs uppercase tracking-wide mb-1.5">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="text-xs text-[#8B92A3] hover:text-[#E8E6E1] transition-colors">
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Field id="password" name="password" 
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      palceholder="*********" 
                      className={inputClass} />
                    <ErrorMessage name="password" component="p" className="mt-1 text-xs text-[#F87171]" />
                </div>
                <button type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#E8A33D] text-[#171A21] font-medium text-sm py-2.5 hover:bg-[#DE9527] active:scale-[0.99] disabled:opacity-60 disabled:active:scale-100 transition-all">
                    {isSubmitting ? "signing in....": "sign in"}
                </button>
                {/* <ToastContainer />  */}
              </Form>
            )}
        </Formik>
        <p className="mt-6 text-center text-sm text-[#8B92A3]">
          Don't have an account?{" "}
          <a href="/register" className="text-[#E8A33D] hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm1
