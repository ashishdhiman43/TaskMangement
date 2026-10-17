import React, { useState,useEffect } from "react";
import axios from "axios";

function AssignTask(){

    const Task_URL = "http://localhost:5000/api/task/assignTask";

    const [form, setForm] = useState({ taskId: "", assign: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

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
          setForm({taskId:"",assign:""})
        } catch (error) {
          console.error("Error assigning task:", error);
          alert("You dont have admin access")
        }
    };

    return(
        <div className="mt-4">
        <form>
          <div className="mt-2 rounded-lg border-2">
            <input type="text" placeholder="Enter Task Id" name="taskId" value={form.taskId}onChange={handleChange}/>
          </div>
          <div className="mt-2 rounded-lg border-2">
            <input type="text"placeholder="Enter User Id" name="assign"value={form.assign}onChange={handleChange}/>
          </div>
          <button className="bg-blue-400 hover:bg-blue-400 text-white w-52 font-bold py-1 px-4 mt-5 rounded-2xl" type="button" onClick={assignedtask}> Assign Task</button>
        </form>
      </div>
    )


}

export default AssignTask;