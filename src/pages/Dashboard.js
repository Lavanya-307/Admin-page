import { 
  HomeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

function Dashboard() {
    const stats = [
        {
            id: 1,
            title: "Total Rooms",
            value: "25",
            icon: HomeIcon,
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            id: 2,
            title: "Occupied Rooms",
            value: "18",
            icon: UserGroupIcon,
            color: "bg-green-500",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            id: 3,
            title: "Available Rooms",
            value: "7",
            icon: HomeIcon,
            color: "bg-orange-500",
            bgColor: "bg-orange-50",
            textColor: "text-orange-600"
        },
        {
            id: 4,
            title: "Today's Check-ins",
            value: "5",
            icon: CheckCircleIcon,
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
        },
        {
            id: 5,
            title: "Today's Check-outs",
            value: "3",
            icon: ArrowRightOnRectangleIcon,
            color: "bg-red-500",
            bgColor: "bg-red-50",
            textColor: "text-red-600"
        },
        {
            id: 6,
            title: "Revenue Today",
            value: "$2,450",
            icon: CurrencyDollarIcon,
            color: "bg-emerald-500",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-600"
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your hotel today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.id} className={`${stat.bgColor} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full bg-white`}>
                                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">New booking received</span>
                            <span className="text-xs text-gray-400">2 mins ago</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Guest checked out</span>
                            <span className="text-xs text-gray-400">15 mins ago</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-600">Room cleaned</span>
                            <span className="text-xs text-gray-400">1 hour ago</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">Occupancy Rate</span>
                                <span className="text-sm font-medium text-gray-900">72%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">Daily Revenue Goal</span>
                                <span className="text-sm font-medium text-gray-900">61%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
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
