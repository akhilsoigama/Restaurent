import React from 'react';
import DashboardSidebar from '../DashboardSidebar';
import DashboardHeader from '../DashboardHeader';
import Settings from './Setting';

const page = () => {

    return (

        <div className='flex w-full dark:bg-slate-950 min-h-screen'>
            <div className='w-38'>
                <DashboardSidebar /></div>
            <div className='w-full flex flex-col '>
                <DashboardHeader />
                <Settings/>
            </div>
        </div>

    );
};

export default page;
