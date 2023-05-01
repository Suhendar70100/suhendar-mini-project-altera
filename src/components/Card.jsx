import { useEffect, useState } from "react"
import { supabase } from "../supabse/Supabase";

export default function Card({ rooms }) {
    const [editing, setEditing] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [images, setImages] = useState("");
    let urlImage = `https://qqxmljvyrpvpjgnurubv.supabase.co/storage/v1/object/public/images/${images.path}`;
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

        if (error) {
            alert(error);
        }
    }

    return (
        <>
            <div className="col-lg-4 mb-4">
                <div className="card">
                    {editing == false ?
                        <>
                            <div key={rooms.id}>
                                <img src={rooms.image} alt="" className="card-img-top" id="card-img" />
                                <div className="card-body">
                                    <h5 className="card-title">{rooms.room_name}</h5>
                                    <p className="card-text">{rooms.description_room}</p>
                                    <p className="card-text">{rooms.path_image}</p>
                                    <button onClick={() => {
                                        setEditing(true);
                                        // updateImage()
                                    }} className="btn btn-outline-primary btn-sm">Edit</button>
                                    <button onClick={() => deleteRoom()} className="btn btn-outline-primary btn-sm">Delete</button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <button onClick={() => setEditing(false)} className="btn btn-outline-primary btn-sm">Go Back</button>
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
                                    multiple
                                    name="selectMulti"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => updateImage(e)}
                                    placeholder="description room" />
                                {image && <img style={{ marginBottom: "10px !important", width: "300px", height: "300px" }} src={URL.createObjectURL(image)} alt="image product" />}
                            </div>
                            <div className="mb-3 md-4">
                                <button onClick={() => updateRoom()} className="btn btn-outline-primary btn-sm">Submit</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}