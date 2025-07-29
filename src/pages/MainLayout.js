import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { icons } from '../components/icons';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import JobsList from '../components/JobsList';
import AddJobForm from '../components/AddJobForm';
import AIAssistantModal from '../components/AIAssistantModal';
import Spinner from '../components/Spinner';

const MainLayout = () => {
    const [page, setPage] = useState('dashboard');
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [aiJob, setAiJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchJobs = async () => {
        try {
            setError('');
            setIsLoading(true);
            const { data } = await api.get('/jobs');
            setJobs(data.jobs);
        } catch (err) {
            setError('Could not fetch jobs. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const addJob = async (jobData) => {
        await api.post('/jobs', jobData);
        fetchJobs(); // Refetch jobs to update the list
    };

    const updateJob = async (id, updatedData) => {
        await api.patch(`/jobs/${id}`, updatedData);
        fetchJobs();
    };

    const deleteJob = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job application?")) return;
        await api.delete(`/jobs/${id}`);
        fetchJobs();
    };

    const renderPage = () => {
        if (isLoading) return <div className="flex justify-center items-center h-full"><Spinner /></div>;
        if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

        switch (page) {
            case 'dashboard': return <Dashboard jobs={jobs} />;
            case 'jobs': return <JobsList jobs={jobs} setEditingJob={setEditingJob} setPage={setPage} deleteJob={deleteJob} setAiJob={setAiJob} />;
            case 'add': return <AddJobForm editingJob={editingJob} setPage={setPage} addJob={addJob} updateJob={updateJob} />;
            default: return <Dashboard jobs={jobs} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar page={page} setPage={setPage} setEditingJob={setEditingJob} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
                <header className="md:hidden flex justify-between items-center bg-white p-4 shadow-md">
                    <h1 className="text-xl font-bold text-blue-600">JobTrack AI</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {icons.menu}
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
            {aiJob && <AIAssistantModal job={aiJob} onClose={() => setAiJob(null)} />}
        </div>
    );
};

export default MainLayout;
