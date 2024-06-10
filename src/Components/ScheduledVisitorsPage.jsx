import React from 'react';

const visits = [
  { date: 'Tue May 7', time: '11:30 AM', name: 'Ayodele Damilare', org: 'Truck Central', type: 'Personal' },
  { date: 'Fri May 17', time: '1:00 PM', name: 'Olika Ashley', org: 'Afe Babalola University', type: 'Excursion' },
  { date: 'Mon May 13', time: '10:00 AM', name: 'Makplang Vem', org: 'Covenant University', type: 'Official' },
];

function ScheduledVisitorsPage() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Scheduled Visits</h2>
      <ul>
        {visits.map((visit, index) => (
          <li key={index} className="mb-4 border-b pb-4">
            <div className="flex justify-between">
              <div>
                <div className="text-gray-600">{visit.date} • {visit.time}</div>
                <div className="font-bold">{visit.name}</div>
                <div className="text-gray-500">{visit.org} • {visit.type}</div>
              </div>
              <div>
                <button className="text-gray-500">⋮</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Schedule a visit</button>
    </div>
  );
}

export default ScheduledVisitorsPage;
