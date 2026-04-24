import { 
  HomeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getRoomStats } from "../data/roomData";

const Dashboard = () => {
    const navigate = useNavigate();
    const roomStats = getRoomStats();
    
    const dashboardStats = [
        {
            id: 1,
            label: "Total Rooms",
            count: roomStats.totalRooms.toString(),
            icon: HomeIcon,
            iconBg: "bg-blue-500",
            cardBg: "bg-blue-50",
            iconColor: "text-blue-600",
            navigateTo: "/rooms"
        },
        {
            id: 2,
            label: "Occupied Rooms",
            count: roomStats.occupiedRooms.toString(),
            icon: UserGroupIcon,
            iconBg: "bg-green-500",
            cardBg: "bg-green-50",
            iconColor: "text-green-600",
            navigateTo: "/guest"
        },
        {
            id: 3,
            label: "Available Rooms",
            count: roomStats.availableRooms.toString(),
            icon: HomeIcon,
            iconBg: "bg-orange-500",
            cardBg: "bg-orange-50",
            iconColor: "text-orange-600",
            navigateTo: "/rooms"
        },
        {
            id: 4,
            label: "Today's Check-ins",
            count: "2",
            icon: CheckCircleIcon,
            iconBg: "bg-purple-500",
            cardBg: "bg-purple-50",
            iconColor: "text-purple-600",
            navigateTo: "/guest"
        },
        {
            id: 5,
            label: "Today's Check-outs",
            count: "1",
            icon: ArrowRightOnRectangleIcon,
            iconBg: "bg-red-500",
            cardBg: "bg-red-50",
            iconColor: "text-red-600",
            navigateTo: "/guest"
        },
        {
            id: 6,
            label: "Revenue Today",
            count: `Rs.${roomStats.totalRevenue}`,
            icon: CurrencyDollarIcon,
            iconBg: "bg-emerald-500",
            cardBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            navigateTo: "/deal"
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome to Abilio Luxury Stay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardStats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div 
                            key={stat.id} 
                            className={`${stat.cardBg} dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-105`}
                            onClick={() => navigate(stat.navigateTo)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.count}</p>
                                </div>
                                <div className={`p-3 rounded-full bg-white dark:bg-gray-700`}>
                                    <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">New booking received</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">2 mins ago</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Guest checked out</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">15 mins ago</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Room cleaned</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">1 hour ago</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{roomStats.occupancyRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${roomStats.occupancyRate}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Daily Revenue Goal</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">61%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '61%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
