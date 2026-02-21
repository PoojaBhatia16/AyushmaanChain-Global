// src/Pages/Hospital/Header.jsx
import React, { useState } from "react";
import { Copy, Check, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ hospitalInfo, activeTab, tabs, setActiveTab }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleCopy = () => {
    if (user?.wallet_address) {
      navigator.clipboard.writeText(user.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-4 mb-6 rounded-xl">
      {/* Main Header */}
      <nav className="bg-gradient-to-r">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                AyushmaanChain
              </span>
            </div>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Wallet Address */}
                <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <span className="text-sm text-white font-medium">
                    {user.wallet_address?.slice(0, 6)}...
                    {user.wallet_address?.slice(-4)}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/20"
                    title={copied ? "Copied!" : "Copy address"}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-green-200 capitalize font-medium">
                      {user.role}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                  </div>

                  <div className="relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=ffffff&color=2563eb&length=1&unique=${user.wallet_address}`}
                      alt="Avatar"
                      className="rounded-full w-10 h-10 border-2 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex items-center space-x-2 bg-white/10 hover:bg-red-500/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-white/20"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Tab Navigation Links */}
      {tabs && tabs.length > 0 && (
        <nav className="bg-gradient-to-r">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-center items-center py-4">
              <div className="flex flex-wrap justify-center gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 text-white ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105"
                          : "text-slate-700 hover:bg-green-100 hover:text-green-700 hover:shadow-md hover:scale-102"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.id === "requests" && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          3
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
