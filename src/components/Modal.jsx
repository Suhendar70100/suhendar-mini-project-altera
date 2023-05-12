import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "../supabse/Supabase";
export default function Modal() {
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [images, setImages] = useState("");

    let urlImage = `https://qsnpenemkxnjsfwlclpl.supabase.co/storage/v1/object/public/images/${images.path}`;
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
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel">Add Room</h1>
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
                                placeholder="image room" />
                            {/* {image && <img style={{ marginBottom: "10px !important", width: "300px", height: "300px" }} src={URL.createObjectURL(image)} alt="image product" />} */}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={() => addRoom()} type="button" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}