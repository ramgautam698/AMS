import RegisterForm from '@/component/RegistrationForm';
import React from 'react';

const RegisterPage: React.FC = () =>
{
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;