import { useState, useEffect, useMemo } from 'react';
import { 
  MagnifyingGlassIcon, 
  Bars3Icon,
  BuildingOfficeIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  UserIcon,
  CalendarIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { useTheme } from '../contexts/Theme';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Sample comprehensive search data from all modules
  const searchData = useMemo(() => [
    // Rooms data
    { id: 'r1', type: 'room', name: 'Deluxe Suite 101', category: 'Room', status: 'Available', details: 'King bed, Ocean view, $250/night', icon: HomeIcon },
    { id: 'r2', type: 'room', name: 'Ocean View 205', category: 'Room', status: 'Occupied', details: 'Queen bed, City view, $180/night', icon: HomeIcon },
    { id: 'r3', type: 'room', name: 'Presidential Penthouse', category: 'Room', status: 'Available', details: '2 bedrooms, Premium amenities, $500/night', icon: HomeIcon },
    { id: 'r4', type: 'room', name: 'Standard Room 301', category: 'Room', status: 'Maintenance', details: 'Single bed, Garden view, $120/night', icon: HomeIcon },
    
    // Guests data
    { id: 'g1', type: 'guest', name: 'John Smith', category: 'Guest', status: 'Active', details: 'VIP member, 5 stays', icon: UserIcon },
    { id: 'g2', type: 'guest', name: 'Emily Johnson', category: 'Guest', status: 'Checked Out', details: 'Regular member, 3 stays', icon: UserIcon },
    { id: 'g3', type: 'guest', name: 'Michael Brown', category: 'Guest', status: 'Active', details: 'Premium member, 8 stays', icon: UserIcon },
    { id: 'g4', type: 'guest', name: 'Sarah Wilson', category: 'Guest', status: 'Active', details: 'New member, 1 stay', icon: UserIcon },
    { id: 'g5', type: 'guest', name: 'David Lee', category: 'Guest', status: 'Checked Out', details: 'Regular member, 2 stays', icon: UserIcon },
    
    // Bookings/Deals data
    { id: 'b1', type: 'booking', name: 'Booking #1234', category: 'Booking', status: 'Confirmed', details: 'John Smith, Room 101, Jan 15-18', icon: CalendarIcon },
    { id: 'b2', type: 'booking', name: 'Booking #5678', category: 'Booking', status: 'Pending', details: 'Emily Johnson, Room 205, Jan 20-22', icon: CalendarIcon },
    { id: 'b3', type: 'booking', name: 'Booking #9012', category: 'Booking', status: 'Completed', details: 'Michael Brown, Room 302, Jan 25-28', icon: CalendarIcon },
    { id: 'b4', type: 'booking', name: 'Booking #3456', category: 'Booking', status: 'Cancelled', details: 'Sarah Wilson, Room 108, Feb 1-3', icon: CalendarIcon },
    
    // Ratings data
    { id: 'rt1', type: 'rating', name: 'Rating by John Smith', category: 'Rating', status: 'Verified', details: '5 stars - Excellent service', icon: StarIcon },
    { id: 'rt2', type: 'rating', name: 'Rating by Emily Johnson', category: 'Rating', status: 'Pending', details: '4 stars - Comfortable room', icon: StarIcon },
    { id: 'rt3', type: 'rating', name: 'Rating by Michael Brown', category: 'Rating', status: 'Resolved', details: '3 stars - Good location', icon: StarIcon },
    { id: 'rt4', type: 'rating', name: 'Rating by Sarah Wilson', category: 'Rating', status: 'Verified', details: '5 stars - Perfect stay', icon: StarIcon },
  ], []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filteredResults = searchData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
    setShowResults(true);
  }, [searchTerm, searchData]);

  const handleSearchResultClick = (result) => {
    // Navigate to appropriate page based on type
    if (result.type === 'room') {
      navigate('/rooms');
    } else if (result.type === 'guest') {
      navigate('/guest');
    } else if (result.type === 'booking') {
      navigate('/deal');
    } else if (result.type === 'rating') {
      navigate('/rating');
    }
    
    setSearchTerm('');
    setShowResults(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'text-green-600 bg-green-100',
      'Occupied': 'text-red-600 bg-red-100',
      'Maintenance': 'text-yellow-600 bg-yellow-100',
      'Active': 'text-blue-600 bg-blue-100',
      'Checked Out': 'text-gray-600 bg-gray-100',
      'Confirmed': 'text-green-600 bg-green-100',
      'Pending': 'text-yellow-600 bg-yellow-100',
      'Completed': 'text-blue-600 bg-blue-100',
      'Cancelled': 'text-red-600 bg-red-100',
      'Verified': 'text-green-600 bg-green-100',
      'Resolved': 'text-blue-600 bg-blue-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-neutral-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo - left */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <BuildingOfficeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Abilio</h1>
            <p className="text-xs text-neutral-500 dark:text-gray-400">Luxury Stay</p>
          </div>
        </div>

        {/* Search Bar - center */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowResults(searchTerm.trim() !== '')}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              placeholder="Search rooms, guests, bookings, ratings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto z-[9999]">
                <div className="p-2">
                  {searchResults.map((result) => {
                    const IconComponent = result.icon;
                    return (
                      <div
                        key={result.id}
                        onClick={() => handleSearchResultClick(result)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            result.type === 'room' ? 'bg-blue-100' :
                            result.type === 'guest' ? 'bg-green-100' :
                            result.type === 'booking' ? 'bg-purple-100' :
                            'bg-yellow-100'
                          }`}>
                            <IconComponent className={`w-4 h-4 ${
                              result.type === 'room' ? 'text-blue-600' :
                              result.type === 'guest' ? 'text-green-600' :
                              result.type === 'booking' ? 'text-purple-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {result.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {result.details}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {result.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 p-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </div>
                </div>
              </div>
            )}
            
            {/* No Results Message */}
            {showResults && searchTerm.trim() !== '' && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 z-[9999]">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <div className="text-sm">No results found for "{searchTerm}"</div>
                  <div className="text-xs mt-1">Try searching for rooms, guests, bookings, or ratings</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Theme toggle and Mobile menu button - right */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="hidden lg:flex p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-800 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-neutral-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
