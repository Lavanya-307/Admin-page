import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  UserCircleIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <Bars3Icon className="w-6 h-6 text-neutral-700" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
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
      </div>
    </header>
  );
}

export default Navbar;
