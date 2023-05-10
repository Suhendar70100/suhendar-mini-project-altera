import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { supabase } from '../supabse/Supabase';
import { useParams } from 'react-router-dom';

export default function RoomRequest() {
    const [requestRooms, setRequestRooms] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getRequestRoom();
    }, []);

    async function getRequestRoom() {
        try {
            const { data, error } = await supabase
                .from("rooms_request")
                .select("*, rooms!inner(*)")
                .eq("id_user", id)
            if (error) throw error;
            if (data != null) {
                setRequestRooms(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    console.log(requestRooms)

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h3 style={{ "marginTop": "50px" }}>List Request Room</h3>
                    <table className="table table-striped" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">User Id</th>
                                <th scope="col">Room Id </th>
                                <th scope="col">Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestRooms.map((request, index) => (
                                <tr key={index}>
                                    <td scope="row">{request.id_user}</td>
                                    <td>{request.rooms.room_name}</td>
                                    <td>{request.date}</td>
                                    <td style={{ display: "flex" }}>
                                        <button type="button" style={{ marginRight: "10px" }} className="btn btn-success">Accepted</button>
                                        <button type="button" style={{ marginRight: "10px" }} className="btn btn-danger">Rejected</button>

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
