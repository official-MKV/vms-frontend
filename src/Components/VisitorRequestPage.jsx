import React from 'react';

const requests = [
  { name: 'Makplang Vem', date: 'Monday, May 6', time: '10:00 AM', org: 'Covenant University', type: 'Official', gender: 'Male', email: 'makplangvem666@gmail.com' },
  { name: 'Ifeoma Abajogu', date: 'Friday, May 10', time: '1:00 PM', org: 'Baze University', type: 'Official', gender: 'Female', email: 'ifeomaabajogu@gmail.com' },
];

function VisitorRequestsPage() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Visitor Requests</h2>
      {requests.map((request, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <div className="mb-2 font-bold">{request.name}</div>
          <div className="text-gray-600">{request.date} • {request.time}</div>
          <div className="text-gray-500">{request.org} • {request.type}</div>
          <div className="text-gray-500">Gender: {request.gender}</div>
          <div className="text-gray-500">Email: {request.email}</div>
          <div className="flex mt-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Approve</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Decline</button>
          </div>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Schedule a visit</button>
    </div>
  );
}

export default VisitorRequestsPage;
