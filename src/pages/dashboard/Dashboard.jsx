import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { supabase } from "../../supabse/Supabase";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";


export default function Dashboard() {
    const [rooms, setRooms] = useState([]);
    const [inputText, setInputText] = useState("");
    useEffect(() => {
        getRoom();
    }, []);

    async function getRoom() {
        try {
            const { data, error } = await supabase
                .from("rooms")
                .select("*")
            if (error) throw error;
            if (data != null) {
                setRooms(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    // console.log(rooms)
    const filterData = rooms?.filter((el) => {
        if (inputText === "") {
            return el;
        } else {
            return el.room_name.toLowerCase().includes(inputText)
        }
    })
    return (
        <>
            {/* <Navbar /> */}
            <div className="text-center">
                <form method="get" action="#">
                    <input
                        onChange={(e) => setInputText(e.target.value.toLowerCase())}
                        type="text"
                        placeholder="Search Room"
                        className="search" />
                </form>
            </div>
            <div className="container">
                <button type="button" className="btn btn-primary" style={{ marginTop: "50px", marginBottom: "20px" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Add Room
                </button>
                <Modal />
                <div className="container mt-2">
                    <div className="row">
                        {/* <Form /> */}
                        {filterData.map((room) => (
                            <Card rooms={room} />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}