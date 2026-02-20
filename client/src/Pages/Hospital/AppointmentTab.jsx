import React, { useState } from "react";
import {
  Calendar, Clock, User, Stethoscope,
  Search, Filter, Plus, CheckCircle,
  XCircle, Eye, Edit, Trash2,
  MapPin, Phone, Mail, FileText
} from 'lucide-react';

const AppointmentTab = ({ appointments, setAppointments, patients, doctors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate === "all" || apt.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-600/30 text-blue-300';
      case 'confirmed': return 'bg-green-600/30 text-green-300';
      case 'completed': return 'bg-purple-600/30 text-purple-300';
      case 'cancelled': return 'bg-red-600/30 text-red-300';
      default: return 'bg-gray-600/30 text-gray-300';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const today = new Date().toISOString().split('T')[0];
  const upcomingAppointments = appointments.filter(apt => apt.date >= today);
  const pastAppointments = appointments.filter(apt => apt.date < today);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
              Appointments
            </h2>
            <p className="text-sm text-green-200 mt-1">
              Manage patient appointments and schedules
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-300" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Total</p>
          <p className="text-2xl font-bold text-white">{appointments.length}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Today</p>
          <p className="text-2xl font-bold text-white">
            {appointments.filter(a => a.date === today).length}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Upcoming</p>
          <p className="text-2xl font-bold text-white">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Completed</p>
          <p className="text-2xl font-bold text-white">
            {appointments.filter(a => a.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List View */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-white">Upcoming Appointments</h3>
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setSelectedAppointment(apt)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{apt.patientName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-green-200">
                      <Stethoscope className="h-4 w-4 mr-1" />
                      {apt.doctorName}
                    </div>
                    <div className="flex items-center text-sm text-green-200">
                      <Clock className="h-4 w-4 mr-1" />
                      {apt.time} ({apt.duration})
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-green-200">
                      <Calendar className="h-4 w-4 mr-1" />
                      {apt.date}
                    </div>
                    <div className="flex items-center text-sm text-green-200">
                      <MapPin className="h-4 w-4 mr-1" />
                      {apt.location}
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-green-300">Type: {apt.type}</p>
                    {apt.notes && (
                      <p className="text-xs text-green-200 mt-1">Note: {apt.notes}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(apt.id, 'confirmed');
                  }}
                  className="p-2 text-green-400 hover:text-green-300 hover:bg-white/10 rounded-lg transition-colors"
                  title="Confirm"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(apt.id, 'cancelled');
                  }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
                  title="Cancel"
                >
                  <XCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAppointment(apt);
                  }}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Details */}
        <div className="lg:col-span-1">
          {selectedAppointment ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">Appointment Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Patient</p>
                    <p className="text-white font-medium">{selectedAppointment.patientName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Stethoscope className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Doctor</p>
                    <p className="text-white">{selectedAppointment.doctorName}</p>
                    <p className="text-xs text-green-200">{selectedAppointment.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Date & Time</p>
                    <p className="text-white">{selectedAppointment.date} at {selectedAppointment.time}</p>
                    <p className="text-xs text-green-200">Duration: {selectedAppointment.duration}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Location</p>
                    <p className="text-white">{selectedAppointment.location}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-green-300 mb-2">Appointment Type</p>
                  <span className="px-3 py-1 bg-emerald-600/30 text-emerald-300 rounded-full text-sm">
                    {selectedAppointment.type}
                  </span>
                </div>

                {selectedAppointment.notes && (
                  <div>
                    <p className="text-sm text-green-300 mb-2">Notes</p>
                    <p className="text-white text-sm bg-white/5 rounded-lg p-3">
                      {selectedAppointment.notes}
                    </p>
                  </div>
                )}

                <div className="pt-4 flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Reschedule
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add Notes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <Calendar className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-white">Select an appointment to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Past Appointments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastAppointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between">
                  <p className="text-white font-medium">{apt.patientName}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
                <p className="text-sm text-green-200 mt-1">{apt.doctorName}</p>
                <p className="text-xs text-green-300 mt-2">{apt.date} • {apt.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTab;