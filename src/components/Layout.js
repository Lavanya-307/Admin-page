import { useState } from 'react';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Navbar at top */}
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            
            {/* Content area with sidebar */}
            <div style={{ display: "flex", flex: 1 }}>
                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out
                    lg:relative lg:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <Sidebar />
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main style={{ flex: 1, padding: "20px" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;