import React, { useEffect, useState } from "react";
import { hotelRooms } from "../data/roomData";

const Rooms = () => {
    // State management for room data
    const [roomList, setRoomList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const roomsToDisplayPerPage = 6;
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [showEditRoomModal, setShowEditRoomModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [newRoom, setNewRoom] = useState({
        title: "",
        category: "AC",
        price: "",
        description: "",
        bedType: "",
        amenities: [],
        isOccupied: false
    });

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

    // Handle adding new room
    const handleAddRoom = () => {
        const roomToAdd = {
            id: Math.max(...roomList.map(room => room.id), 0) + 1,
            title: newRoom.title,
            category: newRoom.category,
            price: parseInt(newRoom.price),
            description: newRoom.description,
            bedType: newRoom.bedType,
            amenities: newRoom.amenities,
            isOccupied: newRoom.isOccupied
        };

        const updatedRoomList = [...roomList, roomToAdd];
        setRoomList(updatedRoomList);
        
        // Reset form and close modal
        setShowAddRoomModal(false);
        setNewRoom({
            title: "",
            category: "AC",
            price: "",
            description: "",
            bedType: "",
            amenities: [],
            isOccupied: false
        });

        console.log('New room added:', roomToAdd);
        console.log('Updated room list:', updatedRoomList);
    };

    // Handle editing a room
    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setNewRoom({
            title: room.title,
            category: room.category,
            price: room.price.toString(),
            description: room.description,
            bedType: room.bedType,
            amenities: room.amenities,
            isOccupied: room.isOccupied
        });
        setShowEditRoomModal(true);
    };

    // Handle updating a room
    const handleUpdateRoom = () => {
        const updatedRoomList = roomList.map(room => 
            room.id === editingRoom.id 
                ? {
                    ...room,
                    title: newRoom.title,
                    category: newRoom.category,
                    price: parseInt(newRoom.price),
                    description: newRoom.description,
                    bedType: newRoom.bedType,
                    amenities: newRoom.amenities,
                    isOccupied: newRoom.isOccupied
                }
                : room
        );
        
        setRoomList(updatedRoomList);
        
        // Reset form and close modal
        setShowEditRoomModal(false);
        setEditingRoom(null);
        setNewRoom({
            title: "",
            category: "AC",
            price: "",
            description: "",
            bedType: "",
            amenities: [],
            isOccupied: false
        });

        console.log('Room updated:', editingRoom.id);
        console.log('Updated room list:', updatedRoomList);
    };

    // Handle deleting a room
    const handleDeleteRoom = (roomId) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            const updatedRoomList = roomList.filter(room => room.id !== roomId);
            setRoomList(updatedRoomList);
            console.log('Room deleted:', roomId);
            console.log('Updated room list:', updatedRoomList);
        }
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
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Rooms</h1>
                <button
                    onClick={() => setShowAddRoomModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                    <span className="text-lg">+</span>
                    Add New Room
                </button>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for rooms..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded ${room.isOccupied ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                                        {room.isOccupied ? 'Occupied' : 'Available'}
                                    </span>
                                    <button
                                        onClick={() => handleEditRoom(room)}
                                        className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                                        title="Edit Room"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRoom(room.id)}
                                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                                        title="Delete Room"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
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
            
            {/* Add Room Modal */}
            {showAddRoomModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add New Room</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Title</label>
                                <input
                                    type="text"
                                    value={newRoom.title}
                                    onChange={(e) => setNewRoom({...newRoom, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="e.g., AC Deluxe Room"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <select
                                    value={newRoom.category}
                                    onChange={(e) => setNewRoom({...newRoom, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="AC">AC</option>
                                    <option value="Non-AC">Non-AC</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Day</label>
                                <input
                                    type="number"
                                    value={newRoom.price}
                                    onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="2500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={newRoom.description}
                                    onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    rows="3"
                                    placeholder="Room description..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bed Type</label>
                                <select
                                    value={newRoom.bedType}
                                    onChange={(e) => setNewRoom({...newRoom, bedType: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select Bed Type</option>
                                    <option value="Single Bed">Single Bed</option>
                                    <option value="Double Bed">Double Bed</option>
                                    <option value="Queen Size">Queen Size</option>
                                    <option value="King Size">King Size</option>
                                    <option value="Twin Beds">Twin Beds</option>
                                    <option value="Bunk Beds">Bunk Beds</option>
                                    <option value="Multiple Beds">Multiple Beds</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities (comma separated)</label>
                                <input
                                    type="text"
                                    value={newRoom.amenities.join(", ")}
                                    onChange={(e) => setNewRoom({...newRoom, amenities: e.target.value.split(",").map(a => a.trim()).filter(a => a)})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="AC, WiFi, TV, Mini Bar"
                                />
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newRoom.isOccupied}
                                        onChange={(e) => setNewRoom({...newRoom, isOccupied: e.target.checked})}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Currently Occupied</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowAddRoomModal(false);
                                    setNewRoom({
                                        title: "",
                                        category: "AC",
                                        price: "",
                                        description: "",
                                        bedType: "",
                                        amenities: [],
                                        isOccupied: false
                                    });
                                }}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddRoom}
                                disabled={!newRoom.title || !newRoom.price || !newRoom.description}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Add Room
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Edit Room Modal */}
            {showEditRoomModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Room</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Title</label>
                                <input
                                    type="text"
                                    value={newRoom.title}
                                    onChange={(e) => setNewRoom({...newRoom, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="e.g., AC Deluxe Room"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <select
                                    value={newRoom.category}
                                    onChange={(e) => setNewRoom({...newRoom, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="AC">AC</option>
                                    <option value="Non-AC">Non-AC</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Day</label>
                                <input
                                    type="number"
                                    value={newRoom.price}
                                    onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="2500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={newRoom.description}
                                    onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    rows="3"
                                    placeholder="Room description..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bed Type</label>
                                <select
                                    value={newRoom.bedType}
                                    onChange={(e) => setNewRoom({...newRoom, bedType: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select Bed Type</option>
                                    <option value="Single Bed">Single Bed</option>
                                    <option value="Double Bed">Double Bed</option>
                                    <option value="Queen Size">Queen Size</option>
                                    <option value="King Size">King Size</option>
                                    <option value="Twin Beds">Twin Beds</option>
                                    <option value="Bunk Beds">Bunk Beds</option>
                                    <option value="Multiple Beds">Multiple Beds</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities (comma separated)</label>
                                <input
                                    type="text"
                                    value={newRoom.amenities.join(", ")}
                                    onChange={(e) => setNewRoom({...newRoom, amenities: e.target.value.split(",").map(a => a.trim()).filter(a => a)})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="AC, WiFi, TV, Mini Bar"
                                />
                            </div>
                            
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newRoom.isOccupied}
                                        onChange={(e) => setNewRoom({...newRoom, isOccupied: e.target.checked})}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Currently Occupied</span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowEditRoomModal(false);
                                    setEditingRoom(null);
                                    setNewRoom({
                                        title: "",
                                        category: "AC",
                                        price: "",
                                        description: "",
                                        bedType: "",
                                        amenities: [],
                                        isOccupied: false
                                    });
                                }}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateRoom}
                                disabled={!newRoom.title || !newRoom.price || !newRoom.description}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Update Room
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rooms;
