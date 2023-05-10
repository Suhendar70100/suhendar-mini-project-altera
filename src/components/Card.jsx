import { useEffect, useState } from "react"
import { supabase } from "../supabse/Supabase";
import Modal from "./Modal";
import Swal from "sweetalert2";

export default function Card({ rooms }) {
    const [editing, setEditing] = useState(false);
    const [roomName, setRoomName] = useState(rooms.room_name);
    const [description, setDescription] = useState(rooms.description_room);
    // const [image, setImage] = useState(rooms.image);
    const [images, setImages] = useState("");
    let urlImage = `https://qsnpenemkxnjsfwlclpl.supabase.co/storage/v1/object/public/images/${images.path}`;
    console.log(urlImage);
    async function updateRoom() {
        try {
            const { data, error } = await supabase
                .from("rooms")
                .update({
                    room_name: roomName,
                    description_room: description,
                    image: urlImage,
                    path_image: images.path
                })
                .eq("id", rooms.id)
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteRoom() {
        deleteImage();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                try {
                    const { data, error } = await supabase
                        .from("rooms")
                        .delete()
                        .eq("id", rooms.id)
                    if (error) throw error;
                    window.location.reload();
                } catch (error) {
                    alert(error.message);
                }
            }
        });
    }

    async function updateImage(e) {
        let file = e.target.files[0];

        const { data, error } = await supabase
            .storage
            .from('images')
            .update(rooms.path_image, file, {
                cacheControl: '3600',
                upsert: true
            })

        if (data) {
            setImages(data)
        } else {
            console.log(error);
        }
    }

    async function deleteImage() {
        const { error } = await supabase
            .storage
            .from('images')
            .remove([rooms.path_image])

        // if (error) {
        //     alert(error);
        // }
    }

    return (
        <>
            <div className="col-md-3 col-sm-6">
                <div className="card" style={{ marginBottom: "20px" }}>
                    <div key={rooms.id}>
                        <img src={rooms.image} alt="" className="card-img-top" height={150} id="card-img" />
                        <div className="card-body">
                            <h5 className="card-title">{rooms.room_name}</h5>
                            <p className="card-text">{rooms.description_room}</p>
                            <div className="text-center">
                                <button style={{ marginRight: "5px" }} type="button" data-bs-toggle="modal" data-bs-target={`#staticBackdropEdit${rooms.id}`} className="btn btn-outline-primary btn-sm">Edit</button>
                                <button style={{ marginRight: "5px" }} onClick={() => deleteRoom()} className="btn btn-outline-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={`staticBackdropEdit${rooms.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 md-4">
                                    <label htmlFor="roomName" className="form-label">Room Name</label>
                                    <input
                                        onChange={(e) => setRoomName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="roomName"
                                        defaultValue={rooms.room_name}
                                        placeholder="name room" />
                                </div>
                                <div className="mb-3 md-4">
                                    <label htmlFor="description" className="form-label">Description Room</label>
                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        defaultValue={rooms.description_room}
                                        placeholder="description room" />
                                </div>
                                <div className="mb-3 md-4">
                                    <label htmlFor="description" className="form-label">Image Room</label>
                                    <input
                                        id="imageProduct"
                                        // defaultValue={rooms.image}
                                        multiple
                                        name="selectMulti"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => updateImage(e)}
                                        placeholder="image room" />
                                    {/* {image && <img style={{ marginBottom: "10px !important", width: "300px", height: "300px" }} src={URL.createObjectURL(image)} alt="image product" />} */}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => updateRoom()} type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}