import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoginLogo from '../assets/loginpage.jpg'

const REGISTER_URL = "http://localhost:5000/register";

const ValidateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);    // Simple regex for email validation
};

const ValidatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // Minimum 8 characters, at least one letter and one number
}

function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!ValidateEmail(form.email)) {
                alert("Invalid email");
                return;
            }
            if(!ValidatePassword(form.password)) {
                alert("Password must contain uppercase, lowercase, number, special character and be at least 8 characters long");                return;
            }
            const response = await axios.post(REGISTER_URL, form);
            console.log(response);
            alert("Registration successful!");
            navigate("/home");
        } catch (err) {
            setError("Registration failed");
        }
    };

    return (
        <div className="bg-slate-100 h-screen flex items-center justify-center">
              <div className="flex">
                  <img className="h-96 w-96 rounded-2xl" src={LoginLogo} />
                  </div>
            <div className="flex flex-col ml-32">
            <div className="mt-4 text-center mb-6">
                    <h1 className="text-xl font-bold text-yellow-500">Create an account</h1>
               </div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input className=" placeholder:text-sm placeholder:italic w-80 p-2 border border-gray-300 rounded mt-5" type="text"name="username" placeholder="Username"value={form.username} onChange={handleChange}required />
                    <input className=" placeholder:text-sm placeholder:italic p-2 border border-gray-300 rounded mt-5" type="email" name="email"placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input className=" placeholder:text-sm placeholder:italic p-2 border border-gray-300 rounded mt-5" type="password" name="password" placeholder="Password"value={form.password} onChange={handleChange} required />
                    <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-500 text-white p-2 rounded-2xl mt-5">Register</button>
                </form>
                <p className="text-sm text-center mt-2">
                    Already have an account? <Link to="/login" className="text-yellow-500 text-sm">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
