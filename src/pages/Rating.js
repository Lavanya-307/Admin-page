import React, { useState } from 'react';
import { 
  StarIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const Rating = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Sample data
    const [guestRatings, setGuestRatings] = useState([
        {
            id: 1,
            guestName: 'John Smith',
            roomNumber: '101',
            checkInDate: '2024-01-15',
            checkOutDate: '2024-01-18',
            rating: 5,
            category: 'Service',
            comment: 'Excellent service, very attentive staff and clean rooms.',
            status: 'verified'
        },
        {
            id: 2,
            guestName: 'Emily Johnson',
            roomNumber: '205',
            checkInDate: '2024-01-20',
            checkOutDate: '2024-01-22',
            rating: 4,
            category: 'Room',
            comment: 'Comfortable room with great amenities.',
            status: 'pending'
        },
        {
            id: 3,
            guestName: 'Michael Brown',
            roomNumber: '302',
            checkInDate: '2024-01-25',
            checkOutDate: '2024-01-28',
            rating: 3,
            category: 'Amenities',
            comment: 'Good location but amenities could be improved.',
            status: 'resolved'
        },
        {
            id: 4,
            guestName: 'Sarah Wilson',
            roomNumber: '108',
            checkInDate: '2024-02-01',
            checkOutDate: '2024-02-03',
            rating: 5,
            category: 'Overall',
            comment: 'Perfect stay! Will definitely come back.',
            status: 'verified'
        },
        {
            id: 5,
            guestName: 'David Lee',
            roomNumber: '210',
            checkInDate: '2024-02-05',
            checkOutDate: '2024-02-08',
            rating: 4,
            category: 'Service',
            comment: 'Staff was very helpful and professional.',
            status: 'pending'
        }
    ]);

    const updateRatingStatus = (id, newStatus) => {
        setGuestRatings(prevRatings =>
            prevRatings.map(rating =>
                rating.id === id ? { ...rating, status: newStatus } : rating
            )
        );
    };

    const getFilteredRatings = () => {
        return guestRatings.filter(rating => {
            const matchesSearch = searchTerm === '' || 
                rating.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rating.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rating.comment.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = categoryFilter === 'all' || rating.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' || rating.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
    };

    const displayStars = (rating) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIconSolid
                        key={star}
                        className={`w-4 h-4 ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                ))}
                <span className="ml-1 text-sm text-gray-600">({rating}.0)</span>
            </div>
        );
    };

    const getStatusBadgeStyles = (status) => {
        const styles = {
            verified: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            resolved: 'bg-blue-100 text-blue-800'
        };
        return styles[status] || styles.pending;
    };

    const filteredRatings = getFilteredRatings();

    // Calculate analytics
    const averageRating = (guestRatings.reduce((sum, r) => sum + r.rating, 0) / guestRatings.length).toFixed(1);
    const totalRatings = guestRatings.length;
    const verifiedRatings = guestRatings.filter(r => r.status === 'verified').length;
    const pendingRatings = guestRatings.filter(r => r.status === 'pending').length;

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: guestRatings.filter(r => r.rating === star).length,
        percentage: (guestRatings.filter(r => r.rating === star).length / guestRatings.length) * 100
    }));

    // Category-wise ratings
    const categoryRatings = ['Service', 'Room', 'Amenities', 'Overall'].map(category => {
        const ratingsByCategory = guestRatings.filter(r => r.category === category);
        const avgRating = ratingsByCategory.length > 0 
            ? (ratingsByCategory.reduce((sum, r) => sum + r.rating, 0) / ratingsByCategory.length).toFixed(1)
            : 0;
        return { category, avgRating, count: ratingsByCategory.length };
    });

    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Guest Ratings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor and manage guest feedback and ratings</p>
            </header>

            {/* Dashboard Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2 flex items-center">
                                {averageRating}
                                <StarIconSolid className="w-8 h-8 text-yellow-400 ml-2" />
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
                            <StarIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Ratings</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalRatings}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                            <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Verified</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{verifiedRatings}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/20">
                            <ArrowTrendingUpIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{pendingRatings}</p>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
                            <ChartBarIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Graphs Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Rating Distribution Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rating Distribution</h3>
                    <div className="space-y-3">
                        {ratingDistribution.map(({ star, count, percentage }) => (
                            <div key={star} className="flex items-center gap-3">
                                <div className="flex items-center w-16">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <StarIconSolid
                                            key={s}
                                            className={`w-4 h-4 ${
                                                s <= star ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                                            <div 
                                                className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                                                style={{ width: `${percentage}%` }}
                                            >
                                                <span className="text-xs font-medium text-white">
                                                    {count}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category-wise Ratings Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category-wise Ratings</h3>
                    <div className="space-y-3">
                        {categoryRatings.map(({ category, avgRating, count }) => (
                            <div key={category} className="flex items-center gap-3">
                                <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {category}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                                            <div 
                                                className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                                                style={{ width: `${(avgRating / 5) * 100}%` }}
                                            >
                                                <span className="text-xs font-medium text-white">
                                                    {avgRating}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                                            {count}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by guest name, room, or comment..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            <option value="Service">Service</option>
                            <option value="Room">Room</option>
                            <option value="Amenities">Amenities</option>
                            <option value="Overall">Overall</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </section>

            <main className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Ratings ({filteredRatings.length})</h2>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Guest
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Room
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Dates
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Rating
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Comment
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredRatings.map((rating) => (
                            <tr key={rating.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-3 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{rating.guestName}</div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {rating.roomNumber}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    <div className="text-xs">
                                        <div>{rating.checkInDate}</div>
                                        <div className="text-gray-500 dark:text-gray-400">to {rating.checkOutDate}</div>
                                    </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap">
                                    {displayStars(rating.rating)}
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {rating.category}
                                </td>
                                <td className="px-3 py-4">
                                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate" title={rating.comment}>
                                        {rating.comment}
                                    </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyles(rating.status)}`}>
                                        {rating.status}
                                    </span>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => {
                                            if (rating.status === 'pending') {
                                                updateRatingStatus(rating.id, 'verified');
                                            } else if (rating.status === 'verified') {
                                                updateRatingStatus(rating.id, 'resolved');
                                            } else if (rating.status === 'resolved') {
                                                updateRatingStatus(rating.id, 'pending');
                                            }
                                        }}
                                        className={`px-3 py-1 text-xs font-medium text-white rounded ${
                                            rating.status === 'pending' ? 'bg-green-600 hover:bg-green-700' :
                                            rating.status === 'verified' ? 'bg-blue-600 hover:bg-blue-700' :
                                            'bg-yellow-600 hover:bg-yellow-700'
                                        }`}
                                    >
                                        {rating.status === 'pending' ? 'Verify' :
                                         rating.status === 'verified' ? 'Resolve' :
                                         'Reopen'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Rating;
