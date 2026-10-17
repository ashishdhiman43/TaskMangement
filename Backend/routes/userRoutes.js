import express from 'express';
import {
    getProfile,
    getUserById,
    updateUser,
    deleteUser,
    getassignedTasks,
    getall
} from '../controllers/userController.js';
import checkRole from '../middleware/CheckRole.js';

const router = express.Router();


router.get("/",checkRole('admin'), getProfile);
router.get("/get",getUserById);
router.put("/update", updateUser);
router.delete('/delete',deleteUser);
router.get('/getassigned',getassignedTasks);
router.get('/getusername',getall);


export default router;
