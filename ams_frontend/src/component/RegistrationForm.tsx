import { Input } from '@/component/ui/input';
import apiUtils from '@/lib/apiUtils';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Button } from './ui/button';

const RegisterForm: React.FC = () =>
{
    let navigate = useNavigate();
    const [user, setUser] = useState({ id: null, firstName: "", lastName: "", email: "", password: "",
        phone: "", dob: "", gender: "", address: ""
    });

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        apiUtils.post("ams/users/register", user)
        .then((res) => {
            // Display success message
            toast.success("Registration Successful!", {
            duration: 1000,  // show the toast for 3 seconds
            });
    
            // Delay navigation to ensure the toast is visible before redirecting
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000); // 3 seconds delay to allow the toast to be seen
        })
        .catch((error) => {
            toast.error("Registration Failed! ");
        });
    };

  return (
    <div className="w-full items-center min-h-screen bg-gray-100 border border-black-300 rounded">
        <h2 className="text-2xl font-semibold text-center mb-6"> Register </h2>
      <form
          onSubmit={handleSubmit}
          className="p-9 grid grid-cols-2 md:grid-cols-2 gap-6 justify-center bg-gray-50"
        >
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                </label>
                <Input
                    id="firstName"
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({...user, firstName: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                </label>
                <Input
                    id="lastName"
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({...user, lastName: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                </label>
                <Input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                </label>
                <Input
                    id="phone"
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dob" className="block text-sm font-medium mb-1">
                    Date of Birth
                </label>
                <Input
                    id="dob"
                    type="text"
                    value={user.dob}
                    onChange={(e) => setUser({...user, dob: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                </label>
                <Input
                    id="address"
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({...user, address: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium mb-1">
                    Gender
                </label>
                <Input
                    id="gender"
                    type="text"
                    value={user.gender}
                    onChange={(e) => setUser({...user, gender: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mt-3 mb-6 flex items-center justify-between">
                <Button
                type="submit"
                className="rounded bg-lime-600 text-white py-2 hover:bg-lime-700 transition-colors"
                >
                Register Now
                </Button>
          </div>
    </form>
    </div>
  );
};

export default RegisterForm;