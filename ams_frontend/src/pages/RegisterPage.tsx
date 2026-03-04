import RegisterForm from '@/component/RegistrationForm';
import React from 'react';
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () =>
{
  let navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm inputuser={{ id: null, firstName: "", lastName: "", email: "", password: "",
        phone: "", dob: "", gender: "", address: ""
      }} state={1} nextStep={() => navigate("/")} />
    </div>
  );
};

export default RegisterPage;