import React from 'react';
import { useAuth } from '../context/AuthContext';
import { icons } from './icons';

const Sidebar = ({ page, setPage, setEditingJob, isSidebarOpen, setIsSidebarOpen }) => {
    const { user, logout } = useAuth();

    const NavLink = ({ id, icon, children }) => (
        <button
            onClick={() => {
                setPage(id);
                if (id === 'add') setEditingJob(null);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${page === id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            <span className="mr-3">{icon}</span>
            {children}
        </button>
    );

    return (
        <aside className={`bg-white text-gray-800 w-64 fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 shadow-lg md:shadow-none`}>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-600">JobTrack AI</h1>
                {user && <span className="text-sm text-gray-500 truncate block" title={user.name}>Welcome, {user.name}</span>}
            </div>
            <nav className="flex-grow px-4">
                <NavLink id="dashboard" icon={icons.dashboard}>Dashboard</NavLink>
                <NavLink id="jobs" icon={icons.jobs}>My Jobs</NavLink>
                <NavLink id="add" icon={icons.add}>Add Job</NavLink>
            </nav>
            <div className="absolute bottom-0 w-full p-4">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-left text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
                >
                    <span className="mr-3">{icons.logout}</span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
