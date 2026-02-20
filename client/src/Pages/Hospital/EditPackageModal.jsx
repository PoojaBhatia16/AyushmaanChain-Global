import React, { useState } from "react";
import { X, Plus, Trash2, Shield } from 'lucide-react';

const EditPackageModal = ({ package: pkg, onClose, onSave, doctors }) => {
  const [formData, setFormData] = useState({
    ...pkg,
    newInclude: "",
    newExclude: ""
  });

  const handleAddInclude = () => {
    if (formData.newInclude.trim()) {
      setFormData({
        ...formData,
        includes: [...formData.includes, formData.newInclude.trim()],
        newInclude: ""
      });
    }
  };

  const handleAddExclude = () => {
    if (formData.newExclude.trim()) {
      setFormData({
        ...formData,
        excludes: [...formData.excludes, formData.newExclude.trim()],
        newExclude: ""
      });
    }
  };

  const handleRemoveInclude = (index) => {
    setFormData({
      ...formData,
      includes: formData.includes.filter((_, i) => i !== index)
    });
  };

  const handleRemoveExclude = (index) => {
    setFormData({
      ...formData,
      excludes: formData.excludes.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Edit Package</h3>
              <p className="text-sm text-green-200 mt-1">{pkg.name}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-green-300 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-green-300 mb-1">Cost *</label>
                  <div className="flex">
                    <input
                      type="number"
                      required
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: e.target.value})}
                      className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-white"
                    />
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      className="bg-white/10 border border-l-0 border-white/20 rounded-r-lg px-3 py-2 text-white"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-green-300 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-green-300 mb-1">Available Slots *</label>
                  <input
                    type="number"
                    required
                    value={formData.availableSlots}
                    onChange={(e) => setFormData({...formData, availableSlots: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-green-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Package Includes */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-4">Package Includes</h4>
              <div className="space-y-3">
                {formData.includes.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                    <span className="text-white text-sm">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInclude(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.newInclude}
                    onChange={(e) => setFormData({...formData, newInclude: e.target.value})}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="Add included item..."
                  />
                  <button
                    type="button"
                    onClick={handleAddInclude}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Package Excludes */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-4">Package Excludes</h4>
              <div className="space-y-3">
                {formData.excludes.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                    <span className="text-white text-sm">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExclude(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.newExclude}
                    onChange={(e) => setFormData({...formData, newExclude: e.target.value})}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="Add excluded item..."
                  />
                  <button
                    type="button"
                    onClick={handleAddExclude}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Assigned Doctors */}
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-4">Assigned Doctors</h4>
              <div className="space-y-2">
                {doctors.map((doctor) => (
                  <label key={doctor.id} className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.doctors.includes(doctor.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            doctors: [...formData.doctors, doctor.name]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            doctors: formData.doctors.filter(d => d !== doctor.name)
                          });
                        }
                      }}
                      className="rounded border-white/20 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className="text-white">{doctor.name}</p>
                      <p className="text-xs text-green-300">{doctor.specialty}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-white/5 rounded-lg p-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.blockchainVerified}
                  onChange={(e) => setFormData({...formData, blockchainVerified: e.target.checked})}
                  className="rounded border-white/20 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-white">Blockchain Verify this package</span>
                </div>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPackageModal;