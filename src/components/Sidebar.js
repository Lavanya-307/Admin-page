import { Link } from "react-router-dom";

function Sidebar() {
    const sidebarStyle = {
        height: "100vh",
        position: "fixed",
        width: "250px"
    };

    return (
        <div className="bg-light sidebar-container d-flex flex-column" style={sidebarStyle}>
            <div className="sidebar-header p-3">
                <h5>Abilio Luxury Stay</h5>
            </div>
            
            <nav className="sidebar-nav p-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/guest" className="nav-link">
                            Guests
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/rooms" className="nav-link">
                            Rooms
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/deal" className="nav-link">
                            Deal
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Ratings" className="nav-link">
                        Ratings</Link>
                    </li>
                </ul>
            </nav>
            
            <div className="sidebar-footer p-3 mt-auto">
                <button className="btn btn-secondary w-50">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;