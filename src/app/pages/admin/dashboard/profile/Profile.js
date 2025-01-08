'use client'
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [initial, setInitial] = useState()
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        gender: '',
        avatar: 'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg',
    });

    useEffect(() => {
        const data = localStorage.getItem('restaurantUser');
        if (data) {
            const userData = JSON.parse(data);
            setUser(userData);
            setUserData(userData);
            const firstname = userData.firstname || '';
            setInitial(firstname.charAt(0).toUpperCase());

        }
    }, []);

    const handleEditToggle = () => setIsEditing((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUserData((prev) => ({ ...prev, avatar: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem('restaurantUser', JSON.stringify(userData));
        setUser(userData);
        setIsEditing(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full  bg-gray-100 dark:bg-slate-950 flex justify-center py-8">
            <div className="w-full max-w-3xl bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
                <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 p-8">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div
                                className={`size-20  rounded-full flex items-center justify-center dark:bg-gray-700 bg-green-700 cursor-pointer text-white font-bold text-xl`}
                                style={{
                                    backgroundImage: userData.avatar ? `url(${userData.avatar})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {!userData.avatar && initial}
                            </div>
                            <div>
                                {isEditing ? (
                                    <>
                                        <input type="text" name="firstname" value={userData.firstname} onChange={handleInputChange}
                                            className="bg-transparent text-3xl font-semibold text-white"
                                        />
                                        <input type="text" name="lastname" value={userData.lastname} onChange={handleInputChange}
                                            className="bg-transparent text-3xl font-semibold text-white mt-2"
                                        />
                                    </>
                                ) : (
                                    <h1 className="text-3xl font-semibold text-white">
                                        {userData.firstname} {userData.lastname}
                                    </h1>
                                )}
                            </div>
                        </div>
                        <div>
                            <button onClick={handleEditToggle} className="text-white bg-indigo-600 py-2 px-6 rounded-md hover:bg-indigo-500 transition duration-300"
                            >{isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Personal Information</h2>
                    <div className="mt-6 space-y-4">
                        {isEditing ? (
                            <>
                                <div className="flex justify-between">
                                    <label className="font-semibold text-gray-600 dark:text-gray-400">
                                        Email:
                                        <input type="email" name="email" value={userData.email} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b-2 border-gray-400 p-2 mt-1"
                                        />
                                    </label>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-semibold text-gray-600 dark:text-gray-400">
                                        Phone:
                                        <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b-2 border-gray-400 p-2 mt-1"
                                        />
                                    </label>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-semibold text-gray-600 dark:text-gray-400">
                                        Gender:
                                        <select
                                            name="gender" value={userData.gender} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b-2 border-gray-400 p-2 mt-1"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-semibold text-gray-600 dark:text-gray-400">
                                        Profile Picture:
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 mt-1" />
                                    </label>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button onClick={handleSave} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition"
                                    >Save Changes
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-600 dark:text-gray-400">Email: {userData.email}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-600 dark:text-gray-400">Phone: {userData.mobile}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-600 dark:text-gray-400">Gender: {userData.gender}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
