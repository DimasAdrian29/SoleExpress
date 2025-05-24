import React from 'react';
import Header from '../components/Header';

import CardsRow from '../components/CardsRow';
import GetStarted from '../components/GetStarted';
import SalesOverview from '../components/SalesOverview';
import TeamMembers from '../components/TeamMembers';
import ToDoList from '../components/ToDoList';
import ProgressTrack from '../components/ProgressTrack';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      
      <main className="flex-1 flex flex-col bg-[#5f73f2] p-4 md:p-6 lg:p-8 min-h-screen relative">
      <Header path="/ Pages / Dashboard" title="Dashboard" />

        <CardsRow />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <SalesOverview />
          <GetStarted />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TeamMembers />
          <ToDoList />
          <ProgressTrack />
        </div>
      </main>
    </div>
  );
}