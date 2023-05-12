import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabse/Supabase'
import CardUser from '../../components/CardUser';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function DashboardUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roomUsers, setRoomUsers] = useState([]);
    useEffect(() => {
        getRoomUser();
    }, []);

    async function getRoomUser() {
        try {
            const { data, error } = await supabase
                .from("rooms")
                .select("*")
            if (error) throw error;
            if (data != null) {
                setRoomUsers(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false);
        navigate("/login")
    }

    return (
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="container mt-2">
                    <div className="row">
                        {roomUsers.map((room) => (
                            <CardUser key={room.id} roomsUser={room} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
