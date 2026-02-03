import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout() {
    return (
        <div className='min-h-screen flex bg-gray-100'>
            <AdminSidebar />
            <main className='flex flex-1 p-6'>
                <div className='w-full'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}