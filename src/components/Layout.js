import { useState } from 'react';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Navbar at top */}
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            
            {/* Content area with sidebar */}
            <div style={{ display: "flex", flex: 1 }}>
                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-neutral-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
                    lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <Sidebar />
                </div>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 p-5 bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;