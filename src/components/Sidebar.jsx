import { useState } from "react"

export default function Sidebar() {
    const [active, setActive] = useState(1);
    return (
        <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 vh-100">
            <div>
                <span className="p-3 text-white text-decoration-none">
                    <i className="bi bi-code-slash fs-4 me-4"></i>
                    <span className="fs-4">Booking Room</span>
                </span>
                <hr className="text-white mt-2" />
                <ul className="nav nav-pills flex-column mt-3">
                    <li className={active === 1 ? "active nav-item p-2" : "nav-item p-2"} onClick={e => setActive(1)}>
                        <span className="text-white text-decoration-none p-1">
                            <i className="bi bi-speedometer2 me-3 fs-4"></i>
                            <span className="fs-4"><strong>Dashboard</strong></span>
                        </span>
                    </li>
                    <li className={active === 2 ? "active nav-item p-2" : "nav-item p-2"} onClick={e => setActive(2)}>
                        <span className="text-white text-decoration-none p-1">
                            <i className="bi bi-people me-3 fs-4"></i>
                            <span className="fs-4"><strong>Users</strong></span>
                        </span>
                    </li>
                </ul>
            </div>
            <div>
                <hr className="text-white" />
                <div className="nav-item p-2">
                    <span className="text-white text-decoration-none p-1">
                        <i className="bi bi-person-circle me-3 fs-4"></i>
                        <span className="fs-4"><strong>Suhendar</strong></span>
                    </span>
                </div>
            </div>
        </div>
    )
}
