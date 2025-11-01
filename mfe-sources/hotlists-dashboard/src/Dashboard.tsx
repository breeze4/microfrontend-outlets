import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Dashboard.css';
import HomeView from './components/HomeView';
import DefectsView from './components/DefectsView';
import TestsView from './components/TestsView';
import MetricsView from './components/MetricsView';
import ReportsView from './components/ReportsView';

function Dashboard() {
  return (
    <BrowserRouter basename="/hotlists">
      <main className="hotlists-dashboard">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/defects" element={<DefectsView />} />
          <Route path="/tests" element={<TestsView />} />
          <Route path="/metrics" element={<MetricsView />} />
          <Route path="/reports" element={<ReportsView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default Dashboard;
