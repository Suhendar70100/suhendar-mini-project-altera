import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabse/Supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [nim, setNim] = useState("");
    console.log(email)
    console.log(password);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        if (email === "" || password === "") {
            toast.error('Email dan Password harus diisi !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            try {
                const { data, error } = await supabase
                    .from("user")
                    .insert({
                        username: username,
                        nim: nim,
                        email: email,
                        password: password
                    })
                    .single()
                if (error) throw error;
                navigate('/login');
            } catch (error) {
                alert(error.message);
            }
        }


    }

    return (
        <div className="wrapper">
            <div className="text-center mt-4" style={{ fontSize: "30px", color: "#666" }}>
                Register
            </div>
            <div className="p-3 mt-3">
                <div className="form-field align-items-center">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username" />
                </div>
                <div className="form-field align-items-center">
                    <input
                        onChange={(e) => setNim(e.target.value)}
                        type="number"
                        name="nim"
                        id="nim"
                        placeholder="NIM" />
                </div>
                <div className="form-field align-items-center">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email" />
                </div>
                <div className="form-field align-items-center">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password" />
                </div>
                <button onClick={() => handleSubmit()} type="submit" className="btn mt-3">Register</button>
            </div>
            <div className="text-center fs-6">
                <Link to={"/login"}>Log In</Link>
            </div>
            <ToastContainer />
        </div>
    )
}
