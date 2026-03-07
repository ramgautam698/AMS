import { Button } from '@/component/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/component/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/component/ui/table';
import apiUtils from '@/lib/apiUtils';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Input } from './ui/input';

interface MusicProps {
    artistId: number | 0
}

const MusicData: React.FC<MusicProps> = ({artistId}) =>
{
    const tableHead = [
        { "id": "Id" }, { "title": "Title" }, { "albumName": "Album Name" }, { "genre": "Genre"},
        { "createdAt": "Created At" }, { "updatedAt": "Updated At" },
    ];
    const [musicList, setMusicList] = useState([]);
    const [pagination, setPagination] = useState({ offset: 0, noOfRows: 10, pageNo: 1 });
    const [open, setOpen] = useState(null);
    const [del, setDel] = useState({id:null});
    const [music, setMusic] = useState({ id:null, title: "", albumName: "", genre: "", artishId: { id: null } });
    const [user, setUser] = useState({firstName: "User", lastName: " ", roleType: ""});

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        apiUtils.post("ams/users/music/artist", music)
        .then((res) => {
            // Display success message
            if(music.id === null)
                toast.success("Music Added !!!", {
                duration: 1000,  // show the toast for 3 seconds
                });
            else
                toast.success("Update Successful!", {
                duration: 1000,  // show the toast for 3 seconds
                });
            setOpen(null);
            setMusic({  id:null, title: "", albumName: "", genre: "", artishId: { id: null }  });
            getMusic();
        })
        .catch((error) => {
            toast.error("Registration Failed! ", {
            duration: 1000,  // show the toast for 3 seconds
            });
        });
    };

    const getMusic = (offset = pagination.offset, noOfRows = pagination.noOfRows) =>
    {
        apiUtils.get("ams/users/music", { artishId: artistId, offset: offset, noOfRows: noOfRows })
        .then((res) =>
        {
            // Ensure res.data is an array
            if (Array.isArray(res.data))
            {
                setMusicList(res.data);
            }
            else
            {
                console.error("Unexpected data format:", res.data);
                setMusicList([]); // Set an empty list or handle the error appropriately
            }
        }).catch((error) => {
            console.error("API error:", error);
        });
    };

     const handleOpenModal = (arg = "new") => {
       if(open === null)
       {
        if(arg === "update")
            getMusic();
        setOpen(arg);
        setMusic({ id:null, title: "", albumName: "", genre: "", artishId: { id: null } });
       }
       else
        setOpen(null);
       return 1;
    };

    useEffect(() => {
        getMusic();
        let userData = JSON.parse(sessionStorage.getItem("user"));
        setUser(userData);
    }, [artistId]);

    const deleteMusic = () =>
    {
        apiUtils.delete("ams/users/music/artist", {musicId: del?.id}).then((res) => {
            // Display success message
            toast.success("Music Deleted !!!", {
            duration: 1000,  // show the toast for 3 seconds
            });
            setDel({id:null});
            getMusic();

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
        {user.roleType === "ARTIST" ?
        <div><Button onClick={() => handleOpenModal("new")}
            className="px-2 py-3 text-left text-xs font-medium text-green-500 uppercase bg-blue-100 tracking-wider">
                Add New Music
        </Button></div>
        : null }
        <Table>
            <TableCaption> Music List </TableCaption>
            <TableHeader>
            <TableRow>
                {tableHead.map((head, i) => (
                <TableHead key={i} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {Object.values(head)}
                </TableHead>
                ))}
                {user.roleType === "ARTIST" ? <TableHead className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Action
                </TableHead>
                : null }
            </TableRow>
            </TableHeader>
            <TableBody>
            {musicList.map((music, i) => (
                <TableRow key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                {tableHead.map((head, j) => (
                    <TableCell key={j} className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    {music[Object.keys(head)[0]]}
                    </TableCell>
                ))}
                {user.roleType === "ARTIST" ? <>
                    <TableCell className="text-sm text-gray-900">
                        <div className="flex relative w-full" onClick={() => setMusic(music)}>
                        <Button onClick={() => handleOpenModal("update")} className="bg-blue-500 hover:bg-blue-600 text-white rounded">Update</Button>
                        <Button onClick={() => setDel(music)} className="bg-red-500 hover:bg-orange-500 text-white rounded ml-2">Delete</Button>
                        </div>
                    </TableCell>
                </> : null}
                
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
                    getMusic(offset, pagination.noOfRows);
                }}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink>{pagination.pageNo}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationNext
                disabled={musicList.length < pagination.noOfRows}
                onClick={() => {
                    const offset = pagination.offset + pagination.noOfRows;
                    setPagination({
                    ...pagination,
                    pageNo: pagination.pageNo + 1,
                    offset: offset,
                    });
                    getMusic(offset, pagination.noOfRows);
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
                        {open === "new" ? <> Register New Music </> : <> Update Music </>} </h2>
                    <span className="md:w-1/5 justify-end ">
                        <button className="bg-white" onClick={() => setOpen(null)} > Close </button>
                    </span>
                </div>
                <div className="modal-body ">
                    <form
                    onSubmit={handleSubmit}
                    className="p-9 grid grid-cols-2 md:grid-cols-2 gap-6 justify-center bg-gray-50"
                    >
                        {music.id === null ? null :
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium mb-1">
                                ID
                            </label>
                            <Input disabled
                                id="id"
                                type="text"
                                value={music.id}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        }
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium mb-1">
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                value={music.title}
                                onChange={(e) => setMusic({...music, title: e.target.value})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="albumName" className="block text-sm font-medium mb-1">
                                Album Name
                            </label>
                            <Input
                                id="albumName"
                                type="albumName"
                                value={music.albumName}
                                onChange={(e) => setMusic({...music, albumName: e.target.value})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="genre" className="block text-sm font-medium mb-1">
                                Genre
                            </label>
                            <select
                                id="genre"
                                value={music.genre}
                                onChange={(e) => setMusic({...music, genre: e.target.value})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            >
                                <option id="RND" value="RND"> RND </option>
                                <option id="COUNTRY" value="COUNTRY"> COUNTRY </option>
                                <option id="CLASSIC" value="CLASSIC"> CLASSIC </option>
                                <option id="ROCK" value="RND"> ROCK </option>
                                <option id="JAZZ" value="JAZZ"> JAZZ </option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="artishId" className="block text-sm font-medium mb-1">
                                Artist Id
                            </label>
                            <Input disabled={music.id !== null}
                                id="artishId"
                                type="artishId"
                                value={music.artishId?.id}
                                onChange={(e) => setMusic({...music, artishId: { id: e.target.value }})}
                                className="w-full bg-sky-300 px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        {music.id !== null ? <div></div> : null }
                        <div className="mt-3 mb-6 flex items-center justify-between">
                            <Button
                            type="submit"
                            className="rounded bg-lime-600 text-white py-2 hover:bg-lime-700 transition-colors"
                            >
                            {music.id === null ? <span> Register </span> : <span> Update </span> }
                            </Button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        : null }

        {del?.id !== null ?
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 w-full ">
            <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-h-screen overflow-y-auto ">
                <div className='flex bg-blue-200 flex-col md:flex-row gap-4 bg-blue-800 justify-center items-center'>
                    <h2 className="text-xl font-bold text-white md:w-4/5 "> Delete User</h2>
                    <span className="md:w-1/5 justify-end ">
                        <button className="bg-white" onClick={() => setDel({id:null})} > Close </button>
                    </span>
                </div>
                <div className="modal-body ">
                    Are you sure you want to delete selected music? <p />
                    Title: {del?.title} <p />
                    Album: {del?.title}
                </div>
                <div className="mt-3 mb-6 flex items-center justify-between">
                    <Button type="button" onClick={() => setDel({id:null})}
                    className="rounded bg-green-600 text-white py-2 hover:bg-green-400 transition-colors" >
                        Cancel
                    </Button>
                    <Button type="button" onClick={() => deleteMusic()}
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

export default MusicData;