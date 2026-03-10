"use client";

import React from 'react';
import { DollarSign, Package, Users, ShoppingBag } from 'lucide-react';

// কার্ডগুলোর ডাটা স্ট্রাকচার টাইপ
interface StatCard {
  label: string;
  value: string;
  icon: React.ElementType;
}

const DashboardOverview: React.FC = () => {
  const stats: StatCard[] = [
    { label: "Total Revenue", value: "$28,450", icon: DollarSign },
    { label: "Orders", value: "312", icon: Package },
    { label: "Customers", value: "28,450", icon: Users },
    { label: "Avg. Order Value", value: "$91.19", icon: ShoppingBag },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
            </div>
            <stat.icon className="text-gray-400" />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
            <h3 className="font-bold mb-4">Sales Overview</h3>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">Chart Placeholder</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4">Sales by Category</h3>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">Pie Chart Placeholder</div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Recent Orders</h3>
          {[...Array(5)].map((_, i: number) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <Package size={32} className="text-gray-300" />
                <div>
                  <p className="font-semibold text-sm">ORD-12345</p>
                  <p className="text-gray-400 text-xs">Sarah Johnson</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">+$1,999.00</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${i % 2 === 0 ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                  {i % 2 === 0 ? 'Processing' : 'Shipped'}
                </span>
              </div>
            </div>
          ))}
          <button className="w-full mt-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Top Performing Products</h3>
          {[...Array(4)].map((_, i: number) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Hydrating Essence</p>
                <p className="text-gray-400 text-xs">1250 units sold</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">$1,999.00</p>
                <p className="text-[10px] text-gray-400">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;