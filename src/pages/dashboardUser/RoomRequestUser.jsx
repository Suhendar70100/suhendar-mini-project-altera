import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabse/Supabase';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfFile from '../../components/PdfFile';
import { ToastContainer, toast } from 'react-toastify';

export default function RoomRequestUser() {
    const [requestRooms, setRequestRooms] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getRequestRoom();
    }, []);

    async function getRequestRoom() {
        try {
            const { data, error } = await supabase
                .from("rooms_request")
                .select("*, rooms!inner(*),user!inner(*)")
                .eq("id_user", id)
            if (error) throw error;
            if (data != null) {
                setRequestRooms(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function handleReject() {
        toast.error('Request Anda di Tolak !', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function handleProcessed() {
        toast.info('Request Anda Dalam Proses !', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h3 style={{ marginTop: "50px" }}>List Request Room</h3>
                    <table className="table table-striped" id="myTable">
                        <thead>
                            <tr>
                                <th scope="col">User Id</th>
                                <th scope="col">Room Name </th>
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
                                    <td>
                                        {request.status === 2 ? <button type="button" onClick={() => handleProcessed()} className="btn btn-info">Processed</button> : request.status === 1 ? <PDFDownloadLink document={<PdfFile user={request} />} filename="FORM">
                                            {({ loading }) => (loading ? <button type="button" className="btn btn-success">Loading Document...</button> : <button type="button" className="btn btn-success">Download</button>)}
                                        </PDFDownloadLink> : <button type="button" onClick={() => handleReject()} className="btn btn-danger">Rejected</button>}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
