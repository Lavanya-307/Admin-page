import { Link, useLocation } from "react-router-dom";
import { 
  HomeIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  TagIcon, 
  StarIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: HomeIcon },
    { path: "/guest", label: "Guests", icon: UserGroupIcon },
    { path: "/rooms", label: "Rooms", icon: BuildingOfficeIcon },
    { path: "/deal", label: "Deals", icon: TagIcon },
    { path: "/Ratings", label: "Ratings", icon: StarIcon },
    { path: "/Settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <button className="sidebar-item w-full text-red-600 hover:bg-red-50">
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;