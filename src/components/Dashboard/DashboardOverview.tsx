'use client';

import React from 'react';
import { Eye, Heart, Users } from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    {
      icon: Eye,
      label: 'Total Page Views',
      value: '1,500',
      change: '+20% from last period',
      changeType: 'positive',
      subtext: 'Peak day: Oct 26 (240 views)',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-500'
    },
    {
      icon: Heart,
      label: 'Likes Received',
      value: '250',
      subtext: 'Avg. 8.3 likes/day',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      icon: Users,
      label: 'Leads Generated',
      value: '45',
      change: 'Conversion: 3%',
      changeType: 'negative',
      subtext: 'Target: 60 leads',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500'
    }
  ];

  // Sample data for the chart
  const chartData = [
    { date: 'Oct 20', value: 200 },
    { date: 'Oct 21', value: 150 },
    { date: 'Oct 22', value: 180 },
    { date: 'Oct 23', value: 220 },
    { date: 'Oct 24', value: 170 },
    { date: 'Oct 25', value: 190 },
    { date: 'Oct 26', value: 240 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));
  const chartHeight = 400;
  const chartPadding = 40;

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                {stat.change && (
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Page Views Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Page Views Over Time</h2>
        
        <div className="relative" style={{ height: `${chartHeight}px` }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-sm text-gray-600 pr-4">
            <span>240</span>
            <span>180</span>
            <span>120</span>
            <span>60</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-200 border-dashed" />
              ))}
            </div>

            {/* SVG Line Chart */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="#FF8C5A" />
                </linearGradient>
              </defs>
              
              {/* Line path */}
              <path
                d={chartData.map((point, i) => {
                  const x = (i / (chartData.length - 1)) * 100;
                  const y = ((maxValue - point.value) / (maxValue - minValue)) * (100 - (chartPadding / chartHeight * 100));
                  return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                }).join(' ')}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points */}
              {chartData.map((point, i) => {
                const x = (i / (chartData.length - 1)) * 100;
                const y = ((maxValue - point.value) / (maxValue - minValue)) * (100 - (chartPadding / chartHeight * 100));
                return (
                  <circle
                    key={i}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="6"
                    fill="#FF6B35"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-sm text-gray-600">
              {chartData.map((point, i) => (
                <span key={i} className="text-xs">{point.date}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
