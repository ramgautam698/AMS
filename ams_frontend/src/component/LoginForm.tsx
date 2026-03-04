// export default LoginForm;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUtils from "@/lib/apiUtils";
import { toast, Toaster } from 'react-hot-toast';
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) =>
  {
    e.preventDefault();
  
    apiUtils
      .post("ams/security/login", { email: email, password: password })
      .then((res) => {
        // Store user and token in session storage
        sessionStorage.setItem("user", JSON.stringify(res?.data));
        sessionStorage.setItem("token", res?.data?.password);
        // sessionStorage.setItem("roleType", res?.data?.roleType);
  
        // Display success message
        toast.success("Login Successful!", {
          duration: 1000,  // show the toast for 3 seconds
        });
  
        // Delay navigation to ensure the toast is visible before redirecting
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // 3 seconds delay to allow the toast to be seen
      })
      .catch((error) => {
        console.log(error);
  
        // Display error message when login fails
        toast.error("Login Failed! Please check your credentials.");
      });
  };

  return (
    <div className="flex w-[468px] items-center justify-center bg-gray-100">
      {/* Toaster component to display toast notifications */}
      <Toaster />

      <div className="flex w-[468px] items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md p-8 w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors"
          >
            Login
          </Button>
          <div className="mt-3 mb-6 flex items-center justify-between">
            <Button
              type="button"
              className="w-full rounded bg-lime-600 text-white py-2 hover:bg-lime-700 transition-colors"
              onClick={() => {navigate("/register")}}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


