import React,{useEffect} from "react";
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const user = '';
    const {
        register,
        handleSubmit,
        formState: {errors},
    }=useForm;

    const navigate = useNavigate();

    useEffect(()=>{
        user && navigate('/home')
    },[user]);


    return(
        <div className="">
            <div>

            </div>
        </div>
    )
}