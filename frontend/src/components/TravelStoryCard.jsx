import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { GrMapLocation } from 'react-icons/gr';
import moment from 'moment';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const TravelStoryCard = ({ item, onClick, onFavClick }) => {
  const { title, story, visitedLocation, visitedDate } = item;

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onFavClick();
          }}
        >
          {item.isFav ? (
            <MdFavorite className="text-red-500 text-xl" />
          ) : (
            <MdFavoriteBorder className="text-gray-600 text-xl" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">{visitedDate}</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          {String(story || '').slice(0, 60)}...
        </p>
        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded-md px-2 py-1 mt-3">
          <GrMapLocation className="text-sm" />
          {visitedLocation?.map((item, index) =>
            visitedLocation?.length == index + 1 ? `${item}` : `${item},`
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
