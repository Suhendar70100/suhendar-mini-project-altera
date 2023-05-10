import React, { useState, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { supabase } from '../supabse/Supabase';
import Swal from 'sweetalert2';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [text, setText] = useState([]);
    const navigate = useNavigate();
    async function handleSubmit() {
        try {
            const { data, error } = await supabase
                .from("user")
                .select("*")
                .eq('email', email)
                .eq('password', password)
            if (error) throw error;
            if (data.length <= 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            } else if (data[0].is_admin == 1) {
                navigate('/dashboard')
            } else {
                navigate(`/dashboard-user/${data[0].id}`)
            }
        } catch (error) {
            alert(error.message);
        }
    }

    console.log(users.email)
    console.log(password);
    console.log(email);


    return (
        <div className="wrapper">
            <div className="text-center mt-4" style={{ fontSize: "30px", color: "#666" }}>
                Login
            </div>
            <div className="p-3 mt-3">
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
                <button type="submit" onClick={() => handleSubmit()} className="btn mt-3">Login</button>
            </div>
            <div className="text-center fs-6">
                <Link to={"/"}>Sign Up</Link>
            </div>
        </div>
    )
}

export default Login