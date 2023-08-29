'use client';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className='flex min-h-screen flex-col items-center p-24'>
        <h1>Dashboard</h1>
        <p>This is the dashboard page</p>
      </div>
    </>
  );
};

export default Dashboard;
