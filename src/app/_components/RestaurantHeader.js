'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const data = localStorage.getItem('restaurantUser');
      if (!data && pathname.startsWith('/pages/admin/dashboard')) {
        router.replace('/Auth/restaurant'); // Redirect to login
      } else if (data && pathname === '/Auth/restaurant') {
        router.replace('/pages/admin/dashboard'); // Redirect to dashboard
      } else if (data) {
        setDetails(JSON.parse(data)); // Parse user data
      }
    } catch (error) {
      console.error('Error parsing restaurantUser data:', error);
      localStorage.removeItem('restaurantUser'); // Clear invalid data
      router.replace('/Auth/restaurant');
    }
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem('restaurantUser');
    setDetails(null);
    router.replace('/Auth/restaurant');
  };

  return (
    <div className="flex justify-between px-4 py-2 items-center bg-gray-100 shadow-md">
      {/* Logo Section */}
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6x5Zxd92oZ7gsrERITihkX43ZjM6Cw-9CNiNfzFKWZJrOnH7X9su8Oujgm_gaApKApDI&usqp=CAU"
          alt="Restaurant Logo"
          className="w-20 h-20 rounded-full bg-cover"
        />
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="flex gap-4 text-lg font-semibold">
          <li className="hover:text-blue-400">
            <Link href="/">Home</Link>
          </li>
          {details && details.firstname ? (
            <>
              <li className="hover:text-blue-400">
                <Link href="/restaurant/dashboard">Profile</Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="hover:text-blue-400 text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-blue-400">
                <Link href="/restaurant">SignUp</Link>
              </li>
              <li className="hover:text-blue-400">
                <Link href="/restaurant/dashboard">Profile</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantHeader;
