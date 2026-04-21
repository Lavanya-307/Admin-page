import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    const mainContentStyle = {
        marginLeft: "250px"
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content" style={mainContentStyle}>
                <Navbar />
                <main className="content-area p-3">
                    {children}
                </main>
            </div>
        </div>
    );
}
export default Layout;