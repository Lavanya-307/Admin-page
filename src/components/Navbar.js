import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  Bars3Icon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo - left */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <BuildingOfficeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Abilio</h1>
            <p className="text-xs text-neutral-500">Luxury Stay Admin</p>
          </div>
        </div>

        {/* Search Bar - center */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms, guests, bookings..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Mobile menu button - right */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <Bars3Icon className="w-6 h-6 text-neutral-700" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
