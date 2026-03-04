import { Button } from '@/component/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/component/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/component/ui/table';
import apiUtils from '@/lib/apiUtils';
import React, { useEffect, useState } from 'react';
import RegisterForm from './RegistrationForm';

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

    return(
    <>
        <div><Button onClick={() => handleOpenModal("new")}
            className="px-2 py-3 text-left text-xs font-medium text-green-500 uppercase bg-blue-100 tracking-wider">
                Register New User
        </Button></div>
        <Table>
            <TableCaption> User List </TableCaption>
            <TableHeader>
            <TableRow>
                {userHead.map((head, i) => (
                <TableHead key={i} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {Object.values(head)}
                </TableHead>
                ))}
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Update
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
                    <div className="relative w-full" onClick={() => setupdateUser({...user, password: null})}>
                    <Button onClick={() => handleOpenModal("update")} className="bg-blue-500 hover:bg-blue-600 text-white rounded right-0">Update</Button>
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
    </>
    )
}

export default UserData;