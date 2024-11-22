import React, { useState } from 'react';
import Logo from '../assets/logo-grayscale.png';
import ProfileInfo from './ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './input/SearchBar';
import { IoMenu, IoClose } from 'react-icons/io5';

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isToken = localStorage.getItem('token');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery('');
  };

  return (
    <div className="sticky top-0 bg-white z-10 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 md:px-6 py-3">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="logo"
              className="h-10 w-auto md:h-12 flex-shrink-0"
            />
            <span className="text-xl md:text-2xl font-bold text-gray-800">
              TripTales
            </span>
          </div>

          {/* Desktop View */}
          {isToken && (
            <>
              <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
                <div className="flex-1 max-w-2xl mx-auto px-4">
                  <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                  />
                </div>
                <div className="flex-shrink-0">
                  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-2xl text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <IoClose /> : <IoMenu />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isToken && (
          <div
            className={`md:hidden bg-white px-4 py-3 border-t border-gray-100 transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col gap-4 max-w-lg mx-auto">
              <div className="w-full">
                <SearchBar
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>
              <div className="border-t border-gray-100 pt-3">
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
