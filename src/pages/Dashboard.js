import React from "react";

function Dashboard() {
    const data = [
        { id: 1, name: "Total Rooms: 25" },
        { id: 2, name: "Occupied Rooms: 18" },
        { id: 3, name: "Available Rooms: 7" },
        { id: 4, name: "Today's Check-ins: 5" },
        { id: 5, name: "Today's Check-outs: 3" },
        { id: 6, name: "Revenue Today: $2,450" }
    ];

    return (
        <div>
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Dashboard</h1>
            </div>

            <div>
                {data.map((item) => (
                    <div key={item.id} style={{ marginBottom: "10px" }}>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
