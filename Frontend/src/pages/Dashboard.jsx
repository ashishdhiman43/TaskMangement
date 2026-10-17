import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Line } from 'rc-progress';
import Modal from 'react-modal';
import CreateTask from '../Modals/CreateTask';
import addlogo from '../assets/addtask.svg'
import EditLogo from '../assets/edit_icon.svg'
import UpdateTask from "../Modals/EditTask";

const API_URL = "http://localhost:5000/api/task";
const UPDATE_URL = "http://localhost:5000/api/task/update";
const Task_URL = "http://localhost:5000/api/task/assignTask";
const DELETE_URL = "http://localhost:5000/api/task/delete";
const BAR_URL = "http://localhost:5000/api/task/progress";
const USER_URL ="http://localhost:5000/api/user/getusername";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ taskId: "", username: "" });
  const [user, setUser] = useState([])
  const [progress,setProgress] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const openUpdate = () => setIsUpdate(true);
  const closeUpdate = () => setIsUpdate(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    Modal.setAppElement('#root');
    fetchUserTasks();
  },[])

  //fetch tasks
  const fetchUserTasks = async () => {
    try {
      const savedToken = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${savedToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(API_URL, config);
      console.log(response.data);
      setTasks(response.data);

      const progressMap = {};
      response.data.forEach((task) => {
      progressMap[task._id] = task.progress || 0;});
      setProgress(progressMap);
    } catch (error) {
      alert("Failed to fetch tasks. Please try again.");
      setTasks([]);
    }
  }

  //assigned task
  const assignedtask = async () => {
    try {
      const savedToken = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${savedToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(Task_URL, form, config);
      console.log("API response:", response.data);
      alert("Successfully assigned Task");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };


  //delete task
  const deleteTask = async (id) => {
    try {
      const savedToken = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${savedToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(`${DELETE_URL}/${id}`, config);
      console.log(response.data);
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task.");
    }
  };
  const DeleteButton = ({ taskId, onDelete }) => {
    return (
      <button className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded-2xl" onClick={() => onDelete(taskId)}> Delete</button>
    );
  };


  //update progress
  const handleProgressClick = async (taskId) => {
    try {
      const savedToken = localStorage.getItem("jwtToken");
  
      setProgress((prevProgress) => {
        const newProgress = {
          ...prevProgress,
          [taskId]: Math.min(100, (prevProgress[taskId] || 0) + 5),
        };
  
        axios.put(`${BAR_URL}/${taskId}`,
          { progress: newProgress[taskId] },
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return newProgress;
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  //update tAsk
  const handleUpdateTask = async (taskId, fieldName, newValue) => {
    try {
      const saved = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${saved}`,
          'Content-Type': 'application/json',
        },
      };
  
      const updateData = {
        [fieldName]: newValue,
      };
  
      const response = await axios.put(`${UPDATE_URL}/${taskId}`, updateData, config);
      console.log(response.data);
      alert(`${fieldName} updated successfully!`);
      fetchUserTasks(); // refresh tasks to reflect changes
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error);
      alert(`Error updating ${fieldName}`);
    }
  };
  
  //assigned task
  const handleAssignee = async()=>{
    try{
      const saved = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${saved}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(USER_URL,config);
      setUser(response.data)
    }catch(error){}
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3 relative">
      <input type="search"className="bg-slate-100 h-8 px-2 py-1 border rounded"placeholder="Search....."/>
      <div className="relative">
        <button onClick={() => setShowDropdown(!showDropdown)}className="bg-yellow-500 text-white h-8 w-20 px-1 py-1 rounded hover:bg-green-600 text-sm">Add New</button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10 text-sm">
            <Link onClick={openModal} className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Task</Link>
            <Link className="block px-4 py-2 hover:bg-gray-100 text-gray-700" >Project </Link>
            <Link className="block px-4 py-2 hover:bg-gray-100 text-gray-700" >Assign To</Link>
          </div>
        )}
      </div>
    </div>
      <div className="bg-slate-100 text-sm p-2 list-none gap-20 text-center grid grid-cols-7" >
        <li className="min-w-20 ml-2 ">Title</li>
        <li className="min-w-20">Status</li>
        <li className="min-w-20 ">Progress</li>
        <li className="min-w-20 ">Assignee</li>
        <li className="min-w-20 ">Priority</li>
        <li className="min-w-20 ">Project</li>
        <li className="min-w-20">Edit</li>
      </div>
      <div className="text-sm pl-2">
        <Link className="flex" onClick={openModal}>  <img src={addlogo} alt="Add Task" className="w-4 mr-2"/> Add new Task</Link>
      </div>
      <div className="mt-1">
      {
          tasks.map((task) => (
            <div className="text-sm border-y-2 mb-1 text-center gap-10 grid grid-cols-7" key={task._id}>
              <p className="w-20 mt-2 whitespace-nowrap overflow-hidden text-ellipsis ml-2 mb-1">{task.title}</p>
              <select className='bg-yellow-500 text-white appearance-none text-center rounded-lg' name='status' onChange={(e) => handleUpdateTask(task._id, 'status', e.target.value)}>
                <option >{task.status}</option>
               <option value="notStarted">Not Started</option>
               <option value="inprogress">In Progress</option>
               <option value="completed">Completed</option>
              </select>
              <div className="min-w-20 my-1 flex justify-center">
              <Line onClick={() => handleProgressClick(task._id)} percent={progress[task._id] || 0}strokeWidth={10} trailWidth={0} strokeColor="#ebe354" width={100}/> 
              </div>
              <div className="assignee Task">
                <select onClick={handleAssignee} >
                  <option></option>
                </select>
              </div>
              <select className='ml-5 appearance-none text-center' name="taskPriority"onChange={(e) => handleUpdateTask(task._id, 'taskPriority', e.target.value)}>
                <option >{task.taskPriority}</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="relative">
              <select className='ml-5 appearance-none text-center' name="taskPriority"onChange={(e) => handleUpdateTask(task._id, 'taskPriority', e.target.value)}>
                <option >{task.taskPriority}</option>
              </select>
              </div>
              
              <div onClick={openUpdate} className="flex flex-row-reverse">
                <img src={EditLogo} className=" w-4 mr-16"/>
                </div>
            </div>
          ))}
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ content: { maxHeight:'500px', maxWidth: '500px', margin:'auto', borderRadius: '20px', padding: '20px'}}}>
  <CreateTask refreshTask={fetchUserTasks} />
  </Modal>
  <Modal isOpen={isUpdate} onRequestClose={closeUpdate} style={{ content: {  maxWidth: '500px', margin:'auto', borderRadius: '20px', padding: '20px'}}}>
  <UpdateTask />
  </Modal>

    </div>
  );
}

export default Dashboard;
