import React, { useState, useEffect } from 'react';

import { hotelGuests } from '../data/guestData';

const Guest = () => {
    // State management for guest data
    const [guestList, setGuestList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [guestEditForm, setGuestEditForm] = useState({
        name: '',
        color: '',
        capacity: '',
        year: '',
        price: ''
    });
    

    // Load guest data on component mount
    useEffect(() => {
        loadGuestData();
    }, []);

    // Load guests from data source
    const loadGuestData = () => {
        console.log('Loading guest data...', hotelGuests);
        setGuestList(hotelGuests);
    };

    // Filter guests based on search query
    const getFilteredGuests = guestList.filter(guest => 
        guest.name && guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Start editing a guest
    const beginGuestEdit = (guest) => {
        setSelectedGuest(guest);
        setGuestEditForm({
            name: guest.name || '',
            color: guest.data?.color || '',
            capacity: guest.data?.capacity || '',
            year: guest.data?.year || '',
            price: guest.data?.price || ''
        });
        setShowEditModal(true);
    };

    // Delete a guest from the list
    const removeGuest = (guestId) => {
        if (window.confirm('Are you sure you want to delete this guest?')) {
            setGuestList(guestList.filter(guest => guest.id !== guestId));
            alert('Guest deleted successfully!');
        }
    };

    // Update guest information
    const saveGuestUpdates = (event) => {
        event.preventDefault();
        
        const updatedGuestData = {
            ...selectedGuest,
            name: guestEditForm.name,
            color: guestEditForm.color,
            capacity: guestEditForm.capacity,
            year: guestEditForm.year,
            price: guestEditForm.price
        };

        setGuestList(guestList.map(guest => 
            guest.id === selectedGuest.id ? updatedGuestData : guest
        ));
        closeEditDialog();
        alert('Guest updated successfully!');
    };

    // Handle form input changes
    const handleFormInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        
        setGuestEditForm(previousForm => ({
            ...previousForm,
            [fieldName]: fieldValue
        }));
    };

    // Close the edit dialog
    const closeEditDialog = () => {
        setShowEditModal(false);
        setSelectedGuest(null);
        setGuestEditForm({
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
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
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
                            {getFilteredGuests.map((guest) => (
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
                                            onClick={() => beginGuestEdit(guest)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => removeGuest(guest.id)}
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

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Guest</h2>
                        <form onSubmit={saveGuestUpdates}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={guestEditForm.name}
                                    onChange={handleFormInputChange}
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
                                    value={guestEditForm.color}
                                    onChange={handleFormInputChange}
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
                                    value={guestEditForm.capacity}
                                    onChange={handleFormInputChange}
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
                                    value={guestEditForm.year}
                                    onChange={handleFormInputChange}
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
                                    value={guestEditForm.price}
                                    onChange={handleFormInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeEditDialog}
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
