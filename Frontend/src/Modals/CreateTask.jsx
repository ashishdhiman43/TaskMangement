import axios from 'axios';
import React, { useState } from 'react';


const API_URL = 'http://localhost:5000/api/task/createTask';
const CreateTask = ({refreshTask}) => {
  const [form, setForm] = useState({title: '', description: '',duedate:'', status:'', taskPriority:''});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const saved = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${saved}`,
        'Content-Type': 'application/json',
      },
    };
    console.log("config",config)
    const response = await axios.post(API_URL, form,config);
    console.log(response.data);
    refreshTask();
    alert("Task Created Successfully");

  }catch(error){
      console.error("Error creating task", error);
  }
};


  return (
    <div className='flex flex-col items-center rounded-2xl'>
      <div className=' w-full border-b-2 border-w mb-2 '>
      <h2 className='text-black-400 text-lg font-semibold mb-2'>Add Task</h2>
      </div>
     
      <form className='w-96 text-sm' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label>Title</label>
          <input className=' placeholder:text-sm placeholder:italic w-full p-2 border border-gray-300 rounded' placeholder='Enter Title' type="text" name="title"value={form.title}onChange={handleChange}/>
        </div><br/>
        <div> 
        <label>Description</label>
          <input className='placeholder:text-sm placeholder:italic w-full p-2 border border-gray-300 rounded' placeholder='Enter Description' type="text" name="description" value={form.description}onChange={handleChange}/>
        </div><br/>
        <div className='mt-2'>
          <label className=''>Status</label>
          <select className='ml-5' name='status' value={form.status} onChange={handleChange}>
          <option>Select</option>
            <option value="notStarted">Not Started</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select><br/>
        </div>
        <div className='mt-2'>
          <label className=''>Priority</label>
          <select className='ml-5' value={form.taskPriority} name="taskPriority"onChange={handleChange}>
          <option>Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select><br/>
        </div><br/>
        <div className="mt-2">
            <label>Due Date</label><br />
            <input className="border-2 rounded-xl mt-1 w-full" type="date" name="duedate" value={form.duedate} onChange={handleChange} />
        </div>
        <button className='bg-blue-400 hover:bg-blue-400 text-white w-52 font-bold py-1 px-4 rounded-2xl' type="submit">Create Task</button><br/>
      </form>
    </div>
  );
};


export default CreateTask;
