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

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {currentRoomsToDisplay.map((room) => (
                    <div key={room.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col h-full">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{room.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{room.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {room.amenities.map((amenity, index) => (
                                    <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-lg font-bold text-green-600 dark:text-green-400">Rs.{room.price}/Day</span>
                                <span className={`text-xs px-2 py-1 rounded ${room.isOccupied ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                                    {room.isOccupied ? 'Occupied' : 'Available'}
                                </span>
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
