import React, { useState } from "react";
import axios from "axios";

const CREATE_URL = "http://localhost:5000/api/project/create";

function CreateProject(){

    const [form, setForm] = useState({ProjectName:'', Description:''});
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const saved = localStorage.getItem("jwtToken");
            const config = {
            headers: {
                Authorization: `Bearer ${saved}`,
                'Content-Type': 'application/json',
            },
            };
        const response = await axios.post(CREATE_URL, form, config);
        console.log(response.data);
            alert("Project created successfully!");
        } catch (error) {
        console.error("Error creating project:", error);
        }
    };

    return(
        <div className="flex flex-col justify-center mx-28 mt-8">
            <div className=" flex justify-center">
            <h2 className="text-orange-400 text-lg font-bold">Create Project</h2>
            </div>
            <form className="flex flex-col mt-11 justify-center" onSubmit={handleCreateProject}>
             <div className="flex justify-center">
             <input className="placeholder:text-sm placeholder:italic border-2 rounded-xl" placeholder="Enter Project Name" type="text" name="ProjectName"value={form.ProjectName}onChange={handleChange}/>
             </div><br/>
             <div className="flex justify-center">
             <input className="placeholder:text-sm placeholder:italic border-2 rounded-xl" placeholder="Enter Project Description" type="text" name="Description" value={form.Description}onChange={handleChange}/>
             </div>
             <div className="flex justify-center">
             <button className="bg-blue-400 hover:bg-blue-400 text-white w-52 font-bold py-1 mt-5 rounded-2xl" type="submit">Create Project</button>
             </div>
             
            </form>
        </div>
        
    )
  };


export default CreateProject;