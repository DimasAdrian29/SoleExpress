import React from 'react';
import Card from './Card';

export default function CardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card
        title="Today’s money"
        value="$53,000"
        percent="+55%"
        percentColor="text-[#3c50e0]"
        description="since yesterday"
        icon="fas fa-coins"
        iconBg="bg-[#3c50e0]"
      />
      <Card
        title="Today’s users"
        value="2,300"
        percent="+3%"
        percentColor="text-[#3cd68a]"
        description="since last week"
        icon="fas fa-stopwatch"
        iconBg="bg-[#f44336]"
      />
      <Card
        title="New clients"
        value="+3,462"
        percent="-2%"
        percentColor="text-[#f44336]"
        description="since last quarter"
        icon="fas fa-user-plus"
        iconBg="bg-[#1abc9c]"
      />
      <Card
        title="Sales"
        value="$103,430"
        percent="+5%"
        percentColor="text-[#3cd68a]"
        description="than last month"
        icon="fas fa-shopping-cart"
        iconBg="bg-[#f57c00]"
      />
    </div>
  );
}