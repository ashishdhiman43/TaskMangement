import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Circle } from 'rc-progress';
import AddIcon from '../assets/addtask.svg'
import CreateProject from "../pages/CreateProject";
import EditProject from "../pages/EditProject";
import Modal from 'react-modal';


const GET_USER = "http://localhost:5000/api/users/get";
const DELETE_URL = "http://localhost:5000/api/project/delete"; 
const GET_URL = "http://localhost:5000/api/project/get";


    function ProjectPage() {
    const [form, setForm] = useState({ProjectName:'', Description:''});
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    //createproject modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //editproject modal
    const openedit = () => setIsEditOpen(true);
    const closeedit = () => setIsEditOpen(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        Modal.setAppElement('#root');

        fetchUserData();
        fetchProjects();
    }, []);

    const fetchUserData = async () => {
      try {
          const saved = localStorage.getItem("jwtToken");
          const config = {
              headers: {
              Authorization: `Bearer ${saved}`,
              'Content-Type': 'application/json',
           },
      };
          const response = await axios.get(GET_USER,config);
          
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
      };

      const fetchProjects = async () => {
        try {
            const saved = localStorage.getItem("jwtToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${saved}`,
                    'Content-Type': 'application/json',
                },
            };
            console.log(config)
        const response = await axios.get(GET_URL, config);  
        setProjects(response.data)
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }
    
    const handleDeleteProject = async (id) => {
        try {
          const saved = localStorage.getItem("jwtToken");
          const config = {
            headers: {
              Authorization: `Bearer ${saved}`,
              "Content-Type": "application/json",
            },
          };
          const response = await axios.delete(`${DELETE_URL}/${id}`, config);
          alert("Project deleted successfully");
          setProjects(projects.filter((project) => project._id !== id));
        } catch (error) {
          console.error("Error deleting project:", error);
          alert("Error deleting project.");
        }
      };
      
      const DeleteButton = ({ projectId, onDelete }) => (
        <button className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 mt-5 rounded-2xl"onClick={() => onDelete(projectId)}>Delete</button>);

    return (
        <div className="">
            <div className="bg-slate-100 text-sm p-2 list-none gap-20 text-center grid grid-cols-5">
            <li className="min-w-20 ml-2 ">Project Name</li>
            <li className="min-w-20">ID</li>
            <li className="min-w-20">CreatedBy</li>
            <li className="min-w-20">Progress</li>
            <li className="min-w-20">Planned Started</li>
            </div>
            <div className="text-sm pl-2">
                    <Link className="flex" onClick={openModal}>  <img src={AddIcon} alt="Add Task" className="w-4 mr-2"/> Add new Project</Link>
            </div>
            <div className="mt-1 ">
            {projects.map((project) => (
                <div className="text-sm border-y-2 mb-1 text-center gap-20 grid grid-cols-5" key={project._id}>
                    <p onClick={openedit} className="w-20 mt-2 whitespace-nowrap overflow-hidden text-ellipsis ml-2">{project.ProjectName}</p>
                    <p onClick={openedit} className="min-w-20 mt-2">{project._id}</p>
                    <p onClick={openedit} className="min-w-20 mt-2 ml-4">{project.createdBy}</p>
                    <div className="min-w-20 mx-28 my-2">
                        <Circle percent={50}strokeWidth={10} trailWidth={10} strokeColor="#2161cf" width={30}/> 
                    </div>
                    <p onClick={openedit} className="min-w-20 mt-2">{project.creationDate}</p>
                </div>
             ))
          }
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ content: {maxHeight:'500px', maxWidth: '500px', margin:'auto', borderRadius: '20px', padding: '20px'}}}>
              <CreateProject />
            </Modal>
            <Modal isOpen={isEditOpen} onRequestClose={closeedit} style={{ content: {  maxWidth: '600px', margin:'auto', borderRadius: '20px', padding: '20px'}}}>
              <EditProject />
            </Modal>
        </div>


        // <div className="bg-white flex flex-col items-center mt-4">
        //     <h2 className="text-orange-400 text-lg font-bold">Create Project</h2><br/>
    
        //   <form onSubmit={handleCreateProject}>
        //     <div>
        //     <input className="placeholder:text-sm placeholder:italic border-2 rounded-xl" placeholder="Enter Project Name" type="text" name="ProjectName"value={form.ProjectName}onChange={handleChange}/>
        //     </div><br/>
        //     <div>
        //     <input className="placeholder:text-sm placeholder:italic border-2 rounded-xl" placeholder="Enter Project Description" type="text" name="Description" value={form.Description}onChange={handleChange}/>
        //     </div>
        //     <button className="bg-blue-400 hover:bg-blue-400 text-white w-52 font-bold py-1 px-4 mt-5 rounded-2xl" type="submit">Create Project</button>
        //    </form>
        //   <div className="mt-5">
        //   <h2 className="text-orange-500 text-lg font-semibold">Project List</h2>
        //  {
        //     projects.map((project) => (
        //         <div key={project._id}>
        //             <div>
        //                 <h3>{project.ProjectName}</h3>
        //                 <p>{project.Description}</p>
        //                 <p>{project.createdBy}</p>
        //                 <p>{project.assignTo}</p>
        //             </div>
        //             <Link className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-5 mt-5 rounded-2xl" to={`/editproject/${project._id}`}>Edit</Link>
        //             <DeleteButton projectId={project._id} onDelete={handleDeleteProject}/>
        //         </div>
        //     ))
        //  }
        //  </div>
        // </div>
    
    )
}

    export default ProjectPage;