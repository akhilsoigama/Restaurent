'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaChartPie, FaCog, FaHome, FaSignOutAlt, FaUser, FaTimes } from 'react-icons/fa';

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <aside
        className={`${sidebarOpen ? 'w-48' : 'w-16'
          } bg-gray-50 dark:bg-slate-950/30 text-gray-500 dark:text-white h-screen  transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2
            className={`font-bold text-lg transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'
              } whitespace-nowrap`}
          >
            My Dashboard
          </h2>
        </div>

        <nav className="mt-6 flex flex-1 flex-col justify-between">
          <ul>
            {[
              { href: '/pages/admin/dashboard', label: 'Home', icon: <FaHome /> },
              { href: '/pages/admin/dashboard/analytics', label: 'Analytics', icon: <FaChartPie /> },
              { href: '/pages/admin/dashboard/profile', label: 'Profile', icon: <FaUser /> },
              { href: '/pages/admin/dashboard/setting', label: 'Settings', icon: <FaCog /> },
              { href: '/Auth/restaurant', label: 'Logout', icon: <FaSignOutAlt /> },
            ].map((item, index) => (
              <li key={index} className="group">
                <Link
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-600/10 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span
                    className={`${sidebarOpen ? 'inline-block' : 'hidden'
                      } transition-all duration-300`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="p-4">
            <button
              className="transform bg-blue-600 dark:bg-slate-800 text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none shadow-md"
              onClick={toggleSidebar}
              title={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </aside>

    </>
  );
};

export default DashboardSidebar;
