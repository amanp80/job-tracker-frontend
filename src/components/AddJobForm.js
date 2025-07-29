import React, { useState, useEffect } from 'react';

const AddJobForm = ({ editingJob, setPage, addJob, updateJob }) => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'Wishlist',
        dateApplied: '',
        jobDescription: '',
        notes: ''
    });

    useEffect(() => {
        if (editingJob) {
            setFormData({
                company: editingJob.company || '',
                position: editingJob.position || '',
                status: editingJob.status || 'Wishlist',
                dateApplied: editingJob.dateApplied ? new Date(editingJob.dateApplied).toISOString().split('T')[0] : '',
                jobDescription: editingJob.jobDescription || '',
                notes: editingJob.notes || ''
            });
        } else {
            setFormData({ company: '', position: '', status: 'Wishlist', dateApplied: '', jobDescription: '', notes: '' });
        }
    }, [editingJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingJob) {
            await updateJob(editingJob._id, formData);
        } else {
            await addJob(formData);
        }
        setPage('jobs');
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="company">Company</label>
                        <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="position">Position</label>
                        <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">Status</label>
                        <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Wishlist</option>
                            <option>Applied</option>
                            <option>Interviewing</option>
                            <option>Offer</option>
                            <option>Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="dateApplied">Date Applied</label>
                        <input type="date" name="dateApplied" id="dateApplied" value={formData.dateApplied} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="jobDescription">Job Description</label>
                        <textarea name="jobDescription" id="jobDescription" rows="5" value={formData.jobDescription} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="notes">Notes</label>
                        <textarea name="notes" id="notes" rows="5" value={formData.notes} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button type="button" onClick={() => setPage('jobs')} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingJob ? 'Update' : 'Save'}</button>
                </div>
            </form>
        </div>
    );
};

export default AddJobForm;

