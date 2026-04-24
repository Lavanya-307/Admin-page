import React, { useState, useEffect } from 'react';
import { 
  TagIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const sampleDeals = [
    {
        id: 1,
        title: "Weekend Getaway",
        discount: "20%",
        discountType: "percentage",
        minimumNights: 2,
        expiryDate: "2026-5-31",
        isActive: true,
        timesUsed: 45,
        maxUses: 100,
        tagline: "Perfect for weekend stays"
    },
    {
        id: 2,
        title: "Early Bird Special",
        discount: "$50",
        discountType: "fixed",
        minimumNights: 3,
        expiryDate: "2026-04-30",
        isActive: true,
        timesUsed: 32,
        maxUses: 50,
        tagline: "Book 7 days in advance"
    },
    {
        id: 3,
        title: "Summer Vacation",
        discount: "15%",
        discountType: "percentage",
        minimumNights: 5,
        expiryDate: "2026-02-30",
        isActive: false,
        timesUsed: 78,
        maxUses: 100,
        tagline: "Summer special offer"
    },
    {
        id: 4,
        title: "Business Package",
        discount: "10%",
        discountType: "percentage",
        minimumNights: 1,
        expiryDate: "2024-06-01",
        isActive: true,
        timesUsed: 12,
        maxUses: 30,
        tagline: "For business travelers"
    }
];

function Deal() {
    const [deals, setDeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleCardClick = (cardId) => {
        // Navigate to relevant section based on card clicked
        switch(cardId) {
            case 'active-deals':
                // Scroll to active deals in table
                const activeDealElement = document.querySelector('table tbody tr:first-child');
                if (activeDealElement) {
                    activeDealElement.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'total-revenue':
                // Filter to show revenue-generating deals only
                setSearchQuery('active');
                break;
            case 'redeemed-today':
                // Sort deals by most used
                setDeals(prev => [...prev].sort((a, b) => b.timesUsed - a.timesUsed));
                break;
            case 'expiring-soon':
                // Filter to show expiring deals only
                setSearchQuery('expiring');
                break;
            default:
                // Default action - scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    };

    const getDashboardStats = () => {
        const activeDeals = deals.filter(deal => deal.isActive).length;
        const expiredDeals = deals.filter(deal => !deal.isActive).length;
        const totalRevenue = deals
            .filter(deal => deal.isActive)
            .reduce((sum, deal) => {
                if (deal.discountType === 'fixed') {
                    return sum + (deal.timesUsed * parseInt(deal.discount.replace('$', '')));
                } else {
                    return sum + (deal.timesUsed * 100); // Assume avg room price $100 for percentage discounts
                }
            }, 0);
        const todayRedemptions = Math.floor(deals.reduce((sum, deal) => sum + deal.timesUsed, 0) / deals.length);
        const expiringDeals = deals.filter(deal => {
            const expiryDate = new Date(deal.expiryDate);
            const today = new Date();
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
        }).length;

        return [
            {
                id: 'active-deals',
                label: "Active Deals",
                count: activeDeals.toString(),
                icon: TagIcon,
                theme: "blue"
            },
            {
                id: 'total-revenue',
                label: "Total Revenue",
                count: `$${totalRevenue.toLocaleString()}`,
                icon: CurrencyDollarIcon,
                theme: "green"
            },
            {
                id: 'redeemed-today',
                label: "Redeemed Today",
                count: todayRedemptions.toString(),
                icon: CheckCircleIcon,
                theme: "emerald"
            },
            {
                id: 'expiring-soon',
                label: "Expiring Soon",
                count: expiringDeals.toString(),
                icon: CalendarIcon,
                theme: "orange"
            },
            {
                id: 'expired-deals',
                label: "Expired Deals",
                count: expiredDeals.toString(),
                icon: XCircleIcon,
                theme: "red"
            }
        ];
    };

    const dashboardStats = getDashboardStats();

    
    useEffect(() => {
        setDeals(sampleDeals);
    }, []);

    const getFilteredDeals = () => {
        if (!searchQuery.trim()) return deals;
        
        const query = searchQuery.toLowerCase();
        return deals.filter(deal => 
            deal.title.toLowerCase().includes(query) ||
            deal.tagline.toLowerCase().includes(query)
        );
    };

    const filteredDeals = getFilteredDeals();

    const getStatusStyles = (isActive) => {
        return isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800';
    };

    const getStatusIcon = (isActive) => {
        return isActive ? CheckCircleIcon : XCircleIcon;
    };

    const getThemeColors = (theme) => {
        const themes = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
            green: { bg: 'bg-green-50', text: 'text-green-600' },
            emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
            orange: { bg: 'bg-orange-50', text: 'text-orange-600' }
        };
        return themes[theme] || themes.blue;
    };

    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deals & Offers</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your hotel's special offers and promotional deals</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat) => {
                    const Icon = stat.icon;
                    const colors = getThemeColors(stat.theme);
                    return (
                        <div 
                            key={stat.id} 
                            className={`${colors.bg} dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-105`}
                            onClick={() => handleCardClick(stat.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.count}</p>
                                </div>
                                <div className="p-3 rounded-full bg-white dark:bg-gray-700">
                                    <Icon className={`w-6 h-6 ${colors.text}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex-1 w-full sm:max-w-md">
                        <input
                            type="text"
                            placeholder="Search deals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add New Deal
                    </button>
                </div>
            </section>

            <main className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Deals</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Deal
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Discount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Minimum Stay
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Expires
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Used
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredDeals.map((deal) => {
                                const StatusIcon = getStatusIcon(deal.isActive);
                                const usagePercentage = (deal.timesUsed / deal.maxUses) * 100;
                                
                                return (
                                    <tr key={deal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{deal.title}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{deal.tagline}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {deal.discountType === 'percentage' ? deal.discount : `$${deal.discount}`}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {deal.minimumNights} nights
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {deal.expiryDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm text-gray-900 dark:text-white">{deal.timesUsed}/{deal.maxUses}</div>
                                                <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-500 h-2 rounded-full" 
                                                        style={{ width: `${usagePercentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(deal.isActive)}`}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {deal.isActive ? 'active' : 'expired'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Deal</h3>
                            <p className="text-sm text-gray-500 mb-4">Deal creation form would go here</p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save Deal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Deal;
