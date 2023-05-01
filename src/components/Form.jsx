import { useEffect, useState } from "react"
import { supabase } from "../supabse/Supabase";
import { v4 as uuidv4 } from 'uuid';

export default function Form() {
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [images, setImages] = useState("");

    let urlImage = `https://qqxmljvyrpvpjgnurubv.supabase.co/storage/v1/object/public/images/${images.path}`;
    console.log(images)
    console.log(urlImage);
    async function addRoom() {
        try {
            const { data, error } = await supabase
                .from("rooms")
                .insert({
                    room_name: roomName,
                    description_room: description,
                    image: urlImage,
                    path_image: images.path
                })
                .single()
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }


    async function uploadImage(e) {
        let file = e.target.files[0];

        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(uuidv4(), file)

        if (data) {
            setImages(data)
        } else {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="mb-3 md-4">
                    <label htmlFor="roomName" className="form-label">Room Name</label>
                    <input
                        onChange={(e) => setRoomName(e.target.value)}
                        type="text"
                        className="form-control"
                        id="roomName"
                        placeholder="name room" />
                </div>
                <div className="mb-3 md-4">
                    <label htmlFor="description" className="form-label">Description Room</label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="form-control"
                        id="description"
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
                        onChange={(e) => uploadImage(e)}
                        placeholder="description room" />
                    {image && <img style={{ marginBottom: "10px !important", width: "300px", height: "300px" }} src={URL.createObjectURL(image)} alt="image product" />}
                </div>
                <div className="mb-3 md-4">
                    <button onClick={() => addRoom()} className="btn btn-outline-primary btn-sm">Submit</button>
                </div>
            </div>
        </>
    )
}