import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="empty" className="w-24" />
      <p className="text-slate-700 text-sm w-1/2 font-medium text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
