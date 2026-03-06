import { Button } from '@/component/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/component/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/component/ui/table';
import apiUtils from '@/lib/apiUtils';
import React, { useEffect, useState } from 'react';
import RegisterForm from './RegistrationForm';
import { toast, Toaster } from 'react-hot-toast';
import { Input } from './ui/input';

const ArtistData: React.FC = () =>
{
    const userHead = [
        { "id": "Id" }, { "name": "Name" }, { "dob": "Date Of Birth" }, { "gender": "Gender"},
        { "address": "Address" }, { "firstReleaseYear": "First Release Year" },
        { "noOfAlbumsReleased": "No. Of Albums Released" },
        { "createdAt": "Created At" }, { "updatedAt": "Updated At" },
    ];
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({ offset: 0, noOfRows: 10, pageNo: 1 });
    const [open, setOpen] = useState(null);
    const [del, setDel] = useState("");
    const [artist, setArtist] = useState({ id:null, name: "", dob: "", gender: "", address: "",
        firstReleaseYear: "2000", noOfAlbumsReleased: 0
    });

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        apiUtils.post("ams/users/manager/artist", artist)
        .then((res) => {
            // Display success message
            if(artist.id === null)
                toast.success("Registration Successful!", {
                duration: 1000,  // show the toast for 3 seconds
                });
            else
                toast.success("Update Successful!", {
                duration: 1000,  // show the toast for 3 seconds
                });
            setOpen(null);
            setArtist({ id:null, name: "", dob: "", gender: "", address: "",
                firstReleaseYear: "2000", noOfAlbumsReleased: 0
            });
            getUsers();
        })
        .catch((error) => {
            toast.error("Registration Failed! ", {
            duration: 1000,  // show the toast for 3 seconds
            });
        });
    };

    const getUsers = (offset = pagination.offset, noOfRows = pagination.noOfRows) =>
    {
        // setActiveSection('Users');
        apiUtils.get("ams/users/manager/artist", { offset: offset, noOfRows: noOfRows }).then((res) =>
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
        setArtist({ id:null, name: "", dob: "", gender: "", address: "",
            firstReleaseYear: "2000", noOfAlbumsReleased: 0
        });
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
        let id = artist?.id;
        apiUtils.delete("ams/users/manager/artist", {id}).then((res) => {
            // Display success message
            toast.success("Artist Deleted !!!", {
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
                    <div className="flex relative w-full" onClick={() => setArtist(user)}>
                    <Button onClick={() => handleOpenModal("update")} className="bg-blue-500 hover:bg-blue-600 text-white rounded">Update</Button>
                    <Button onClick={() => setDel(user?.name)} className="bg-red-500 hover:bg-orange-500 text-white rounded ml-2">Delete</Button>
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
                        {open === "new" ? <> Register New Artist </> : <> Update Artist </>} </h2>
                    <span className="md:w-1/5 justify-end ">
                        <button className="bg-white" onClick={() => setOpen(null)} > Close </button>
                    </span>
                </div>
                <div className="modal-body ">
                    <form
                    onSubmit={handleSubmit}
                    className="p-9 grid grid-cols-2 md:grid-cols-2 gap-6 justify-center bg-gray-50"
                    >
                        {artist.id === null ? null :
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium mb-1">
                                ID
                            </label>
                            <Input disabled
                                id="id"
                                type="text"
                                value={artist.id}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        }
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={artist.name}
                                onChange={(e) => setArtist({...artist, name: e.target.value})}
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
                                value={artist.dob}
                                onChange={(e) => setArtist({...artist, dob: e.target.value})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-sm font-medium mb-1">
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={artist.gender}
                                onChange={(e) => setArtist({...artist, gender: e.target.value})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            >
                                <option id="M" value="M"> Male </option>
                                <option id="F" value="F"> Female </option>
                                <option id="O" value="O"> Other </option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium mb-1">
                                Address
                            </label>
                            <Input
                                id="address"
                                type="text"
                                value={artist.address}
                                onChange={(e) => setArtist({...artist, address: e.target.value})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstReleaseYear" className="block text-sm font-medium mb-1">
                                First Release Year
                            </label>
                            <Input
                                id="firstReleaseYear"
                                type="number"
                                value={artist.firstReleaseYear}
                                onChange={(e) =>{
                                    if(parseInt(e.target.value) < 2000)
                                        setArtist({...artist, firstReleaseYear: "2000"})
                                    else if(parseInt(e.target.value) > 2100)
                                        setArtist({...artist, firstReleaseYear: "2100"})
                                    else
                                        setArtist({...artist, firstReleaseYear: e.target.value})
                                }}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstReleaseYear" className="block text-sm font-medium mb-1">
                                No. Of Albums Released
                            </label>
                            <Input
                                id="noOfAlbumsReleased"
                                type="number"
                                value={artist.noOfAlbumsReleased}
                                onChange={(e) =>{
                                    if(parseInt(e.target.value) < 0)
                                        setArtist({...artist, noOfAlbumsReleased: 0})
                                    else
                                        setArtist({...artist, noOfAlbumsReleased: parseInt(e.target.value)})
                                }}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        {artist.id !== null ? <div></div> : null }
                        <div className="mt-3 mb-6 flex items-center justify-between">
                            <Button
                            type="submit"
                            className="rounded bg-lime-600 text-white py-2 hover:bg-lime-700 transition-colors"
                            >
                            {artist.id === null ? <span> Register </span> : <span> Update </span> }
                            </Button>
                    </div>
                </form>
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
                    Id: {artist.id}
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

export default ArtistData;