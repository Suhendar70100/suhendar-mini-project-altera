import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Form from "../../components/Form";
import { supabase } from "../../supabse/Supabase";


export default function Dashboard() {
    const [rooms, setRooms] = useState([]);
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
    console.log(rooms)
    return (
        <>
            <Form />
            {rooms.map((room) => (
                <Card rooms={room} />
            ))}
        </>
    )
}