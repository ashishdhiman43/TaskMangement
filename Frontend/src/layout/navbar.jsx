import React from "react";
import { Link, Outlet } from "react-router-dom";
import AddIcon from '../assets/logo.svg'
import Profile from '../pages/ProfilePage'
import Modal from 'react-modal'
import { useState,useEffect } from "react";

function Navbar() {

     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => setIsModalOpen(true);
     const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        Modal.setAppElement('#root');
    })

    return (
       <div className="">
            <nav className=" bg-yellow-400 p-4 flex justify-between items-center w-full fixed top-0 left-0">
                <Link to='/home' className="text-white text-lg font-bold">Management System</Link>
                <div className="space-x-4 grid grid-flow-col">
                    <Link to="/project" className="text-white hover:text-yellow-200">Project</Link>
                    <div className="h-8 w-8 border rounded-full">
                    <img onClick={openModal} src={AddIcon} className="h-8" alt="icon" />
                    </div>
                </div>
            </nav>
            <div className=" p-5 mt-14 items-center h-auto w-full">
                <Outlet />
            </div>
            <Modal isOpen={isModalOpen}  onRequestClose={closeModal} style={{ content: {  maxWidth: '600px', margin:'auto', borderRadius: '20px', padding: '20px'}}}>
  <Profile />
  </Modal>
        </div>  
    );
}

export default Navbar;
