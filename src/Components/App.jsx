import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import ScheduledVisitorsPage from './components/ScheduledVisitorsPage';
import VisitorRequestsPage from './components/VisitorRequestsPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [unattendedRequests, setUnattendedRequests] = useState(3); // Example count for notification badge

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="flex justify-between items-center bg-white p-4 rounded shadow">
          <h1 className="text-xl font-bold">
            <Link to="/">VMS</Link>
          </h1>
          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
              Schedule a visit
            </button>
            <div className="relative">
              <Link to="/profile">
                <button className="bg-gray-200 p-2 rounded-full">
                  <img
                    src="/path/to/profile.jpg"
                    alt="John Doe"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
              </Link>
              {unattendedRequests > 0 && (
                <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </div>
          </div>
        </header>
        <main className="mt-4">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/scheduled-visitors" component={ScheduledVisitorsPage} />
            <Route path="/visitor-requests" component={VisitorRequestsPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
