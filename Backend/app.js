import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import taskroutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import { registerUser, loginUser, logout, forgotPasswordToken } from './controllers/userController.js';
import Auth from './middleware/auth.js';
import checkRole from './middleware/CheckRole.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.post("/register",registerUser);
app.post("/forgotpassword", forgotPasswordToken);
app.post("/login",loginUser);
app.post("/logout",logout);
app.use('/api/users',Auth, userRoutes);
app.use('/api/task', Auth,taskroutes);
app.use('/api/project',Auth,checkRole('admin'), projectRoutes);

//connect to mongodb
mongoose.connect(MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Connected to MongoDB;");
    app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`));
}).catch((err)=>console.error("Connection Failed to MongoDatabase", err));