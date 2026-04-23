import React, { useEffect, useState } from "react";

function Rooms() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [editingRoom, setEditingRoom] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        // Custom room data with hotel room types
        const hotelRooms = [
            {
                id: 1,
                title: "AC Deluxe Room",
                category: "AC",
                price: 2500,
                description: "Air-conditioned deluxe room with king size bed",
                bedType: "King Size",
                amenities: ["AC", "WiFi", "TV", "Mini Bar"]
            },
            {
                id: 2,
                title: "Non-AC Standard Room",
                category: "Non-AC",
                price: 1300,
                description: "Standard room without AC, double bed available",
                bedType: "Double Bed",
                amenities: ["WiFi", "TV", "Fan"]
            },
            {
                id: 3,
                title: "AC Double Bed Room",
                category: "AC",
                price: 3000,
                description: "Air-conditioned room with comfortable double bed",
                bedType: "Double Bed",
                amenities: ["AC", "WiFi", "TV", "Room Service"]
            },
            {
                id: 4,
                title: "Non-AC Single Room",
                category: "Non-AC",
                price: 700,
                description: "Budget-friendly non-AC room with single bed",
                bedType: "Single Bed",
                amenities: ["WiFi", "Fan", "Basic Amenities"]
            },
            {
                id: 5,
                title: "AC Suite Room",
                category: "AC",
                price: 2500,
                description: "Luxury suite with AC, living area and premium amenities",
                bedType: "King Size",
                amenities: ["AC", "WiFi", "TV", "Mini Bar", "Living Area", "Premium View"]
            },
            {
                id: 6,
                title: "Non-AC Family Room",
                category: "Non-AC",
                price: 1000,
                description: "Spacious family room with multiple beds",
                bedType: "Multiple Beds",
                amenities: ["WiFi", "TV", "Fan", "Family Friendly"]
            }
        ];
        setData(hotelRooms);
    };

    const handleCreate = async () => {
        setIsCreating(true);
        setEditingRoom({
            title: "",
            category: "AC",
            price: 0,
            description: "",
            bedType: "",
            amenities: []
        });
    };

    const handleSaveNew = () => {
        if (editingRoom && editingRoom.title) {
            const newRoom = {
                ...editingRoom,
                id: Date.now()
            };
            setData(prevData => [...prevData, newRoom]);
            setIsCreating(false);
            setEditingRoom(null);
        }
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
    };

    const handleUpdate = () => {
        if (editingRoom) {
            setData(prevData =>
                prevData.map(item =>
                    item.id === editingRoom.id ? editingRoom : item
                )
            );
            setEditingRoom(null);
        }
    };

    const handleCancel = () => {
        setEditingRoom(null);
        setIsCreating(false);
    };

    const handleDelete = async (id) => {
        // Remove room from local data
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    const filteredRooms = data.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const category = item.category?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";

        return (
            title.includes(search.toLowerCase()) ||
            category.includes(search.toLowerCase()) ||
            description.includes(search.toLowerCase())
        );
    });

    return (
        <div>
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Available Rooms</h1>
            </div>
            <input
                type="text"
                placeholder="Search  for rooms..."
                onChange={(e) => setSearch(e.target.value)}
                style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px", width: "300px" }}
            />

            <button onClick={handleCreate} style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", fontSize: "14px", cursor: "pointer", marginLeft: "10px" }}>Add New Rooms</button>

            {editingRoom && (
                <div style={{ marginBottom: "20px", padding: "20px", border: "2px solid #007bff", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
                    <h3>{isCreating ? "Create New Room" : "Edit Room"}</h3>
                    <input
                        type="text"
                        placeholder="Room Title"
                        value={editingRoom.title}
                        onChange={(e) => setEditingRoom({ ...editingRoom, title: e.target.value })}
                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    />
                    <select
                        value={editingRoom.category}
                        onChange={(e) => setEditingRoom({ ...editingRoom, category: e.target.value })}
                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    >
                        <option value="AC">AC</option>
                        <option value="Non-AC">Non-AC</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Bed Type"
                        value={editingRoom.bedType}
                        onChange={(e) => setEditingRoom({ ...editingRoom, bedType: e.target.value })}
                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editingRoom.price}
                        onChange={(e) => setEditingRoom({ ...editingRoom, price: parseFloat(e.target.value) })}
                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editingRoom.description}
                        onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    />
                    <input
                        type="text"
                        placeholder="Amenities (comma separated)"
                        value={editingRoom.amenities.join(", ")}
                        onChange={(e) => setEditingRoom({ ...editingRoom, amenities: e.target.value.split(", ").map(a => a.trim()) })}
                        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
                    />
                    <div>
                        <button onClick={isCreating ? handleSaveNew : handleUpdate} style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}>
                            {isCreating ? "Create" : "Update"}
                        </button>
                        <button onClick={handleCancel} style={{ padding: "5px 10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px" }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
                {filteredRooms.map((item) => (
                    <div key={item.id} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>{item.title}</h3>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}><strong>Type:</strong> {item.category}</p>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}><strong>Bed:</strong> {item.bedType}</p>
                        <p style={{ fontSize: "14px", margin: "5px 0" }}><strong>Price:</strong> Rs.{item.price}/Day</p>
                        <p style={{ fontSize: "12px", margin: "5px 0", lineHeight: "1.4" }}><strong>Description:</strong> {item.description}</p>
                        <p style={{ fontSize: "12px", margin: "5px 0", lineHeight: "1.4" }}><strong>Amenities:</strong> {item.amenities.join(", ")}</p>

                        <div style={{ marginTop: "15px" }}>
                            <button onClick={() => handleEdit(item)} style={{ marginRight: "10px", padding: "6px 12px", fontSize: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} style={{ padding: "6px 12px", fontSize: "12px", backgroundColor: "#ff4444", color: "white", border: "none", borderRadius: "4px" }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;
