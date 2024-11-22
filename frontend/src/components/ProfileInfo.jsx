import React from 'react';
import { getInitials } from '../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center justify-between w-full md:w-auto gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full text-slate-950 font-medium bg-slate-100 flex items-center justify-center transition-transform hover:scale-105">
            {getInitials(userInfo?.fullName || '')}
          </div>
          <p className="text-sm font-medium text-slate-900">{userInfo?.fullName || ''}</p>
        </div>
        <button
          className="text-sm text-slate-700 hover:text-slate-900 underline transition-colors"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default ProfileInfo;
