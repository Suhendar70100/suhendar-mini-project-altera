import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabse/Supabase'
import CardUser from '../../components/CardUser';

export default function DashboardUser() {
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
    return (
        <>
            <div className="container">
                <div className="container mt-2">
                    <div className="row">
                        {/* <Form /> */}
                        {roomUsers.map((room) => (
                            <CardUser roomsUser={room} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
