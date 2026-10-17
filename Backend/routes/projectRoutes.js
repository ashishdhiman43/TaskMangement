import express from "express";
import {createProject,deleteProject,getProjectByuser,updateProject,assignproject,getassignedprojects,getproject} from "../controllers/projectController.js";

const router = express.Router();

router.post('/create',createProject);
router.delete('/delete/:id',deleteProject);
router.get('/get',getProjectByuser);
router.get('/get/:id',getproject);
router.put('/update/:id',updateProject);
router.put('/assign',assignproject);
router.get('/getassigned',getassignedprojects);

export default router;