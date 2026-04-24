import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  Bars3Icon,
  BuildingOfficeIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ onMenuClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();

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
            <p className="text-xs text-neutral-500 dark:text-gray-400">Luxury Stay Admin</p>
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
              placeholder="Search rooms, guests, bookings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
