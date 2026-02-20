// src/Pages/Hospital/DoctorTab.jsx
import React, { useState } from "react";
import {
  Stethoscope, User, Mail, Phone,
  Calendar, Star, Award, Clock,
  Search, Filter, Plus, Edit,
  Trash2, Eye, MapPin, BookOpen,
  CheckCircle, XCircle, Users
} from 'lucide-react';

const DoctorTab = ({ doctors, setDoctors, patients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Mock data if not provided via props
  const mockDoctors = doctors || [
    {
      id: 301,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiac Surgery",
      experience: "15 years",
      education: "MBBS, MS (Cardiac Surgery) - Harvard Medical School",
      license: "MED-2024-001",
      email: "sarah.j@xyzheart.com",
      phone: "+254 700 789 015",
      available: true,
      consultationFee: 150,
      currency: "USD",
      patients: [101, 103],
      rating: 4.9,
      reviews: 128,
      image: "/api/placeholder/100/100",
      schedule: [
        { day: "Monday", hours: "9:00 AM - 5:00 PM" },
        { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
        { day: "Friday", hours: "9:00 AM - 3:00 PM" }
      ]
    },
    {
      id: 302,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgery",
      experience: "12 years",
      education: "MBBS, MS (Orthopedics) - Johns Hopkins University",
      license: "MED-2024-002",
      email: "james.w@xyzheart.com",
      phone: "+254 700 789 016",
      available: true,
      consultationFee: 120,
      currency: "USD",
      patients: [102],
      rating: 4.8,
      reviews: 95,
      image: "/api/placeholder/100/100",
      schedule: [
        { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
        { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 2:00 PM" }
      ]
    },
    {
      id: 303,
      name: "Dr. Emily Brown",
      specialty: "Anesthesiology",
      experience: "10 years",
      education: "MBBS, MD (Anesthesiology) - Oxford University",
      license: "MED-2024-003",
      email: "emily.b@xyzheart.com",
      phone: "+254 700 789 017",
      available: false,
      consultationFee: 100,
      currency: "USD",
      patients: [],
      rating: 4.7,
      reviews: 67,
      image: "/api/placeholder/100/100",
      schedule: [
        { day: "Monday", hours: "8:00 AM - 4:00 PM" },
        { day: "Tuesday", hours: "8:00 AM - 4:00 PM" },
        { day: "Thursday", hours: "8:00 AM - 4:00 PM" }
      ]
    }
  ];

  const specialties = [...new Set(mockDoctors.map(d => d.specialty))];

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === "all" || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getPatientCount = (doctorId) => {
    if (!patients) return Math.floor(Math.random() * 10); // Mock count if no patients data
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return patients.filter(p => p.assignedDoctor === doctor?.name).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
              Doctors
            </h2>
            <p className="text-sm text-green-200 mt-1">
              Manage hospital staff and specialists
            </p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add New Doctor
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-300" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all" className="bg-gray-800">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty} className="bg-gray-800">{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Total Doctors</p>
          <p className="text-2xl font-bold text-white">{mockDoctors.length}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Available</p>
          <p className="text-2xl font-bold text-white">
            {mockDoctors.filter(d => d.available).length}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Specialties</p>
          <p className="text-2xl font-bold text-white">{specialties.length}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <p className="text-sm text-green-300">Avg Rating</p>
          <p className="text-2xl font-bold text-white">
            {(mockDoctors.reduce((acc, d) => acc + d.rating, 0) / mockDoctors.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List View - 2/3 width */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                    <p className="text-sm text-emerald-300">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white ml-1">{doctor.rating}</span>
                      <span className="text-xs text-green-300 ml-2">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className={`h-3 w-3 rounded-full ${doctor.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} 
                     title={doctor.available ? 'Available' : 'Unavailable'} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-green-200 text-xs">{doctor.experience}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-green-200 text-xs">{getPatientCount(doctor.id)} Patients</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-green-200 text-xs">${doctor.consultationFee}</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-green-200 text-xs">License: {doctor.license}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-emerald-400 mr-2" />
                    <span className="text-green-200 text-xs truncate max-w-[150px]">{doctor.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-emerald-400 mr-2" />
                    <span className="text-green-200 text-xs">{doctor.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
                        title="View Details">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-400 hover:text-green-300 hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-purple-400 hover:text-purple-300 hover:bg-white/10 rounded-lg transition-colors"
                        title="Schedule">
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-white/5 rounded-lg">
              <Stethoscope className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-white">No doctors found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Doctor Details - 1/3 width */}
        <div className="lg:col-span-1">
          {selectedDoctor ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Doctor Profile</h3>
                <button className="text-red-400 hover:text-red-300">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Profile Image */}
                <div className="text-center">
                  <div className="h-24 w-24 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mt-3">{selectedDoctor.name}</h4>
                  <p className="text-emerald-300">{selectedDoctor.specialty}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white ml-1">{selectedDoctor.rating}</span>
                    <span className="text-xs text-green-300 ml-2">({selectedDoctor.reviews} reviews)</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center py-4 border-t border-white/10">
                  <div>
                    <p className="text-2xl font-bold text-white">{selectedDoctor.experience.split(' ')[0]}</p>
                    <p className="text-xs text-green-300">Years</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{getPatientCount(selectedDoctor.id)}</p>
                    <p className="text-xs text-green-300">Patients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">${selectedDoctor.consultationFee}</p>
                    <p className="text-xs text-green-300">Fee</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-green-300">Education</p>
                    <p className="text-white text-sm">{selectedDoctor.education}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-300">License Number</p>
                    <p className="text-white text-sm">{selectedDoctor.license}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-300">Contact</p>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 text-emerald-400 mr-2" />
                      <span className="text-white text-sm">{selectedDoctor.email}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 text-emerald-400 mr-2" />
                      <span className="text-white text-sm">{selectedDoctor.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <p className="text-sm text-green-300 mb-2">Weekly Schedule</p>
                  <div className="space-y-2">
                    {selectedDoctor.schedule.map((slot, idx) => (
                      <div key={idx} className="flex justify-between bg-white/5 rounded-lg p-2">
                        <span className="text-white text-sm">{slot.day}</span>
                        <span className="text-green-200 text-sm">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-12 text-center sticky top-6">
              <Stethoscope className="h-16 w-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Doctor Selected</h3>
              <p className="text-green-200 text-sm">
                Click on any doctor card to view their detailed profile and schedule
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorTab;