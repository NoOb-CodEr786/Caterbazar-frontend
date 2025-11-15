"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, Eye, Edit, Ban, CheckCircle, 
  UserCheck, Phone, Mail, MapPin, Calendar, ShoppingBag, Heart 
} from 'lucide-react';

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      location: 'Mumbai, Maharashtra',
      status: 'active',
      joinDate: '2024-01-15',
      totalOrders: 12,
      totalSpent: '₹45,600',
      lastOrder: '2024-11-05',
      favoriteVendors: 3
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 8765432109',
      location: 'Delhi, NCR',
      status: 'active',
      joinDate: '2024-02-20',
      totalOrders: 8,
      totalSpent: '₹32,400',
      lastOrder: '2024-11-02',
      favoriteVendors: 2
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 7654321098',
      location: 'Ahmedabad, Gujarat',
      status: 'inactive',
      joinDate: '2024-03-10',
      totalOrders: 3,
      totalSpent: '₹12,800',
      lastOrder: '2024-09-15',
      favoriteVendors: 1
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@email.com',
      phone: '+91 6543210987',
      location: 'Bangalore, Karnataka',
      status: 'active',
      joinDate: '2024-01-28',
      totalOrders: 18,
      totalSpent: '₹67,200',
      lastOrder: '2024-11-08',
      favoriteVendors: 5
    },
    {
      id: 5,
      name: 'Vikash Singh',
      email: 'vikash.singh@email.com',
      phone: '+91 5432109876',
      location: 'Kolkata, West Bengal',
      status: 'suspended',
      joinDate: '2024-04-12',
      totalOrders: 5,
      totalSpent: '₹18,900',
      lastOrder: '2024-10-20',
      favoriteVendors: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <UserCheck className="w-4 h-4" />;
      case 'suspended': return <Ban className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600 mt-1">Manage and monitor all registered customers</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Customers</p>
              <p className="text-2xl font-bold text-blue-900">8,432</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Active Customers</p>
              <p className="text-2xl font-bold text-green-900">7,654</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Inactive</p>
              <p className="text-2xl font-bold text-yellow-900">567</p>
            </div>
            <UserCheck className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Suspended</p>
              <p className="text-2xl font-bold text-red-900">211</p>
            </div>
            <Ban className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[250px]">Customer Details</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[280px]">Contact Info</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[220px]">Order History</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[150px]">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[150px]">Actions</th>
            </tr>
          </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{customer.name}</h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Member since {customer.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{customer.favoriteVendors} Favorite Vendors</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">{customer.location}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{customer.totalOrders} Orders</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-900">{customer.totalSpent} Total Spent</p>
                      <p className="text-xs text-gray-500">Last order: {customer.lastOrder}</p>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {getStatusIcon(customer.status)}
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
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
          Showing {filteredCustomers.length} of {customers.length} customers
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}