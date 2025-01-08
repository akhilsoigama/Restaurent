'use client';
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import DashboardHeader from '../DashboardHeader';
import DashboardSidebar from '../DashboardSidebar';
import Dashboard from '../page';

const Analytics = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            chart: {
                id: 'basic-line',
                type: 'line',
                height: 400,
                toolbar: {
                    show: true,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            title: {
                text: 'Sales Over Time',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333',
                },
            },
            colors: ['#008FFB'],
            series: [
                {
                    name: 'Sales',
                    data: [30, 40, 35, 50, 49, 60],
                },
            ],
        };

        const chart = new ApexCharts(chartRef.current, options);

        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <>
        <div className='flex w-full '>
        <div className='w-38'>
          <DashboardSidebar /></div>
        <div className='w-full flex flex-col '>
          <DashboardHeader />
            <div className="analytics-container mx-4 bg-white dark:bg-slate-950 dark:text-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center dark:text-white text-gray-700">
                    Analytics Dashboard
                </h1>
                <div className="chart-container dark:text-gray-50 mx-auto" ref={chartRef} />
            </div>
        </div>
      </div>
        </>

    );
};

export default Analytics;
