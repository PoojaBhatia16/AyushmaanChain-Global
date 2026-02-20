import React from "react";
import {
  TrendingUp, Users, Package, Calendar,
  Stethoscope, FileText, Clock, DollarSign,
  Activity, Heart, Award, CheckCircle,
  AlertCircle, BarChart
} from 'lucide-react';

const DashboardStats = ({ stats, hospitalInfo, packages, requests, appointments, patients, doctors }) => {
  const recentRequests = requests.slice(0, 5);
  const todayAppointments = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const activePackages = packages.filter(p => p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, <span className="text-emerald-300">{hospitalInfo.name}</span>
        </h2>
        <p className="text-green-200">Here's what's happening with your hospital today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Total Patients</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalPatients}</p>
              <p className="text-xs text-green-200 mt-1">↑ 12% from last month</p>
            </div>
            <div className="h-12 w-12 bg-emerald-600/30 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Active Patients</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.activePatients}</p>
              <p className="text-xs text-green-200 mt-1">Currently in care</p>
            </div>
            <div className="h-12 w-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Total Packages</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalPackages}</p>
              <p className="text-xs text-green-200 mt-1">{activePackages.length} active</p>
            </div>
            <div className="h-12 w-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Pending Requests</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.pendingRequests}</p>
              <p className="text-xs text-green-200 mt-1">Need attention</p>
            </div>
            <div className="h-12 w-12 bg-yellow-600/30 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Today's Appointments</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.todayAppointments}</p>
              <p className="text-xs text-green-200 mt-1">Scheduled for today</p>
            </div>
            <div className="h-12 w-12 bg-orange-600/30 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Total Doctors</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalDoctors}</p>
              <p className="text-xs text-green-200 mt-1">{stats.availableDoctors} available</p>
            </div>
            <div className="h-12 w-12 bg-pink-600/30 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-pink-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Revenue (MTD)</p>
              <p className="text-2xl font-bold text-white mt-1">₹{(hospitalInfo.stats.revenue / 100000).toFixed(1)}L</p>
              <p className="text-xs text-green-200 mt-1">↑ 8% from last month</p>
            </div>
            <div className="h-12 w-12 bg-green-600/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Occupancy Rate</p>
              <p className="text-2xl font-bold text-white mt-1">{hospitalInfo.stats.occupancyRate}%</p>
              <p className="text-xs text-green-200 mt-1">45/58 beds filled</p>
            </div>
            <div className="h-12 w-12 bg-indigo-600/30 rounded-lg flex items-center justify-center">
              <BarChart className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-emerald-400" />
            Recent Package Requests
          </h3>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{request.patientName}</p>
                    <p className="text-sm text-green-200">{request.packageName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      request.status === 'pending' ? 'bg-yellow-600/30 text-yellow-300' :
                      request.status === 'approved' ? 'bg-green-600/30 text-green-300' :
                      'bg-blue-600/30 text-blue-300'
                    }`}>
                      {request.status}
                    </span>
                    <p className="text-xs text-green-300 mt-1">{request.requestedDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-emerald-400 hover:text-emerald-300">
            View All Requests →
          </button>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-emerald-400" />
            Today's Schedule
          </h3>
          {todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between">
                    <p className="text-white font-medium">{apt.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      apt.status === 'confirmed' ? 'bg-green-600/30 text-green-300' : 'bg-yellow-600/30 text-yellow-300'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-sm text-white mt-1">{apt.patientName}</p>
                  <p className="text-xs text-green-300">with {apt.doctorName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-green-200 text-sm">No appointments scheduled for today</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Package className="h-6 w-6 text-emerald-400 mb-2" />
            <span className="text-sm text-white">Add Package</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Calendar className="h-6 w-6 text-emerald-400 mb-2" />
            <span className="text-sm text-white">New Appointment</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Users className="h-6 w-6 text-emerald-400 mb-2" />
            <span className="text-sm text-white">Add Patient</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <FileText className="h-6 w-6 text-emerald-400 mb-2" />
            <span className="text-sm text-white">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;