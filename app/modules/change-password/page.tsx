 "use client";

import { useState, ChangeEvent, FormEvent, ReactNode } from "react";
import Layout from '../../components/Layout';

interface FormFieldProps {
 label: string;
 required?: boolean;
 children: React.ReactNode;
 className?: string;
 error?: string; // Add error prop for validation messages
}

interface InputProps {
 name: string;
 placeholder?: string;
 type?: string;
 className?: string;
 value?: string;
 onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
 maxLength?: number;
 "data-validate"?: string;
}

// Form field components for reusability
const FormField: React.FC<FormFieldProps> = ({ label, required = false, children, className = "", error }) => (
 <div className={`mb-[10px] flex flex-col md:flex-row md:items-start gap-2 md:gap-4 ${className}`}> {/* Changed items-center to items-start */}
  <label className="form-label w-full md:w-1/2 pt-2 md:pt-0 mt-2"> {/* Added pt-2 for slight alignment with input, adjust as needed */}
   {label}
   {required && <span className="form-required text-red-500">*</span>}
  </label>
  <div className="flex flex-col w-full md:w-3/4"> {/* Removed min-h, will rely on consistent spacing */}
        {/* We'll ensure children (the input) and error message don't push each other */}
   {children}
   <div className="min-h-[20px]"> {/* This div reserves space for the error message */}
     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
  </div>
 </div>
);

const Input: React.FC<InputProps> = ({ name, placeholder, type = "text", className = "", ...props }) => (
 <input type={type} name={name} placeholder={placeholder} className={`form-control p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
);

export default function PasswordChange() {
 const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
  retypeNewPassword: "",
 });

 const [errors, setErrors] = useState({
  currentPassword: "",
  newPassword: "",
  retypeNewPassword: "",
  form: ""
 });

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  // Clear individual field errors on change
  setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: "" }));
  // Also clear the general form error if it exists
  if (errors.form) setErrors(prevErrors => ({ ...prevErrors, form: "" }));
 };

 const validateForm = () => {
  let isValid = true;
  let newErrors = {
   currentPassword: "",
   newPassword: "",
   retypeNewPassword: "",
   form: ""
  };

  if (!passwordForm.currentPassword) {
   newErrors.currentPassword = "Current password is required.";
   isValid = false;
  }
  if (!passwordForm.newPassword) {
   newErrors.newPassword = "New password is required.";
   isValid = false;
  } else if (passwordForm.newPassword.length < 6) {
   newErrors.newPassword = "New password must be at least 6 characters long.";
   isValid = false;
  }
  if (!passwordForm.retypeNewPassword) {
   newErrors.retypeNewPassword = "Retyping new password is required.";
   isValid = false;
  }

  if (passwordForm.newPassword && passwordForm.retypeNewPassword && passwordForm.newPassword !== passwordForm.retypeNewPassword) {
   newErrors.retypeNewPassword = "New passwords do not match.";
   isValid = false;
  }

  setErrors(newErrors);
  return isValid;
 };

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevent default form submission behavior

  if (!validateForm()) {
   setErrors(prevErrors => ({ ...prevErrors, form: "Please correct the errors in the form." }));
   return;
  }

  // Simulate API call
  console.log("Password Change Request:", passwordForm);
  // In a real app, you'd send this to your backend
  setTimeout(() => {
   console.log("Password change successful (simulated).");
   // You might want to clear the form or show a success message
   setPasswordForm({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
   });
   setErrors({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
    form: "Password changed successfully!"
   });
  }, 1000);
 };

 const handleUpdateClick = () => {
  // Manually trigger form submission when the "Update" button in the footer is clicked
  const formElement = document.getElementById('passwordChangeForm') as HTMLFormElement;
  if (formElement) {
    formElement.requestSubmit();
  }
 };

 const handleCancelClick = () => {
  // Add logic for cancelling, e.g., redirecting or clearing the form
  console.log("Password change cancelled.");
  setPasswordForm({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  setErrors({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
    form: ""
  });
 };

 return (
  <Layout pageTitle="Change Password">
   <div className="min-h-screen flex flex-col">
    <main id="main-content" className="flex-1 flex justify-center items-center p-4">
     <form id="passwordChangeForm" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md shadow-lg">
      <div className="text-center mb-6">
       <h2 className="text-2xl font-semibold text-gray-800">Change Your Password</h2>
      </div>

      <FormField label="Current Password" required error={errors.currentPassword}>
       <Input
        type="password"
        name="currentPassword"
        value={passwordForm.currentPassword}
        onChange={handleChange}
        placeholder="Enter current password"
        data-validate="required"
       />
      </FormField>

      <FormField label="New Password" required error={errors.newPassword}>
       <Input
        type="password"
        name="newPassword"
        value={passwordForm.newPassword}
        onChange={handleChange}
        placeholder="Enter new password"
        data-validate="required"
       />
      </FormField>

      <FormField label="Retype New Password" required error={errors.retypeNewPassword}>
       <Input
        type="password"
        name="retypeNewPassword"
        value={passwordForm.retypeNewPassword}
        onChange={handleChange}
        placeholder="Retype new password"
        data-validate="required"
       />
      </FormField>

      {errors.form && (
       <div className={`text-sm mt-4 p-2 rounded text-center ${errors.form.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {errors.form}
       </div>
      )}
     </form>
    </main>

    <footer className="bg-[#EBEFF3] px-4 py-2 h-[58px] flex-shrink-0 mb-[40px]" id="pattiyal_footer">
     <div className="flex flex-col md:flex-row justify-between items-center mt-[3px]">
      <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
       <button className="btn-sm btn-primary" onClick={handleUpdateClick}>Update</button>
       <button className="btn-sm btn-secondary" onClick={handleCancelClick}>Cancel</button>
      </div>
     </div>
    </footer>
   </div>
  </Layout>
 );
}