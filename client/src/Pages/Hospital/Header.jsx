import React from "react";
import { Menu, Bell, User, ChevronDown, Search } from 'lucide-react';

const Header = ({ setSidebarOpen, hospitalInfo, activeTab, tabs, setActiveTab }) => {
  const activeTabInfo = tabs.find(tab => tab.id === activeTab);
  const Icon = activeTabInfo?.icon;

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Active Tab Title */}
            <div className="flex items-center">
              {Icon && <Icon className="h-5 w-5 text-emerald-400 mr-2" />}
              <h1 className="text-xl font-semibold text-white">
                {activeTabInfo?.label}
              </h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-300" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="relative text-green-200 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Desktop Tabs Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-green-100 hover:bg-white/10'
                    }`}
                  >
                    <TabIcon className="h-4 w-4 mr-2" />
                    <span className="hidden xl:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Hospital Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{hospitalInfo.name}</p>
                <p className="text-xs text-green-300">{hospitalInfo.location}</p>
              </div>
              <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-green-200 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;