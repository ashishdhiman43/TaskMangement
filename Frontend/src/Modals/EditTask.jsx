import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/task/update";
const GET_URL = "http://localhost:5000/api/task";

function EditTask() {
    const [data, setData] = useState({ title: '', description: '', body: '', taskPriority: '', duedate: '', status: '', });
    const { id } = useParams();

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const saved = localStorage.getItem("jwtToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${saved}`,
                    },
                };
                const response = await axios.get(`${GET_URL}/${id}`, config);
                setData({
                    title: response.data.title || '',
                    description: response.data.description || '',
                    body: response.data.body || '',
                    taskPriority: response.data.taskPriority || '',
                    duedate: response.data.duedate ? response.data.duedate.slice(0,10) : '',
                    status: response.data.status || '',
                });
            } catch (error) {
                console.error("Error fetching task data:", error);
            }
        };

        fetchTaskData();
    }, [id]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleUpdateTask = async () => {
        try {
            const saved = localStorage.getItem("jwtToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${saved}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.put(`${API_URL}/${id}`, data, config);
            console.log(response.data);
            alert("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Error updating task");
        }
    };

    return (
        <div className="bg-white w-96 h-auto p-4 flex flex-col items-center ml-48 fixed left-96">
            <h2 className="text-orange-400 text-lg font-bold mb-4">Edit Task</h2>
            <form className="w-full">
                <div className="mt-2">
                    <label>Title</label><br />
                    <input className="border-2 rounded-xl mt-1 w-full" type="text" name="title" value={data.title} onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label>Description</label><br />
                    <input className="border-2 rounded-xl mt-1 w-full" type="text" name="description" value={data.description} onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label>Body</label><br />
                    <input className="border-2 rounded-xl mt-1 w-full" type="text" name="body" value={data.body} onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label>Task Priority</label><br />
                    <input className="border-2 rounded-xl mt-1 w-full" type="text" name="taskPriority" value={data.taskPriority} onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label>Status</label><br />
                    <input className="border-2 rounded-xl mt-1 w-full" type="text" name="status" value={data.status} onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label>Due Date</label><br />
                    <input className="border-2 rounded-xl mt-1 w-full" type="date" name="duedate" value={data.duedate} onChange={handleChange} />
                </div>
                <div className="mt-4 flex gap-4 justify-between">
                    <button className="bg-blue-400 hover:bg-blue-500 text-white w-full font-bold py-1 px-4 rounded-2xl" type="button" onClick={handleUpdateTask}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default EditTask;
