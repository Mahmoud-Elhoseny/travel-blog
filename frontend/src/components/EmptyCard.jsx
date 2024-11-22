import React from 'react';
import { BiBox } from 'react-icons/bi';

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <BiBox className="w-24 h-24 text-slate-400" />
      <p className="text-slate-700 text-sm w-1/2 font-medium text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
