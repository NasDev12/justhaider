import React from 'react';

const Servers = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Minecraft Servers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Server list will be populated from the database */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Loading servers...</h2>
          <p className="text-gray-400">Server information will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Servers;