import React, { useState } from "react";
import {
  FileText, Search, Filter, Eye,
  CheckCircle, XCircle, Clock,
  User, Package, Calendar, DollarSign,
  Download, Mail, Phone, MapPin
} from 'lucide-react';

const RequestTab = ({ requests, setRequests, patients, packages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-600/30 text-yellow-300';
      case 'approved': return 'bg-green-600/30 text-green-300';
      case 'rejected': return 'bg-red-600/30 text-red-300';
      case 'in-review': return 'bg-blue-600/30 text-blue-300';
      default: return 'bg-gray-600/30 text-gray-300';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <FileText className="h-5 w-5 mr-2 text-emerald-400" />
              Package Requests
            </h2>
            <p className="text-sm text-green-200 mt-1">
              Manage patient requests for surgery packages
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-300" />
            <input
              type="text"
              placeholder="Search requests..."
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
            <option value="pending" className="bg-gray-800">Pending</option>
            <option value="in-review" className="bg-gray-800">In Review</option>
            <option value="approved" className="bg-gray-800">Approved</option>
            <option value="rejected" className="bg-gray-800">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List View */}
        <div className="lg:col-span-2 space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setSelectedRequest(request)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{request.patientName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-green-200 mt-1">{request.packageName}</p>
                  
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-green-300">Requested</p>
                      <p className="text-sm text-white">{request.requestedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300">Preferred</p>
                      <p className="text-sm text-white">{request.preferredDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300">Budget</p>
                      <p className="text-sm text-white">₹{request.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300">Urgency</p>
                      <p className={`text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-green-200">
                      <MapPin className="h-4 w-4 mr-1" />
                      {request.patientCountry}
                    </div>
                    <div className="flex items-center text-sm text-green-200">
                      <FileText className="h-4 w-4 mr-1" />
                      {request.documents.length} documents
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(request.id, 'approved');
                  }}
                  className="p-2 text-green-400 hover:text-green-300 hover:bg-white/10 rounded-lg transition-colors"
                  title="Approve"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(request.id, 'rejected');
                  }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors"
                  title="Reject"
                >
                  <XCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRequest(request);
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

        {/* Request Details */}
        <div className="lg:col-span-1">
          {selectedRequest ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">Request Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Patient</p>
                    <p className="text-white font-medium">{selectedRequest.patientName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Email</p>
                    <p className="text-white">{selectedRequest.patientEmail}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Phone</p>
                    <p className="text-white">{selectedRequest.patientPhone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Package className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Package</p>
                    <p className="text-white">{selectedRequest.packageName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm text-green-300">Preferred Date</p>
                    <p className="text-white">{selectedRequest.preferredDate}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-green-300 mb-2">Medical History</p>
                  <p className="text-white text-sm">{selectedRequest.medicalHistory}</p>
                </div>

                <div>
                  <p className="text-sm text-green-300 mb-2">Notes</p>
                  <p className="text-white text-sm">{selectedRequest.notes}</p>
                </div>

                <div>
                  <p className="text-sm text-green-300 mb-2">Documents</p>
                  <div className="space-y-2">
                    {selectedRequest.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                        <span className="text-sm text-white">{doc}</span>
                        <button className="text-emerald-400 hover:text-emerald-300">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-x-2">
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <FileText className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-white">Select a request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestTab;