import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/users/update/";
const GET_URL = "http://localhost:5000/api/users/get";

function EditProfile() {
    const [form, setForm] = useState({ name: '', roles: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const saved = localStorage.getItem("jwtToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${saved}`,
                    },
                };
                const response = await axios.get(GET_URL, config);
                setForm({ name: response.data.name, roles: response.data.roles });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdateUser = async () => {
        try {
            const saved = localStorage.getItem("jwtToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${saved}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.put(API_URL, form, config);
            console.log(response.data);
            alert("updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);         }
    };

    return (
        <div className="flex flex-col items-center rounded-2xl mt-8">
            <h2 className="text-orange-500 text-lg font-bold">Edit Profile</h2>
            <form className="mt-5">
                <div>
                    <label>Name</label><br/>
                    <input className="border-2 rounded-xl" type="text" name="name" value={form.name}onChange={handleChange}/>
                </div>
                <div className="mt-2">
                    <label>Roles</label><br/>
                    <input className="border-2 rounded-xl" type="text" name="roles" value={form.roles} onChange={handleChange} />
                </div>
                <button className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded-2xl mt-2" type="button" onClick={handleUpdateUser}>Update</button>
                <Link className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-4 rounded-2xl ml-3" to={'/profile'}>Cancel</Link>
            </form>
        </div>
    );
}

export default EditProfile;
