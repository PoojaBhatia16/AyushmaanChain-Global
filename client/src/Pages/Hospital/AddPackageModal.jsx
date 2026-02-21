import React, { useState, useEffect } from "react";
import { X, Shield, RefreshCw, Package, Clock, DollarSign, Info } from "lucide-react";
import useHospitalPackageRegistry from "../../hooks/useHospitalPackageRegistry";

const AddPackageModal = ({ onClose }) => {
  const { contract, account } = useHospitalPackageRegistry();
  
  // States
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [view, setView] = useState('form'); // 'form' or 'list'
  
  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    includes: "",
    excludes: ""
  });

  // Fetch packages from blockchain
  const fetchPackages = async () => {
    if (!contract || !account) {
      console.log("Contract or account not ready");
      return;
    }

    try {
      setFetching(true);
      console.log("Fetching packages for hospital:", account);

      // Get all package IDs for this hospital
      const packageIds = await contract.getHospitalPackages(account);
      console.log("Package IDs:", packageIds);

      // Fetch details for each package
      const packageDetails = [];
      for (const id of packageIds) {
        try {
          const pkg = await contract.getPackage(id);
          
          // Parse metadata (stored as JSON string)
          let metadata = {};
          try {
            metadata = JSON.parse(pkg.metadataHash);
          } catch (e) {
            console.log("Metadata parse error:", e);
            metadata = {
              duration: "",
              includes: "",
              excludes: ""
            };
          }

          packageDetails.push({
            id: pkg.packageId,
            packageId: pkg.packageId,
            name: pkg.name,
            price: pkg.price.toString(),
            metadataHash: pkg.metadataHash,
            hospital: pkg.hospital,
            timestamp: new Date(Number(pkg.timestamp) * 1000).toLocaleString(),
            ...metadata
          });
        } catch (err) {
          console.error(`Error fetching package ${id}:`, err);
        }
      }

      console.log("Fetched packages:", packageDetails);
      setPackages(packageDetails);

    } catch (error) {
      console.error("Error fetching packages:", error);
      alert("Failed to fetch packages");
    } finally {
      setFetching(false);
    }
  };

  // Load packages on mount
  useEffect(() => {
    fetchPackages();
  }, [contract, account]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract) {
      alert("Contract not connected");
      return;
    }

    try {
      setLoading(true);

      // Generate unique packageId
      const packageId = "PKG-" + Date.now();

      // Create metadata object
      const metadata = {
        duration: formData.duration,
        includes: formData.includes,
        excludes: formData.excludes,
        hospital: account,
        createdAt: new Date().toISOString()
      };

      // Convert metadata to JSON string
      const metadataHash = JSON.stringify(metadata);

      console.log("Creating package:", {
        packageId,
        name: formData.name,
        price: formData.price,
        metadataHash
      });

      // Send transaction
      const tx = await contract.createPackage(
        packageId,
        formData.name,
        Number(formData.price),
        metadataHash
      );

      console.log("TX sent:", tx.hash);

      // Wait for mining
      await tx.wait();

      console.log("TX mined");
      
      // Clear form
      setFormData({
        name: "",
        price: "",
        duration: "",
        includes: "",
        excludes: ""
      });

      // Refresh packages list
      await fetchPackages();
      
      alert("Package created successfully");

    } catch (error) {
      console.error(error);
      alert("Error creating package: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h3 className="text-white text-xl font-bold">
              {view === 'form' ? 'Create Package' : 'Your Packages'}
            </h3>
            {account && (
              <span className="text-xs bg-emerald-600/30 text-emerald-300 px-3 py-1 rounded-full">
                {account.substring(0, 6)}...{account.substring(38)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView(view === 'form' ? 'list' : 'form')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              {view === 'form' ? 'View Packages' : 'Create New'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="text-white h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* View: Create Package Form */}
          {view === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Form Fields */}
              <div>
                <label className="block text-sm text-green-300 mb-1">Package Name *</label>
                <input
                  required
                  placeholder="e.g., Cardiac Bypass Surgery"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-green-300 mb-1">Price (in INR) *</label>
                <input
                  required
                  type="number"
                  placeholder="450000"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-green-300 mb-1">Duration</label>
                <input
                  placeholder="e.g., 7-10 days"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-green-300 mb-1">Includes</label>
                <textarea
                  placeholder="What's included in the package (one per line)"
                  value={formData.includes}
                  onChange={(e) => setFormData({...formData, includes: e.target.value})}
                  rows="3"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-green-300 mb-1">Excludes</label>
                <textarea
                  placeholder="What's not included (one per line)"
                  value={formData.excludes}
                  onChange={(e) => setFormData({...formData, excludes: e.target.value})}
                  rows="3"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Blockchain Info */}
              <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-500/30">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-white font-medium">Blockchain Verification</span>
                </div>
                <p className="text-xs text-green-300">
                  Package name and price will be permanently stored on blockchain.
                  Additional details will be stored in metadata.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !contract}
                className="w-full bg-emerald-600 p-3 rounded-lg text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Creating on Blockchain...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Create Package on Blockchain
                  </span>
                )}
              </button>
            </form>
          )}

          {/* View: Packages List */}
          {view === 'list' && (
            <div className="space-y-4">
              
              {/* Refresh Button */}
              <div className="flex justify-end">
                <button
                  onClick={fetchPackages}
                  disabled={fetching}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${fetching ? 'animate-spin' : ''}`} />
                  {fetching ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {/* Packages Grid */}
              {fetching ? (
                <div className="text-center py-12">
                  <RefreshCw className="h-12 w-12 animate-spin text-emerald-500 mx-auto mb-4" />
                  <p className="text-white">Loading packages...</p>
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-lg">
                  <Package className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-2">No Packages Found</h3>
                  <p className="text-green-200 mb-4">
                    You haven't created any packages yet.
                  </p>
                  <button
                    onClick={() => setView('form')}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Create Your First Package
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-white font-medium">{pkg.name}</h4>
                        <Shield className="h-4 w-4 text-emerald-400" />
                      </div>
                      
                      <div className="mt-2 flex items-center text-emerald-300">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>₹{formatPrice(pkg.price)}</span>
                      </div>

                      {pkg.duration && (
                        <div className="mt-1 flex items-center text-xs text-green-300">
                          <Clock className="h-3 w-3 mr-1" />
                          {pkg.duration}
                        </div>
                      )}

                      <div className="mt-2 text-xs text-gray-400">
                        ID: {pkg.packageId.substring(0, 10)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Package Details</h3>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-300">Package Name</p>
                      <p className="text-white">{selectedPackage.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300">Price</p>
                      <p className="text-white">₹{formatPrice(selectedPackage.price)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300">Duration</p>
                      <p className="text-white">{selectedPackage.duration || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300">Created</p>
                      <p className="text-white">{selectedPackage.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Includes */}
                {selectedPackage.includes && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Includes</h4>
                    <p className="text-green-200 whitespace-pre-line">{selectedPackage.includes}</p>
                  </div>
                )}

                {/* Excludes */}
                {selectedPackage.excludes && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Excludes</h4>
                    <p className="text-green-200 whitespace-pre-line">{selectedPackage.excludes}</p>
                  </div>
                )}

                {/* Blockchain Info */}
                <div className="bg-emerald-900/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Shield className="h-4 w-4 text-emerald-400 mr-2" />
                    Blockchain Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-xs text-green-300 break-all">
                      <span className="font-medium">Package ID:</span> {selectedPackage.packageId}
                    </p>
                    <p className="text-xs text-green-300 break-all">
                      <span className="font-medium">Hospital Address:</span> {selectedPackage.hospital}
                    </p>
                    <p className="text-xs text-green-300 break-all">
                      <span className="font-medium">Metadata Hash:</span> {selectedPackage.metadataHash.substring(0, 50)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPackageModal;