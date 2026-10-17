import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Layout from './layout/navbar';
import Dashboard from './pages/Dashboard';
import CreateTask from './Modals/CreateTask';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import EditProject from './pages/EditProject';
import EditTask from './Modals/EditTask';
import ProtectedRoute from './pages/protectedRoute';
import Logout from './pages/Logout';
import Assigntask from './pages/AssignTask'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/assignTask" element={<Assigntask />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/editproject/:id" element={<EditProject />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/edittask/:id" element={<EditTask />} />
          <Route path='/logout'element={<Logout/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
