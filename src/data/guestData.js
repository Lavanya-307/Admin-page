// Shared guest data for consistency across the application
export const hotelGuests = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1-555-0101",
        checkInDate: "2024-01-15",
        checkOutDate: "2024-01-18",
        roomType: "AC Deluxe Room",
        status: "Checked In",
        totalSpent: 7500,
        color: "Blue",
        capacity: 2,
        year: "2024",
        price: 2500
    },
    {
        id: 2,
        name: "Emily Johnson",
        email: "emily.j@email.com",
        phone: "+1-555-0102",
        checkInDate: "2024-01-20",
        checkOutDate: "2024-01-22",
        roomType: "Non-AC Standard Room",
        status: "Checked Out",
        totalSpent: 2600,
        color: "Green",
        capacity: 2,
        year: "2024",
        price: 1300
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael.b@email.com",
        phone: "+1-555-0103",
        checkInDate: "2024-01-25",
        checkOutDate: "2024-01-28",
        roomType: "AC Double Bed Room",
        status: "Checked In",
        totalSpent: 9000,
        color: "Red",
        capacity: 4,
        year: "2023",
        price: 3000
    },
    {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.w@email.com",
        phone: "+1-555-0104",
        checkInDate: "2024-02-01",
        checkOutDate: "2024-02-03",
        roomType: "AC Suite Room",
        status: "Reserved",
        totalSpent: 5000,
        color: "Purple",
        capacity: 3,
        year: "2024",
        price: 2500
    },
    {
        id: 5,
        name: "David Lee",
        email: "david.lee@email.com",
        phone: "+1-555-0105",
        checkInDate: "2024-02-05",
        checkOutDate: "2024-02-08",
        roomType: "AC Premium Suite",
        status: "Checked In",
        totalSpent: 13500,
        color: "Orange",
        capacity: 6,
        year: "2024",
        price: 4500
    },
    {
        id: 6,
        name: "Lisa Anderson",
        email: "lisa.a@email.com",
        phone: "+1-555-0106",
        checkInDate: "2024-02-10",
        checkOutDate: "2024-02-12",
        roomType: "Non-AC Family Room",
        status: "Checked Out",
        totalSpent: 3000,
        color: "Pink",
        capacity: 4,
        year: "2023",
        price: 1000
    },
    {
        id: 7,
        name: "James Taylor",
        email: "james.t@email.com",
        phone: "+1-555-0107",
        checkInDate: "2024-02-15",
        checkOutDate: "2024-02-18",
        roomType: "AC Executive Room",
        status: "Reserved",
        totalSpent: 10500,
        color: "Yellow",
        capacity: 2,
        year: "2024",
        price: 3500
    },
    {
        id: 8,
        name: "Maria Garcia",
        email: "maria.g@email.com",
        phone: "+1-555-0108",
        checkInDate: "2024-02-20",
        checkOutDate: "2024-02-23",
        roomType: "AC Honeymoon Suite",
        status: "Checked In",
        totalSpent: 15000,
        color: "Cyan",
        capacity: 2,
        year: "2024",
        price: 5000
    }
];

// Calculate statistics for dashboard
export const getGuestStats = () => {
    const totalGuests = hotelGuests.length;
    const checkedInGuests = hotelGuests.filter(guest => guest.status === 'Checked In').length;
    const checkedOutGuests = hotelGuests.filter(guest => guest.status === 'Checked Out').length;
    const reservedGuests = hotelGuests.filter(guest => guest.status === 'Reserved').length;
    const totalRevenue = hotelGuests.reduce((sum, guest) => sum + guest.totalSpent, 0);
    
    return {
        totalGuests,
        checkedInGuests,
        checkedOutGuests,
        reservedGuests,
        totalRevenue,
        averageSpending: Math.round(totalRevenue / totalGuests)
    };
};
