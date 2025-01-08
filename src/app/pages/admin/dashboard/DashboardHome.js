'use client';
import React from 'react';
import { FaChartPie, FaUsers, FaDollarSign, FaTasks, FaBell } from 'react-icons/fa';
import ShineBorder from '@/components/ui/shine-border';

const DashboardHome = () => {
    const stats = [
        { id: 1, title: 'Total Revenue', value: '$120,456', icon: <FaDollarSign />,},
        { id: 2, title: 'New Users', value: '3,456', icon: <FaUsers />,  },
        { id: 3, title: 'Active Tasks', value: '12', icon: <FaTasks />, },
    ];

    return (
        <div className="w-full h-full bg-gray-100 dark:bg-slate-950 text-white">
            <main className=" m-4 md:p-6">
                <div className="flex justify-between flex-wrap gap-6 mb-6">
                    {stats.map((stat) => (
                        <ShineBorder
                            key={stat.id}
                            className={`flex items-center gap-4 p-4 rounded-lg shadow-lg `}
                            color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                        >
                            <div className="text-3xl">{stat.icon}</div>
                            <div className='w-full'>
                                <p className="text-lg font-semibold">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </ShineBorder>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6 dark:bg-gray-900 rounded-lg shadow-md shadow-slate-800/30">
                        <h2 className="text-xl text-black dark:text-gray-100 font-bold mb-4">Revenue Overview</h2>
                        <div className="h-64 bg-gray-600 rounded-lg flex items-center justify-center dark:text-gray-300">
                            [Insert Chart Here]
                        </div>
                    </div>

                    <div className="p-6 dark:bg-slate-900 dark:text-gray-100 rounded-lg shadow-lg">
                        <h2 className="text-xl text-rose-700  dark:text-gray-100 font-bold mb-4">Recent Activities</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <FaChartPie className="text-white" />
                                </div>
                                <p className='text-blue-600  dark:text-gray-100 font-semibold'>User John completed a purchase.</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10  bg-green-500 rounded-full flex items-center justify-center">
                                    <FaUsers className="text-white" />
                                </div>
                                <p className='text-green-600  dark:text-gray-100 font-semibold'>3 new users registered today.</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <FaTasks className="text-white" />
                                </div>
                                <p className='text-yellow-500  dark:text-gray-100 font-semibold'>You have 2 pending tasks.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardHome;
