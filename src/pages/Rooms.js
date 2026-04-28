import React, { useEffect, useState } from "react";
import { hotelRooms } from "../data/roomData";

const Rooms = () => {
    // State management for room data
    const [roomList, setRoomList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const roomsToDisplayPerPage = 12;

    // Load room data on component mount
    useEffect(() => {
        console.log('Rooms component mounted');
        loadRoomData();
    }, []);

    // Load rooms from data source
    const loadRoomData = () => {
        console.log('Loading room data...', hotelRooms);
        setRoomList(hotelRooms);
    };

    
    const getFilteredRooms = () => {
        return roomList.filter((room) => {
            const title = room.title?.toLowerCase() || "";
            const category = room.category?.toLowerCase() || "";
            const description = room.description?.toLowerCase() || "";

            return (
                title.includes(searchQuery.toLowerCase()) ||
                category.includes(searchQuery.toLowerCase()) ||
                description.includes(searchQuery.toLowerCase())
            );
        });
    };

    const filteredRooms = getFilteredRooms();
    
    // Pagination logic
    const indexOfLastRoom = currentPageNumber * roomsToDisplayPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsToDisplayPerPage;
    const currentRoomsToDisplay = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(filteredRooms.length / roomsToDisplayPerPage);
    
    console.log('Rooms state:', roomList);
    console.log('Filtered rooms:', filteredRooms);
    console.log('Current rooms to display:', currentRoomsToDisplay);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Rooms</h1>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for rooms..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
                {currentRoomsToDisplay.map((room) => (
                    <div key={room.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        {room.image && (
                            <img 
                                src={room.image} 
                                alt={room.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                <h3 className="text-sm font-semibold truncate">{room.title}</h3>
                                <p className="text-xs opacity-90">Rs.{room.price}/Day</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Pagination Controls */}
            {filteredRooms.length > roomsToDisplayPerPage && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setCurrentPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={currentPageNumber === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPageNumber} of {totalPages}
                    </span>
                    
                    <button
                        onClick={() => setCurrentPageNumber(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPageNumber === totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Rooms;
