import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from '../assets/logo.svg'

const GET_URL = "http://localhost:5000/api/users/get";
const ASSIGN_URL = "http://localhost:5000/api/users/getassigned";

function ProfilePage() {    
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const saved = localStorage.getItem("jwtToken");
            const config = {
                headers: {
                Authorization: `Bearer ${saved}`,
                'Content-Type': 'application/json',
             },
        };
            const response = await axios.get(GET_URL,config);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };
    
        fetchUserData();
    }, []);

    const assignedtask = async () =>{
        try{
            const saved = localStorage.getItem("jwtToken")
            const config = {
                headers:{
                Authorization: `Bearer ${saved}`,
                'Content-Type': 'application/json',
                },
            };
            const response = await axios.get(ASSIGN_URL,config);
            console.log(response.data)
            setData(response.data);
        }catch(error){
            console.error("Error fetching task:", error);
        }
    }
    
    
    return (
        <div>
            <div className="border-b-2 font-semibold text-lg">
                <div className=" ">
                    <p>Profile</p>
                </div>  
            </div>
            <div className="grid grid-rows-2 mt-2 text-sm">
                <div>
                <img className="h-14 my-2" src={AddIcon}/>
                </div>
                <div className="flex">
                <label className="font-semibold">Name:</label>
                <p className="ml-2 font-semibold text-yellow-500">Ashish Dhiman</p>
                </div>
                <div className="flex">
                <label className="font-semibold">username:</label>
                <p className="mt-2 text-sm ml-2">{user.username}</p>
                </div>
                <div className="flex">
                <label className="font-semibold">email:</label>
                <p className="text-lg ml-2">{user.email}</p>
                </div>
            </div>
            <div className="flex justify-end">
            <Link to='/logout' className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-1 px-4 rounded-2xl">Logout</Link>
            </div>
        </div>



        // <div className="bg-white flex flex-col items-center">
        //     <div className="">
        //     <h1 className="font-bold">Profile Settings</h1>
        //     <p>{user.name}</p>
        //     <p>{user.username}</p>
        //     <p>{user.email}</p>
        //     </div>
        //     <div>
        //         <div className="mt-3">
        //             <Link className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded-2xl" to={'/editprofile'}>Edit Profile</Link>
        //             <Link to='/logout' className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded-2xl">Logout</Link>
        //         </div>
        //         <button className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 mt-5 rounded-2xl"onClick={assignedtask}>Assigned Tasks</button>
        //         <div className="flex flex-col items-center" >
        //         {data.length > 0 ? (
        //     data.map((task) => (
        //       <div key={task._id}>
        //         <h2 className="text-lg font-bold text-orange-400">Assigned Task List</h2>
        //         <p>Object Id: {task._id}</p>
        //         <p>Title: {task.title}</p>
        //         <p>Description: {task.description}</p>
        //         <p>Body: {task.body}</p>
        //         <p>Assigned Task: {task.assignedTask}</p>
        //         <p>Created By: {task.createdBy}</p>
        //         <p>Status: {task.status}</p>
        //         <p>Task Priority: {task.taskPriority}</p>
        //         <p>Due Date: {task.duedate}</p>
        //       </div>
        //     ))
        //   ) : (
        //     <p></p>
        //   )}
        //     </div>
        //     </div>
        //     <div></div>
        // </div>

    );
}

export default ProfilePage;