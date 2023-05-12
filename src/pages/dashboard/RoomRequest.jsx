import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabse/Supabase';
import { useNavigate } from 'react-router-dom';

export default function RoomRequest() {
    const [requestRooms, setRequestRooms] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getRequestRoom();
    }, []);

    async function getRequestRoom() {
        try {
            const { data, error } = await supabase
                .from("rooms_request")
                .select("*, rooms!inner(*),user!inner(*)")
            if (error) throw error;
            if (data != null) {
                setRequestRooms(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleAccepted(id) {
        try {
            const { data, error } = await supabase
                .from("rooms_request")
                .update({
                    status: 1,
                    disable: true
                })
                .eq("id", id)
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleRejected(id) {
        try {
            const { data, error } = await supabase
                .from("rooms_request")
                .update({
                    status: 3,
                    disable: true
                })
                .eq("id", id)
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h3 style={{ marginTop: "50px" }}>List Request Room</h3>
                    <table className="table table-striped" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Room Name </th>
                                <th scope="col">Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestRooms.map((request, index) => (
                                <tr key={index}>
                                    <td scope="row">{request.user.username}</td>
                                    <td>{request.rooms.room_name}</td>
                                    <td>{request.date}</td>
                                    <td style={{ display: "flex", justifyContent: "center" }}>
                                        <button type="button" disabled={request.disable} onClick={() => handleAccepted(request.id)} style={{ marginRight: "10px" }} className="btn btn-success">Accepted</button>
                                        <button type="button" disabled={request.disable} onClick={() => handleRejected(request.id)} style={{ marginRight: "10px" }} className="btn btn-danger">Rejected</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
