import React, { useEffect, useState } from "react";
import { hotelRooms } from "../data/roomData";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 6;

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = () => {
        setRooms(hotelRooms);
    };

    const startAddingRoom = () => {
        setIsAddingNew(true);
        setCurrentRoom({
            title: "",
            category: "AC",
            price: 0,
            description: "",
            bedType: "",
            amenities: []
        });
    };

    const saveNewRoom = () => {
        if (currentRoom && currentRoom.title) {
            const newRoom = {
                ...currentRoom,
                id: Date.now()
            };
            setRooms(prevRooms => [...prevRooms, newRoom]);
            setIsAddingNew(false);
            setCurrentRoom(null);
        }
    };

    const editRoom = (room) => {
        setCurrentRoom(room);
    };

    const updateRoom = () => {
        if (currentRoom) {
            setRooms(prevRooms =>
                prevRooms.map(room =>
                    room.id === currentRoom.id ? currentRoom : room
                )
            );
            setCurrentRoom(null);
        }
    };

    const cancelEdit = () => {
        setCurrentRoom(null);
        setIsAddingNew(false);
    };

    const deleteRoom = (roomId) => {
        // Remove room from local data
        setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
    };

    const getFilteredRooms = () => {
        return rooms.filter((room) => {
            const title = room.title?.toLowerCase() || "";
            const category = room.category?.toLowerCase() || "";
            const description = room.description?.toLowerCase() || "";

            return (
                title.includes(searchTerm.toLowerCase()) ||
                category.includes(searchTerm.toLowerCase()) ||
                description.includes(searchTerm.toLowerCase())
            );
        });
    };

    const filteredRooms = getFilteredRooms();
    
    // Pagination logic
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Rooms</h1>
            </div>
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search for rooms..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button onClick={startAddingRoom} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Add New Room</button>
            </div>

            {currentRoom && (
                <div className="mb-6 p-6 border-2 border-blue-500 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{isAddingNew ? "Create New Room" : "Edit Room"}</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Room Title"
                            value={currentRoom.title}
                            onChange={(e) => setCurrentRoom({ ...currentRoom, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <select
                            value={currentRoom.category}
                            onChange={(e) => setCurrentRoom({ ...currentRoom, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="AC">AC</option>
                            <option value="Non-AC">Non-AC</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Bed Type"
                            value={currentRoom.bedType}
                            onChange={(e) => setCurrentRoom({ ...currentRoom, bedType: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={currentRoom.price}
                            onChange={(e) => setCurrentRoom({ ...currentRoom, price: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={currentRoom.description}
                            onChange={(e) => setCurrentRoom({ ...currentRoom, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                            type="text"
                            placeholder="Amenities (comma separated)"
                            value={currentRoom.amenities.join(", ")}
                            onChange={(e) => setCurrentRoom({ ...currentRoom, amenities: e.target.value.split(", ").map(a => a.trim()) })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="flex gap-2">
                            <button onClick={isAddingNew ? saveNewRoom : updateRoom} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                {isAddingNew ? "Create" : "Update"}
                            </button>
                            <button onClick={cancelEdit} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {currentRooms.map((room) => (
                    <div key={room.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{room.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Type:</strong> {room.category}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Bed:</strong> {room.bedType}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Price:</strong> Rs.{room.price}/Day</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed"><strong>Description:</strong> {room.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed"><strong>Amenities:</strong> {room.amenities.join(", ")}</p>

                        <div className="flex gap-2">
                            <button onClick={() => editRoom(room)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                Edit
                            </button>
                            <button onClick={() => deleteRoom(room.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Pagination Controls */}
            {filteredRooms.length > roomsPerPage && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
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
