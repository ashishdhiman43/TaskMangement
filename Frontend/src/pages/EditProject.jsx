import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/project/update";
const GET_URL = "http://localhost:5000/api/project/get";

function EditProject() {
    const [data, setData] = useState({ ProjectName: '', Description: ''});
    const {id} = useParams();


    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const saved = localStorage.getItem("jwtToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${saved}`,
                    },
                };
                const response = await axios.get(`${GET_URL}/${id}`, config);
               setData({
                   ProjectName: response.data.ProjectName,
                   Description: response.data.Description,
                });
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchProjectData();
    }, [id]); 

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleUpdateProject = async () => {
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
            alert("Project updated successfully!");
        } catch (error) {
            console.error("Error updating project:", error);
            alert("Error updating project");
        }
    };

   


    return (
        <div className="bg-white w-96 h-96 flex flex-col my-28 items-center ml-48 fixed left-96">
            <h2 className="text-orange-400 text-lg font-bold">Edit Project</h2>
            <form>
                <div className="mt-4">
                    <label>Project Name</label><br/>
                    <input className="border-2 rounded-xl mt-2" type="text" name="ProjectName"value={data.ProjectName}onChange={handleChange}/>
                </div>
                <div className="mt-4">
                    <label>Description</label><br/>
                    <input className="border-2 rounded-xl mt-2" name="Description" value={data.Description} onChange={handleChange}
                    />
                </div>
                <button className="bg-blue-400 hover:bg-blue-400 text-white w-52 font-bold py-1 px-4 mt-5 rounded-2xl" type="button" onClick={handleUpdateProject}>Update</button>
            </form>
        </div>
    );
}

export default EditProject;
