import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabse/Supabase";

export default function CardUser({ roomsUser }) {
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const { data, error } = await supabase
                .from("rooms_request")
                .insert({
                    id_user: id,
                    id_room: roomsUser.id,
                    date: startDate
                })
                .single()
            if (error) throw error;
            alert("Request Rooms Berhasil !");
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }

    }
    return (
        <>
            <div className="col-md-3 col-sm-6">
                <div className="card" style={{ marginBottom: "20px" }}>
                    <div key={roomsUser.id}>
                        <img src={roomsUser.image} alt="" className="card-img-top" height={150} id="card-img" />
                        <div className="card-body">
                            <h5 className="card-title">{roomsUser.room_name}</h5>
                            <p className="card-text">{roomsUser.description_room}</p>
                        </div>
                    </div>
                    <button style={{ marginRight: "5px" }} type="button" data-bs-toggle="modal" data-bs-target={`#staticBackdropUser${roomsUser.id}`} className="btn btn-outline-primary btn-sm">Request Room</button>
                </div>
            </div>
            <div className="modal fade" id={`staticBackdropUser${roomsUser.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel">Request Room</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={() => handleSubmit()} type="button" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
