// src/components/Requests.js
import React from 'react';

const Requests = ({ requestHistory = [] }) => {
    // Placeholder data
    const placeholderRequests = [
        { id: 1, type: 'Maintenance Request', date: '2024-09-01', status: 'Pending' },
        { id: 2, type: 'Tenant Inquiry', date: '2024-08-20', status: 'Completed' },
        { id: 3, type: 'Lease Renewal', date: '2024-07-15', status: 'In Progress' }
    ];

    // Use placeholder data if requestHistory is empty
    const displayRequests = requestHistory.length > 0 ? requestHistory : placeholderRequests;

    return (
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Request History</h2>
            <ul>
                {displayRequests.map((request) => (
                    <li key={request.id} className="border-b border-gray-300 py-2">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-800">{request.type}</span>
                            <span className="text-gray-600">{request.date}</span>
                        </div>
                        <div className="text-gray-700">{request.status}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Requests;
