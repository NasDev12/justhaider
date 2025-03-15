import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ServerIcon, HomeIcon, ShieldIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-primary-400 hover:text-primary-300">
              <ServerIcon className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">MC Servers</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-300 hover:text-white px-3 py-2">
              <HomeIcon className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/servers" className="flex items-center text-gray-300 hover:text-white px-3 py-2">
              <ServerIcon className="h-5 w-5 mr-1" />
              <span>Servers</span>
            </Link>
            {user && (
              <Link to="/admin" className="flex items-center text-gray-300 hover:text-white px-3 py-2">
                <ShieldIcon className="h-5 w-5 mr-1" />
                <span>Admin</span>
              </Link>
            )}
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-300 hover:text-white px-3 py-2"
              >
                <LogOutIcon className="h-5 w-5 mr-1" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link to="/signin" className="flex items-center text-gray-300 hover:text-white px-3 py-2">
                <LogInIcon className="h-5 w-5 mr-1" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar