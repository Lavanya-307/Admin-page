// Shared room data for consistency across the application
export const hotelRooms = [
    {
        id: 1,
        title: "AC Deluxe Room",
        category: "AC",
        price: 2500,
        description: "Air-conditioned deluxe room with king size bed",
        bedType: "King Size",
        amenities: ["AC", "WiFi", "TV", "Mini Bar"],
        isOccupied: true
    },
    {
        id: 2,
        title: "Non-AC Standard Room",
        category: "Non-AC",
        price: 1300,
        description: "Standard room without AC, double bed available",
        bedType: "Double Bed",
        amenities: ["WiFi", "TV", "Fan"],
        isOccupied: true
    },
    {
        id: 3,
        title: "AC Double Bed Room",
        category: "AC",
        price: 3000,
        description: "Air-conditioned room with comfortable double bed",
        bedType: "Double Bed",
        amenities: ["AC", "WiFi", "TV", "Room Service"],
        isOccupied: true
    },
    {
        id: 4,
        title: "Non-AC Single Room",
        category: "Non-AC",
        price: 700,
        description: "Budget-friendly non-AC room with single bed",
        bedType: "Single Bed",
        amenities: ["WiFi", "Fan", "Basic Amenities"],
        isOccupied: false
    },
    {
        id: 5,
        title: "AC Suite Room",
        category: "AC",
        price: 2500,
        description: "Luxury suite with AC, living area and premium amenities",
        bedType: "King Size",
        amenities: ["AC", "WiFi", "TV", "Mini Bar", "Living Area", "Premium View"],
        isOccupied: false
    },
    {
        id: 6,
        title: "Non-AC Family Room",
        category: "Non-AC",
        price: 1000,
        description: "Spacious family room with multiple beds",
        bedType: "Multiple Beds",
        amenities: ["WiFi", "TV", "Fan", "Family Friendly"],
        isOccupied: false
    },
    {
        id: 7,
        title: "AC Premium Suite",
        category: "AC",
        price: 4500,
        description: "Ultra-luxury suite with premium amenities and city view",
        bedType: "King Size",
        amenities: ["AC", "WiFi", "TV", "Mini Bar", "Living Area", "Premium View", "Jacuzzi", "Balcony"],
        isOccupied: true
    },
    {
        id: 8,
        title: "AC Twin Room",
        category: "AC",
        price: 2200,
        description: "Comfortable room with two separate beds",
        bedType: "Twin Beds",
        amenities: ["AC", "WiFi", "TV", "Room Service"],
        isOccupied: true
    },
    {
        id: 9,
        title: "Non-AC Budget Room",
        category: "Non-AC",
        price: 500,
        description: "Economy room with basic amenities",
        bedType: "Single Bed",
        amenities: ["WiFi", "Fan", "Basic Amenities"],
        isOccupied: false
    },
    {
        id: 10,
        title: "AC Executive Room",
        category: "AC",
        price: 3500,
        description: "Business class room with work desk and premium facilities",
        bedType: "Queen Size",
        amenities: ["AC", "WiFi", "TV", "Mini Bar", "Work Desk", "Room Service"],
        isOccupied: false
    },
    {
        id: 11,
        title: "AC Honeymoon Suite",
        category: "AC",
        price: 5000,
        description: "Romantic suite with special amenities for couples",
        bedType: "King Size",
        amenities: ["AC", "WiFi", "TV", "Mini Bar", "Living Area", "Premium View", "Champagne", "Flowers"],
        isOccupied: true
    },
    {
        id: 12,
        title: "Non-AC Dorm Room",
        category: "Non-AC",
        price: 300,
        description: "Shared dormitory room for budget travelers",
        bedType: "Bunk Beds",
        amenities: ["WiFi", "Fan", "Shared Bathroom", "Lockers"],
        isOccupied: false
    }
];

// Calculate statistics for dashboard
export const getRoomStats = () => {
    const totalRooms = hotelRooms.length;
    const occupiedRooms = hotelRooms.filter(room => room.isOccupied).length;
    const availableRooms = totalRooms - occupiedRooms;
    const totalRevenue = hotelRooms
        .filter(room => room.isOccupied)
        .reduce((sum, room) => sum + room.price, 0);
    
    return {
        totalRooms,
        occupiedRooms,
        availableRooms,
        totalRevenue,
        occupancyRate: Math.round((occupiedRooms / totalRooms) * 100)
    };
};
