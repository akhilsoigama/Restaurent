'use client'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        darkMode: false,

    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setSettings((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setSettings((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = () => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
        toast.success('Settings saved successfully');
    };

    return (
        <div className="w-full  bg-gray-100 dark:bg-slate-950 flex justify-center py-8">
            <div className="w-full max-w-3xl bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                <div className="p-8 bg-gradient-to-r from-indigo-600 to-blue-500">
                    <h2 className="text-3xl font-semibold text-white">Settings</h2>
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Account Settings</h3>
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-gray-600 dark:text-gray-400">Email Notifications</label>
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleInputChange}
                                className="bg-transparent border-gray-400 rounded p-2"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="font-semibold text-gray-600 dark:text-gray-400">Dark Mode</label>
                            <input
                                type="checkbox"
                                name="darkMode"
                                checked={settings.darkMode}
                                onChange={handleInputChange}
                                className="bg-transparent border-gray-400 rounded p-2"
                            />
                        </div>

                    </div>
                </div>

                <div className="flex justify-end p-6">
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
