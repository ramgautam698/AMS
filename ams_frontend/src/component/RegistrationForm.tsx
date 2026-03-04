import { Input } from '@/component/ui/input';
import apiUtils from '@/lib/apiUtils';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Button } from './ui/button';

interface RegProps {
    inputuser: { id: null, firstName: "", lastName: "", email: "", password: "",
        phone: "", dob: "", gender: "", address: "", roleType: "ARTIST"
    },
    state: number | 0,
    nextStep: () => {}
}

const RegisterForm: React.FC<RegProps> = ({inputuser, state, nextStep}) =>
{
    const [user, setUser] = useState(inputuser);

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        console.log("user", user)
        apiUtils.post("ams/users/register", user)
        .then((res) => {
            // Display success message
            toast.success("Registration Successful!", {
            duration: 1000,  // show the toast for 3 seconds
            });
    
            // Delay navigation to ensure the toast is visible before redirecting
            setTimeout(() => {
                nextStep();
            }, 1000); // 3 seconds delay to allow the toast to be seen
        })
        .catch((error) => {
            toast.error("Registration Failed! ", {
            duration: 1000,  // show the toast for 3 seconds
            });
        });
    };

  return (
    <div className="w-full items-center min-h-screen bg-gray-100 border border-black-300 rounded">
        {state === 1 ?
        <h2 className="text-2xl font-semibold text-center mb-6"> Register </h2>
        : null }
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
                    type="number"
                    value={user.phone}
                    onChange={(e) => {
                        if(e.target.value.length < 15)
                            setUser({...user, phone: e.target.value})
                    }}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dob" className="block text-sm font-medium mb-1">
                    Date of Birth
                </label>
                <Input
                    id="dob"
                    type="date"
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
                <select
                    id="gender"
                    value={user.gender}
                    onChange={(e) => setUser({...user, gender: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                >
                    <option id="M" value="M"> Male </option>
                    <option id="F" value="F"> Female </option>
                    <option id="O" value="O"> Other </option>
                </select>
            </div>
            {state === 0 ? <>
            <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium mb-1">
                    Role
                </label>
                <select
                    id="roleType"
                    value={user.roleType}
                    onChange={(e) => setUser({...user, roleType: e.target.value})}
                    className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                >
                    <option id="ARTIST" value="ARTIST"> Artist </option>
                    <option id="ARTIST_MANAGER" value="ARTIST_MANAGER"> Artist Manager </option>
                    <option id="SUPER_ADMIN" value="SUPER_ADMIN"> Super Admin </option>
                </select>
            </div>
            <div></div>
            </>: null }
            <div className="mt-3 mb-6 flex items-center justify-between">
                <Button
                type="submit"
                className="rounded bg-lime-600 text-white py-2 hover:bg-lime-700 transition-colors"
                >
                {state === 0 && user.id === null ? <> Register </> :
                state === 0 ? <> Update </> : <> Register </>} 
                </Button>
          </div>
    </form>
    </div>
  );
};

export default RegisterForm;