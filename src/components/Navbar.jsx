import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [active, setActive] = useState(1);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Booking Room</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item">
                            <Link to={"/dashboard"} className={active === 1 ? "nav-link mx-2 active" : "nav-link mx-2"} onClick={e => setActive(1)} aria-current="page" href="#">Room Manage</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/room-request'} className={active === 2 ? "nav-link mx-2 active" : "nav-link mx-2"} onClick={e => setActive(2)} href="#">Room Request</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className={active === 3 ? "nav-link mx-2 active dropdown-toggle" : "nav-link mx-2 dropdown-toggle"} onClick={e => setActive(3)} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">My Profile</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}