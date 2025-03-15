import React from 'react';
import { ShieldIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { profile } = useAuth();

  if (!profile?.role || !['admin', 'owner'].includes(profile.role)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-500">Access Denied</h2>
          <p className="mt-2 text-gray-300">
            You don't have permission to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <ShieldIcon className="h-8 w-8 text-primary-400 mr-3" />
        <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
      </div>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Welcome, {profile.username}</h2>
        <p className="text-gray-300">
          You have {profile.role} privileges. Use this panel to manage servers and users.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;