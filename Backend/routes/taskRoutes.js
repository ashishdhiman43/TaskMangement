import express from "express";
import {addTask,deleteTask,updateTask,getAssignedTask,adminaccess,getTaskById,checkStatus, assignTask,changeStatus,checktaskpriority,progressbar} from '../controllers/taskController.js';
import checkRole from "../middleware/CheckRole.js";
const router = express.Router();

router.post('/createTask',addTask);
router.delete('/delete/:id',deleteTask);
router.put('/update/:id',updateTask);
router.get('/',getAssignedTask);
router.put('/progress/:id',progressbar);
router.get('/get',checkRole('admin'),adminaccess);
router.get('/:id',getTaskById);
router.get('/taskpriority/:id',checktaskpriority)
router.get('/check/:id',checkRole('admin'),checkStatus);
router.put('/assignTask',checkRole('admin'),assignTask);
router.put('/status/:id',checkRole('admin'),changeStatus);

export default router;