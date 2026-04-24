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

const Sidebar = () => {
  const currentPath = useLocation();

  const navigationMenu = [
    { path: "/", label: "Dashboard", icon: HomeIcon },
    { path: "/guest", label: "Guests", icon: UserGroupIcon },
    { path: "/rooms", label: "Rooms", icon: BuildingOfficeIcon },
    { path: "/deal", label: "Deals", icon: TagIcon },
    { path: "/Ratings", label: "Ratings", icon: StarIcon },
    { path: "/Settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationMenu.map((menuItem) => {
          const isActive = currentPath.pathname === menuItem.path;
          const IconComponent = menuItem.icon;
          
          return (
            <Link
              key={menuItem.path}
              to={menuItem.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              <span>{menuItem.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 dark:border-gray-700">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;