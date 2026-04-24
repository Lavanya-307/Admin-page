import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Guest = () => {
    const [guests, setGuests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentGuest, setCurrentGuest] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        color: '',
        capacity: '',
        year: '',
        price: ''
    });
    

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = () => {
        axios.get('https://api.restful-api.dev/objects')
            .then(response => {
                setGuests(response.data);
            })
            .catch(error => {
                console.error('Failed to load guests:', error);
            });
    };

    const filteredGuests = guests.filter(guest => 
        guest.name && guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startEdit = (guest) => {
        setCurrentGuest(guest);
        setEditForm({
            name: guest.name || '',
            color: guest.data?.color || '',
            capacity: guest.data?.capacity || '',
            year: guest.data?.year || '',
            price: guest.data?.price || ''
        });
        setIsEditing(true);
    };

    const deleteGuest = (guestId) => {
        if (window.confirm('Are you sure you want to delete this guest?')) {
            axios.delete(`https://api.restful-api.dev/objects/${guestId}`)
                .then(() => {
                    setGuests(guests.filter(guest => guest.id !== guestId));
                    alert('Guest deleted successfully!');
                })
                .catch(error => {
                    console.error('Failed to delete guest:', error);
                    alert('Error deleting guest');
                });
        }
    };

    const updateGuest = (e) => {
        e.preventDefault();
        
        const updatedData = {
            name: editForm.name,
            data: {
                color: editForm.color,
                capacity: editForm.capacity,
                year: editForm.year,
                price: editForm.price
            }
        };

        axios.put(`https://api.restful-api.dev/objects/${currentGuest.id}`, updatedData)
            .then(response => {
                setGuests(guests.map(guest => 
                    guest.id === currentGuest.id ? response.data : guest
                ));
                closeEditModal();
                alert('Guest updated successfully!');
            })
            .catch(error => {
                console.error('Failed to update guest:', error);
                alert('Error updating guest');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const closeEditModal = () => {
        setIsEditing(false);
        setCurrentGuest(null);
        setEditForm({
            name: '',
            color: '',
            capacity: '',
            year: '',
            price: ''
        });
    };

    
    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Guest List</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your guest information and product details</p>
            </header>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex-1 w-full sm:max-w-md">
                        <input
                            type="text"
                            placeholder="Search guest..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </section>

            <main className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Guests</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Guest Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Color
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Capacity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Year
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{guest.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {guest.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {guest.data?.color || 'blue'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {guest.data?.capacity || '16gb'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {guest.data?.year || '2026'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {guest.data?.price ? `Rs.${guest.data.price}` : 'Rs.2230'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => startEdit(guest)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteGuest(guest.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Guest</h2>
                        <form onSubmit={updateGuest}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={editForm.color}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Capacity
                                </label>
                                <input
                                    type="text"
                                    name="capacity"
                                    value={editForm.capacity}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    name="year"
                                    value={editForm.year}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    value={editForm.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Guest;
