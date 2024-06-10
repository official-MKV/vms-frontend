import React from 'react';
import { Link } from 'react-router-dom';

const requests = [
  { name: 'Makplang Vem', date: 'Monday, May 6', time: '10:00 AM', org: 'Covenant University', type: 'Official', gender: 'Male', email: 'makplangvem666@gmail.com' },
  { name: 'Ifeoma Abajogu', date: 'Friday, May 10', time: '1:00 PM', org: 'Baze University', type: 'Official', gender: 'Female', email: 'ifeomaabajogu@gmail.com' },
];

function VisitorRequests() {
  return (
    <div className="relative w-full bg-[#F6F8FB] p-4 rounded shadow mb-4">
      <h2 className="relative w-full text-xl font-bold mb-4">Visitors Request</h2>
      <div className='w-full relative flex flex-wrap gap-5  '> 
      {requests.map((request, index) => (
        <div key={index} className="bg-[white] w-[280px] mb-4 border px-[20px] py-[10px] rounded-[10px] pb-4">
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

      </div>
       
      <Link to="/visitor-requests" className="text-blue-500">View All</Link>
    </div>
  );
}

export default VisitorRequests;
