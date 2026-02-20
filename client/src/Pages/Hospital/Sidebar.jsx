import React from "react";
import { X, Shield, MapPin, Phone, Mail, Award } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, tabs, hospitalInfo }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setSidebarOpen(false)} 
      />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-xl transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-bold text-white">MediCare</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Hospital Info in Sidebar */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-green-200">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{hospitalInfo.location}</span>
              </div>
              <div className="flex items-center text-sm text-green-200">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{hospitalInfo.phone}</span>
              </div>
              <div className="flex items-center text-sm text-green-200">
                <Award className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{hospitalInfo.accreditation}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-green-100 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.id === 'requests' && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      12
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-green-300">Verified Partner</p>
              <div className="flex items-center mt-1">
                <Shield className="h-4 w-4 text-emerald-400 mr-1" />
                <span className="text-sm text-white">Blockchain Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;