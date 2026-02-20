import React, { useState } from "react";
import {
  Users, Search, Filter, Eye,
  User, Phone, Mail, MapPin,
  Calendar, Heart, Activity,
  Download, Plus, Edit, Trash2,
  FileText, Clock, CheckCircle
} from 'lucide-react';

const PatientTab = ({ patients, setPatients, doctors, packages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-600/30 text-blue-300';
      case 'admitted': return 'bg-purple-600/30 text-purple-300';
      case 'discharged': return 'bg-green-600/30 text-green-300';
      case 'cancelled': return 'bg-red-600/30 text-red-300';
      default: return 'bg-gray-600/30 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-emerald-400" />
              Patients
            </h2>
            <p className="text-sm text-green-200 mt-1">
              Manage patient records and information
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-300" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all" className="bg-gray-800">All Status</option>
            <option value="scheduled" className="bg-gray-800">Scheduled</option>
            <option value="admitted" className="bg-gray-800">Admitted</option>
            <option value="discharged" className="bg-gray-800">Discharged</option>
          </select>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List View */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setSelectedPatient(patient)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-emerald-600/30 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                    <p className="text-sm text-green-200">{patient.age} years • {patient.gender}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Heart className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-green-200">Blood Group:</span>
                  <span className="text-white ml-2">{patient.bloodGroup}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-green-200">{patient.country}, {patient.county}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="text-green-200">Admission:</span>
                  <span className="text-white ml-2">{patient.admissionDate}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-green-200">Assigned Doctor</p>
                <p className="text-white font-medium">{patient.assignedDoctor}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-1">
          {selectedPatient ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">Patient Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Name</p>
                    <p className="text-white font-medium">{selectedPatient.name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Email</p>
                    <p className="text-white">{selectedPatient.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Phone</p>
                    <p className="text-white">{selectedPatient.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Address</p>
                    <p className="text-white">{selectedPatient.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Passport</p>
                    <p className="text-white">{selectedPatient.passport}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-green-300 mb-2">Medical History</p>
                  <div className="space-y-1">
                    {selectedPatient.medicalHistory.map((condition, idx) => (
                      <div key={idx} className="flex items-center text-white text-sm">
                        <Activity className="h-3 w-3 text-emerald-400 mr-2" />
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-green-300 mb-2">Assigned Package</p>
                  <p className="text-white">{selectedPatient.assignedPackage}</p>
                </div>

                <div className="pt-4 flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <Edit className="h-4 w-4 inline mr-2" />
                    Edit
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <Users className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-white">Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientTab;