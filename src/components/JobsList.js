import React from 'react';
import { icons } from './icons';

const JobsList = ({ jobs, setEditingJob, setPage, deleteJob, setAiJob }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Interviewing': return 'bg-yellow-100 text-yellow-800';
            case 'Offer': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Applied': return 'bg-blue-100 text-blue-800';
            case 'Wishlist': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (jobs.length === 0) {
        return (
            <div className="text-center text-gray-500 p-10">
                <h2 className="text-2xl font-semibold mb-2">No Jobs Found</h2>
                <p>Click "Add Job" to start tracking your applications.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Job Applications</h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Company</th>
                            <th className="p-4 font-semibold text-gray-600">Position</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Date Applied</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {jobs.map(job => (
                            <tr key={job._id} className="hover:bg-gray-50">
                                <td className="p-4 text-gray-800 font-medium">{job.company}</td>
                                <td className="p-4 text-gray-600">{job.position}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(job.status)}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600">{job.dateApplied ? new Date(job.dateApplied).toLocaleDateString() : 'N/A'}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => { setEditingJob(job); setPage('add'); }} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full">{icons.edit}</button>
                                        <button onClick={() => deleteJob(job._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full">{icons.delete}</button>
                                        <button onClick={() => setAiJob(job)} className="p-2 text-purple-500 hover:bg-purple-100 rounded-full" title="AI Assistant">{icons.ai}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobsList;

