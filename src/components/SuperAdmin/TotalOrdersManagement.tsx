"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, Eye, Edit, Package, 
  TrendingUp, Calendar, MapPin, User, Building2, 
  Clock, CheckCircle, X, AlertCircle 
} from 'lucide-react';

export default function TotalOrdersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001234',
      customerName: 'Rajesh Kumar',
      vendorName: 'Delicious Delights Catering',
      eventType: 'Wedding',
      orderDate: '2024-11-08',
      eventDate: '2024-11-20',
      amount: '₹85,600',
      status: 'confirmed',
      location: 'Mumbai, Maharashtra',
      guests: 250,
      items: ['Buffet Menu A', 'Welcome Drinks', 'Dessert Counter']
    },
    {
      id: 'ORD-001235',
      customerName: 'Priya Sharma',
      vendorName: 'Royal Feast Caterers',
      eventType: 'Corporate Event',
      orderDate: '2024-11-07',
      eventDate: '2024-11-15',
      amount: '₹45,200',
      status: 'pending',
      location: 'Delhi, NCR',
      guests: 150,
      items: ['Continental Menu', 'Tea/Coffee Service', 'Snacks']
    },
    {
      id: 'ORD-001236',
      customerName: 'Amit Patel',
      vendorName: 'Green Garden Catering',
      eventType: 'Birthday Party',
      orderDate: '2024-11-06',
      eventDate: '2024-11-12',
      amount: '₹23,800',
      status: 'completed',
      location: 'Ahmedabad, Gujarat',
      guests: 80,
      items: ['Kids Menu', 'Birthday Cake', 'Party Snacks']
    },
    {
      id: 'ORD-001237',
      customerName: 'Sneha Gupta',
      vendorName: 'Spice Route Caterers',
      eventType: 'Anniversary',
      orderDate: '2024-11-05',
      eventDate: '2024-11-18',
      amount: '₹67,400',
      status: 'confirmed',
      location: 'Bangalore, Karnataka',
      guests: 200,
      items: ['Traditional Menu', 'Live Counter', 'Special Desserts']
    },
    {
      id: 'ORD-001238',
      customerName: 'Vikash Singh',
      vendorName: 'Urban Bites Catering',
      eventType: 'Office Launch',
      orderDate: '2024-11-04',
      eventDate: '2024-11-10',
      amount: '₹32,100',
      status: 'cancelled',
      location: 'Kolkata, West Bengal',
      guests: 100,
      items: ['Finger Food', 'Beverages', 'Mini Desserts']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'confirmed': return <Package className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Total Orders Management</h2>
          <p className="text-gray-600 mt-1">Monitor and manage all platform orders</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">12,847</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-900">9,654</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">1,234</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Revenue</p>
              <p className="text-2xl font-bold text-purple-900">₹84.2L</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Avg Order</p>
              <p className="text-2xl font-bold text-orange-900">₹65,500</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[220px]">Order Details</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[280px]">Customer & Vendor</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[250px]">Event Info</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[200px]">Amount & Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[150px]">Actions</th>
            </tr>
          </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{order.id}</h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">Ordered: {order.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">Event: {order.eventDate}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-medium text-gray-900 truncate">{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">{order.vendorName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">{order.location}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-900">{order.eventType}</p>
                      <p className="text-xs text-gray-600">{order.guests} Guests</p>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                            {item}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}