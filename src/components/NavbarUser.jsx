import { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

export default function NavbarUser() {
    const [active, setActive] = useState(1);
    const navigate = useNavigate()
    const { id } = useParams();

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false);
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Booking Room</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <Link to={`/dashboard-user/${id}`} className={active === 1 ? "nav-link mx-2 active" : "nav-link mx-2"} onClick={e => setActive(1)} aria-current="page" href="#">Room Manage</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`request-user/${id}`} className={active === 2 ? "nav-link mx-2 active" : "nav-link mx-2"} onClick={e => setActive(2)} href="#">Room Request</Link>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-dark" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}