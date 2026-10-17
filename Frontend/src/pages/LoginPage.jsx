import {useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import LoginLogo from '../assets/loginpage.jpg'
import '../input.css';

const LOGIN_URL = "http://localhost:5000/login";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate('/home');6
    } else {
      setLoading(false);  // No token, stop loading and show login page
    }
  }, [navigate]);
  if (loading) return null;

  const ifalreadylogin=()=>{
    alert("You are already logged in");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      const token = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.getItem("jwtToken", token);
      console.log("Login successful:", );
      navigate('/home');
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (

    <div className=" bg-slate-100 h-screen flex items-center justify-center">
      <div className="flex">
      <img className="h-96 w-96 rounded-2xl" src={LoginLogo} />
      </div>
      <div className="flex flex-col ml-32">
      <div className="mt-4 text-center mb-6">
        <h1 className="text-xl font-bold text-yellow-500">Task Manager</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div> 
          <input className=" placeholder:text-sm placeholder:italic w-full p-2 border border-gray-300 rounded"
            type="email"
            value={email}
            placeholder="Enter you email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
  
          <input className=" placeholder:text-sm placeholder:italic w-full p-2 border border-gray-300 rounded"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='bg-yellow-400 hover:bg-yello-400 text-white w-72 font-bold py-1 px-4 mt-5 rounded-2xl' type="submit">LOGIN</button>
      </form>
      <div className="mt-2">
      <span className="text-sm">Don't have account?</span>
      <Link to ="/register" className="text-yellow-500 ml-2 text-sm">Register here</Link>
      </div>
      </div>
      
    </div>
  );
};

export default LoginPage;