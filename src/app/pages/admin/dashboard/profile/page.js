import React from 'react';
import Profile from './Profile';
import DashboardSidebar from '../DashboardSidebar';
import DashboardHeader from '../DashboardHeader';

const page = () => {

    return (

        <div className='flex w-full dark:bg-slate-950 min-h-screen'>
            <div className='w-38'>
                <DashboardSidebar /></div>
            <div className='w-full flex flex-col '>
                <DashboardHeader />
                <Profile />
            </div>
        </div>

    );
};

export default page;
