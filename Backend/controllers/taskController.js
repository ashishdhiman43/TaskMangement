import task from '../models/Task.js';
import User from '../models/User.js'


//add Task
export const addTask = async (req, res) => {
    try {
        const id = req.user.id;
        const { title, description, body, status, taskPriority, duedate } = req.body;
        const newTask = new task({title,description,body,status,createdBy:id,taskPriority,duedate});
        const savedTask = await newTask.save();

        const users = await User.findById(id);
        users.assignedTask.push(savedTask.id)
        await users.save();
        res.status(201).json({
            message: "Task created successfully",
            task: savedTask
        });
    } catch (error) {;
        res.status(500).json({message: "An error occurred while creating the task"});
    }
}

//delete task
export const deleteTask = async (req,res)=>{
    try{
        const {id}=req.params;
        const user = await task.findByIdAndDelete(id);
        if(!user){
            res.status(404).json({message:"User not found"});
        }
        res.json("User Deleted Successfully");
    }catch(error){
        res.status(400).json({message:"Failed to delete user"})
    }
}

//update Task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, body,status,taskPriority,duedate } = req.body;
        const updatedTask = await task.findByIdAndUpdate(id, { title, description, body,status,taskPriority,duedate},{new:true});
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated Successfully",updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to update TAsk"});
    }
}

//get all tasks
export const getAssignedTask = async (req,res) =>{
    try{    
        const id = req.user.id;
        console.log("fsdss",id)
        const getall = await task.find({createdBy:id});
        console.log("sdfs",getall)
        if(getall.length == 0){
            res.status(404).json({message:"You dont have assigned task"})
        }
        res.json(getall)
    }catch(error){
        res.status(400).json({message:"Failed to get assigned tAsk"})
    }
}


//all task
export const adminaccess = async (req,res) =>{
    try{    
        const getall = await task.find();
        console.log(getall)
        res.json(getall)
    }catch(error){
        res.status(400).json({message:"Failed to get all task"})
    }
}

//get task by user
export const getTaskById = async (req,res)=>{
    try{
        const {id} = req.params;
        const get = await task.findById(id);
        res.json(get);
    }catch(error){
        res.status(400).json({message:"Failed to get task"})
    }
}

//check status
export const checkStatus = async (req,res)=>{
    try{
        const {id} = req.params;
        const check = await task.findById(id);
        const status = check.status;
        res.json({status});
    }catch(error){
        res.status(400).json({message:"Failed to check Status"})
    }
}

// change status
export const changeStatus = async (req,res)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const change = await task.findByIdAndUpdate(id,{status},{new:true});
        await change.save();
        res.json(change);
    }catch(error){
        res.status(400).json({message:"Failed to change status"})
    }
}

//check task priority
export const checktaskpriority = async (req,res)=>{
    try{
        const {id} = req.params;
        const check = await task.findById(id);
        const ctp = check.taskPriority;
        res.json({"Task Priority: ":ctp});
    }catch(error){
        res.status(400).json({message:"Failed to check priority"})
    }
}

//Assign tasks
export const assignTask = async (req, res) => {
    const { taskId, assign } = req.body;
    try {
        const taskToAssign = await task.findById(taskId);
        if (!taskToAssign) {
            return res.status(404).json({ message: "Task not found." });
        }
        taskToAssign.assignTask.push(assign);
        const updatedTask = await taskToAssign.save();
        return res.status(200).json({
            message: "Task assigned successfully.",
            task: updatedTask
        });
    }catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
}

//update progress
export const progressbar = async(req,res)=>{
    try{
        const {id} = req.params;
        const {progress} = req.body

        const taskfind = await task.findByIdAndUpdate(id, { progress }, { new: true });
        if (!taskfind) {
            return res.status(404).json({ message: "Task not found" });
        }
          res.status(200).json({ taskfind });
    }catch(error){
        res.status(400).json({message:"Failed while updating progress bar"})
    }
}