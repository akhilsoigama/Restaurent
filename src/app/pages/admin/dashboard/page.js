import DashboardHeader from './DashboardHeader';
import DashboardHome from './DashboardHome';
import DashboardSidebar from './DashboardSidebar';

const Dashboard = () => {

  return (
    <div className="relative flex min-w-full min-h-screen bg-gray-100 dark:bg-slate-950 transition duration-300">
      <div className='flex w-full'>
        <div className='w-38'>
          <DashboardSidebar /></div>
        <div className='w-full flex flex-col '>
          <DashboardHeader />
          <DashboardHome/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
