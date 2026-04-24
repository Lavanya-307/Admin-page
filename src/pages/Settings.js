import React, { useState } from 'react';
import { 
  CogIcon,
  BellIcon,
  UserIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        // General Settings
        hotelName: 'Abilio Luxury Stay',
        hotelAddress: 'Jain Durga capital Park,Hyderabad',
        hotelPhone:'+916281285669',
        hotelEmail: 'abiliostay@gmail.com',
        currency: 'Indian',
        language: 'Telugu',
        timezone: 'Asian/kolkata',
        
        // Notification Settings
        emailNotifications: true,
        smsNotifications: false,
        bookingAlerts: true,
        paymentAlerts: true,
        reviewAlerts: true,
        maintenanceAlerts: false,
        
        // User Settings
        username: 'admin',
        email: 'admin@grandhotel.com',
        role: 'Administrator',
        twoFactorAuth: false,
        
        // System Settings
        autoBackup: true,
        backupFrequency: 'daily',
        dataRetention: '365',
        maintenanceMode: false,
        debugMode: false,
        
        // Payment Settings
        paymentGateway: 'stripe',
        acceptCreditCards: true,
        acceptPayPal: true,
        acceptBankTransfer: false,
        
        // Security Settings
        sessionTimeout: '30',
        passwordExpiry: '90',
        maxLoginAttempts: '5',
        ipWhitelist: ''
    });

    const [saveStatus, setSaveStatus] = useState('');

    const handleInputChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field) => {
        setSettings(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSave = () => {
        setSaveStatus('Saving...');
        setTimeout(() => {
            setSaveStatus('Settings saved successfully!');
            setTimeout(() => setSaveStatus(''), 3000);
        }, 1000);
    };

    const tabs = [
        { id: 'general', name: 'General', icon: CogIcon },
        { id: 'notifications', name: 'Notifications', icon: BellIcon },
        { id: 'account', name: 'Account', icon: UserIcon },
        { id: 'system', name: 'System', icon: ComputerDesktopIcon },
        { id: 'payment', name: 'Payment', icon: CreditCardIcon },
        { id: 'security', name: 'Security', icon: ShieldCheckIcon }
    ];

    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your hotel administration preferences and configurations</p>
            </header>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                                }`}
                            >
                                <Icon className="mr-2 h-5 w-5" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Save Status */}
            {saveStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                    saveStatus.includes('success') 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                }`}>
                    {saveStatus}
                </div>
            )}

            {/* General Settings */}
            {activeTab === 'general' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hotel Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hotel Name</label>
                                <input
                                    type="text"
                                    value={settings.hotelName}
                                    onChange={(e) => handleInputChange('general', 'hotelName', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={settings.hotelPhone}
                                    onChange={(e) => handleInputChange('general', 'hotelPhone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={settings.hotelAddress}
                                    onChange={(e) => handleInputChange('general', 'hotelAddress', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={settings.hotelEmail}
                                    onChange={(e) => handleInputChange('general', 'hotelEmail', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                                <select
                                    value={settings.currency}
                                    onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                <select
                                    value={settings.language}
                                    onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>
                                    <option value="telugu">Telugu</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                                <select
                                    value={settings.timezone}
                                    onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="America/New_York">Eastern Time</option>
                                    <option value="America/Chicago">Central Time</option>
                                    <option value="America/Denver">Mountain Time</option>
                                    <option value="America/Los_Angeles">Pacific Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('emailNotifications')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('smsNotifications')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Booking Alerts</h3>
                                    <p className="text-sm text-gray-500">Get notified about new bookings</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('bookingAlerts')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.bookingAlerts ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.bookingAlerts ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Payment Alerts</h3>
                                    <p className="text-sm text-gray-500">Get notified about payment activities</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('paymentAlerts')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.paymentAlerts ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.paymentAlerts ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Review Alerts</h3>
                                    <p className="text-sm text-gray-500">Get notified about new reviews</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('reviewAlerts')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.reviewAlerts ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.reviewAlerts ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Maintenance Alerts</h3>
                                    <p className="text-sm text-gray-500">Get notified about maintenance issues</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('maintenanceAlerts')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.maintenanceAlerts ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.maintenanceAlerts ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Account</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={settings.username}
                                    onChange={(e) => handleInputChange('account', 'username', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => handleInputChange('account', 'email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                                <select
                                    value={settings.role}
                                    onChange={(e) => handleInputChange('account', 'role', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Administrator">Administrator</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('twoFactorAuth')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Auto Backup</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup system data</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('autoBackup')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.autoBackup ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Backup Frequency</label>
                                <select
                                    value={settings.backupFrequency}
                                    onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Retention (days)</label>
                                <input
                                    type="number"
                                    value={settings.dataRetention}
                                    onChange={(e) => handleInputChange('system', 'dataRetention', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily disable the system</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('maintenanceMode')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Debug Mode</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable debug logging</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('debugMode')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.debugMode ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.debugMode ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Gateway</label>
                                <select
                                    value={settings.paymentGateway}
                                    onChange={(e) => handleInputChange('payment', 'paymentGateway', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="stripe">Stripe</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="square">Square</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Accept Credit Cards</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable credit card payments</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('acceptCreditCards')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.acceptCreditCards ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.acceptCreditCards ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Accept PayPal</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable PayPal payments</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('acceptPayPal')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.acceptPayPal ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.acceptPayPal ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Accept Bank Transfer</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable bank transfer payments</p>
                                </div>
                                <button
                                    onClick={() => handleCheckboxChange('acceptBankTransfer')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                        settings.acceptBankTransfer ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            settings.acceptBankTransfer ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Timeout (minutes)</label>
                                <input
                                    type="number"
                                    value={settings.sessionTimeout}
                                    onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password Expiry (days)</label>
                                <input
                                    type="number"
                                    value={settings.passwordExpiry}
                                    onChange={(e) => handleInputChange('security', 'passwordExpiry', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Login Attempts</label>
                                <input
                                    type="number"
                                    value={settings.maxLoginAttempts}
                                    onChange={(e) => handleInputChange('security', 'maxLoginAttempts', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IP Whitelist (comma separated)</label>
                                <input
                                    type="text"
                                    value={settings.ipWhitelist}
                                    onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.value)}
                                    placeholder="192.168.1.1, 10.0.0.1"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
}

export default Settings;
