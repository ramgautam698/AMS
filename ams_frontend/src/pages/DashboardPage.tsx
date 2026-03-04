import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from 'lucide-react';
import apiUtils from '@/lib/apiUtils';
import UserData from '@/component/UserData';

const DashboardPage: React.FC = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({firstName: "User", lastName: " ", roleType: ""});
    const [tab, setTab] = useState(0);
    let navigate = useNavigate();

    useEffect(() =>{
        //
        let userData = JSON.parse(sessionStorage.getItem("user"));
        if(userData === null || userData === undefined)
        {
            sessionStorage.clear();
            navigate("/");
        }
        else
        {
            setUser(userData);
        }
    }, []);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const logout = () =>
    {
        setIsOpen(false); // Close the dropdown after logout
        apiUtils.post("ams/security/logout").then((res) => {
          if (res.data) {
            sessionStorage.clear();
            navigate("/");
          }
        })
    }

    return(
    <div className="p-1">
        <div className="flex overflow-x-scroll flex-col min-h-screen bg-gray-100">
            <header className="bg-sky-600 sticky top-0 text-white shadow-md">
                <div className="container  mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold"> {user.firstName} {user.lastName} </h1>
                    <nav className="hidden md:flex space-x-4">
                        {user.roleType === "SUPER_ADMIN"? <>
                            <div className="flex items-center cursor-pointer mr-1" onClick={() => setTab(0)}>
                                <span> User Data </span>
                            </div>
                        </> : null}
                        <div className="relative group">
                            <div className="flex items-center cursor-pointer ml-9" onClick={toggleDropdown}>
                                <span> Log Out</span>
                                <ChevronDown size={16} className="ml-1" />
                            </div>
                            {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                                Log Out
                                </div>
                            </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            {user.roleType === "SUPER_ADMIN" && tab === 0 ? <>
                <UserData />
            </> : null}

        </div>
    </div>
    )
}

export default DashboardPage;