import { Button } from '@/component/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/component/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/component/ui/table';
import apiUtils from '@/lib/apiUtils';
import React, { useEffect, useState } from 'react';
import RegisterForm from './RegistrationForm';
import { toast, Toaster } from 'react-hot-toast';

const UserData: React.FC = () =>
{
    const userHead = [
        { "id": "Id" }, { "firstName": "First Name" }, { "lastName": "Last Name" },
        { "email": "Email" }, { "phone": "Phone No." }, { "dob": "Date Of Birth" },
        { "address": "Address" }, { "createdAt": "Created At" }, { "updatedAt": "Updated At" },
        { "roleType": "Role Type" },
        
    ];
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({ offset: 0, noOfRows: 10, pageNo: 1 });
    const [updateUser, setupdateUser] = useState({ id: null, firstName: "", lastName: "", email: "", password: "",
        phone: "", dob: "", gender: "", address: "", roleType: null
    });
    const [open, setOpen] = useState(null);
    const [del, setDel] = useState("");

    const getUsers = (offset = pagination.offset, noOfRows = pagination.noOfRows) =>
    {
        // setActiveSection('Users');
        apiUtils.get("ams/super-admin/user", { offset: offset, noOfRows: noOfRows }).then((res) =>
        {
            // Ensure res.data is an array
            if (Array.isArray(res.data))
            {
                setUserList(res.data);
            }
            else
            {
                console.error("Unexpected data format:", res.data);
                setUserList([]); // Set an empty list or handle the error appropriately
            }
        }).catch((error) => {
            console.error("API error:", error);
        });
    };

     const handleOpenModal = (arg = "new") => {
       if(open === null)
       {
        if(arg === "update")
            getUsers();
        setOpen(arg);
        setupdateUser({ id: null, firstName: "", lastName: "", email: "", password: "",
            phone: "", dob: "", gender: "", address: "", roleType: null,
        })
       }
       else
        setOpen(null);
       return 1;
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = () =>
    {
        let email = del;
        apiUtils.delete("ams/super-admin/user", {email}).then((res) => {
            // Display success message
            toast.success("User Deleted !!!", {
            duration: 1000,  // show the toast for 3 seconds
            });
            setDel("");
            getUsers();

        })
        .catch((error) => {
            toast.error("Deletion Failed! ", {
            duration: 1000,  // show the toast for 3 seconds
            });
        });
    }

    return(
    <>
        <Toaster />
        <div><Button onClick={() => handleOpenModal("new")}
            className="px-2 py-3 text-left text-xs font-medium text-green-500 uppercase bg-blue-100 tracking-wider">
                Register New Artist
        </Button></div>
        <Table>
            <TableCaption> Artist List </TableCaption>
            <TableHeader>
            <TableRow>
                {userHead.map((head, i) => (
                <TableHead key={i} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {Object.values(head)}
                </TableHead>
                ))}
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Action
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {userList.map((user, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                {userHead.map((head, j) => (
                    <TableCell key={j} className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user[Object.keys(head)[0]]}
                    </TableCell>
                ))}
                <TableCell className="text-sm text-gray-900">
                    <div className="flex relative w-full" onClick={() => setupdateUser({...user, password: null})}>
                    <Button onClick={() => handleOpenModal("update")} className="bg-blue-500 hover:bg-blue-600 text-white rounded">Update</Button>
                    <Button onClick={() => setDel(user?.email)} className="bg-red-500 hover:bg-orange-500 text-white rounded ml-2">Delete</Button>
                    </div>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Pagination className="mt-4">
            <PaginationContent>
            <PaginationItem>
                <PaginationPrevious
                disabled={pagination.pageNo === 1}
                onClick={() => {
                    const offset = pagination.offset - pagination.noOfRows;
                    setPagination({
                    ...pagination,
                    pageNo: pagination.pageNo - 1,
                    offset: offset,
                    });
                    getUsers(offset, pagination.noOfRows);
                }}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink>{pagination.pageNo}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationNext
                disabled={userList.length < pagination.noOfRows}
                onClick={() => {
                    const offset = pagination.offset + pagination.noOfRows;
                    setPagination({
                    ...pagination,
                    pageNo: pagination.pageNo + 1,
                    offset: offset,
                    });
                    getUsers(offset, pagination.noOfRows);
                }}
                />
            </PaginationItem>
            </PaginationContent>
        </Pagination>

        {open !== null ?
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 w-full ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-h-screen overflow-y-auto ">
                <div className='flex bg-blue-200 flex-col md:flex-row gap-4 bg-blue-800 justify-center items-center'>
                    <h2 className="text-xl font-bold text-white md:w-4/5 ">
                        {open === "new" ? <> Add New User </> : <> Update User </>} </h2>
                    <span className="md:w-1/5 justify-end ">
                        <button className="bg-white" onClick={() => setOpen(null)} > Close </button>
                    </span>
                </div>
                <div className="modal-body ">
                    <RegisterForm inputuser={updateUser} state={0} nextStep={() => handleOpenModal(null)} />
                </div>
            </div>
        </div>
        : null }

        {del?.length > 3 ?
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 w-full ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-h-screen overflow-y-auto ">
                <div className='flex bg-blue-200 flex-col md:flex-row gap-4 bg-blue-800 justify-center items-center'>
                    <h2 className="text-xl font-bold text-white md:w-4/5 "> Delete User</h2>
                    <span className="md:w-1/5 justify-end ">
                        <button className="bg-white" onClick={() => setDel("")} > Close </button>
                    </span>
                </div>
                <div className="modal-body ">
                    Are you sure you want to record user of selected user? <p />
                    Email: {del}
                </div>
                <div className="mt-3 mb-6 flex items-center justify-between">
                    <Button type="button" onClick={() => setDel("")}
                    className="rounded bg-green-600 text-white py-2 hover:bg-green-400 transition-colors" >
                        Cancel
                    </Button>
                    <Button type="button" onClick={() => deleteUser()}
                    className="rounded bg-red-600 text-white py-2 hover:bg-orange-700 transition-colors" >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
        : null }
    </>
    )
}

export default UserData;