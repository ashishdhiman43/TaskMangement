import Project from '../models/Project.js';
import User from '../models/User.js';

//Create a project

export const createProject = async (req, res) => {
    try {
        const id = req.user.id;
        const { ProjectName, Description,assignTo} = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newProject = new Project({ ProjectName, Description,createdBy:id,assignTo});
        await newProject.save();

        const users = await User.findById(id);
        users.assignedProject.push(newProject.id)
        await users.save();
        res.status(201).json({ message: 'Project created successfully', newProject });
        } catch (error) {
        res.status(500).json({ message: 'Error creating project' });
    }
}

//delete a project
export const deleteProject = async (req, res) => {
    try {  
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
    res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
}

//get project by id
export const getProjectByuser = async (req, res) => {
    try{
        const id = req.user.id;
        const project = await Project.find({createdBy:id});
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);

    }catch(error){
        res.status(500).json({ message: 'Error getting project' });
    }
}

//get project
export const getproject = async (req, res) => {
    try{
        const {id} = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);

    }catch(error){
        res.status(500).json({ message: 'Error getting project' });
    }
}


//update project
export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const { ProjectName, Description} = req.body;
        const project = await Project.findByIdAndUpdate(id, { ProjectName, Description },{new:true});
        res.status(200).json({ message: "Project updated Successfully",project });
    }catch(error){
        res.status(500).json({ message: 'Error updating project' });
    }
}

//assign to user
export const assignproject = async (req, res) =>{
    try{
        const id = req.user.id;
        const {projectId, userId} = req.body;
        const users = await User.findById(id);
        if(!users){
            return res.status(404).json({message:"User not found"}, users);
        }
        const assign = await Project.findById(projectId);
        if (assign.assignTo.includes(userId)) {
            return res.status(400).json({ message: "User is already assigned." });
        }
        assign.assignTo.push(userId);
        const updated = await assign.save();
        res.json(updated);
    }catch(error){
        res.status(400).json({"message":error})
    }
}

//get assigned project
export const getassignedprojects = async (req,res) =>{
    try{    
        const id = req.user.id;
        const getall = await Project.find({assignTo:id});
        console.log(getall)
        if(getall.length == 0){
            res.status(404).json({message:"You dont have assigned project"})
        }
        res.json(getall)
    }catch(error){
        res.status(400).json({message:"Failed to get assigned tAsk"})
    }
}