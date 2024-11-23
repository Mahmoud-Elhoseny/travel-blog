import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import TravelStoryCard from '../../components/TravelStoryCard';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import AddEditTravelModal from '../../components/Modals/AddEditTravelModal';
import ViewTravelStoryModal from '../../components/Modals/ViewTravelStoryModal';
import EmptyCard from '../../components/EmptyCard';
import emptyImg from '../../assets/bg-image.jpeg';
import moment from 'moment';
import { getEmptyCardMessage } from '../../utils/helper';

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/auth/get-user');
      if (response.status === 200 && response) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate('/login');
    }
  };
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get('/travel/get-all-travels');
      if (response.status === 200 && response) {
        setAllStories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.post(
        `/travel/search?query=${query}`
      );
      if (response.status === 200 && response) {
        setFilterType('search');
        setAllStories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearSearch = () => {
    setFilterType('');
    getAllTravelStories();
  };
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from
        ? moment(day.from).format('Do MMM YYYY')
        : null;
      const endDate = day.to ? moment(day.to).format('Do MMM YYYY') : null;
      const response = await axiosInstance.get(
        `/travel/filter?startDate=${startDate}&endDate=${endDate}`
      );
      if (response.status === 200 && response) {
        setFilterType('date');
        setAllStories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };
  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType('');
    getAllTravelStories();
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);
  const handleEdit = (item) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: item });
  };

  const handleViewStory = (item) => {
    setOpenViewModal({ isShown: true, data: item });
  };
  const updateIsFav = async (item) => {
    const storyId = item.id;
    try {
      const response = await axiosInstance.put(
        `/travel/update-is-fav/${storyId}`,
        { isFav: !item.isFav }
      );
      if (response.status === 200 && response) {
        toast.success('story Updated successfully');
        getAllTravelStories();
      }
      if (filterType === 'search' && searchQuery) {
        onSearchStory(searchQuery);
      } else if (filterType === 'date') {
        filterStoriesByDate(dateRange);
      } else {
        getAllTravelStories();
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const deleteTravelStory = async (item) => {
    try {
      const response = await axiosInstance.delete(
        `/travel/delete-travel/${item.id}`
      );
      if (response.status === 200 && response) {
        toast.success('story deleted successfully');
        setOpenViewModal((prev) => ({ ...prev, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
          <div className="flex-1 lg:order-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allStories.map((story) => (
                  <TravelStoryCard
                    item={story}
                    key={story.id}
                    onClick={() => handleViewStory(story)}
                    onFavClick={() => updateIsFav(story)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={emptyImg}
                message={getEmptyCardMessage(filterType)}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>

      <AddEditTravelModal
        openAddEditModal={openAddEditModal}
        setOpenAddEditModal={setOpenAddEditModal}
        getAllTravelStories={getAllTravelStories}
      />

      <ViewTravelStoryModal
        setOpenViewModal={setOpenViewModal}
        openViewModal={openViewModal}
        handleEdit={handleEdit}
        deleteTravelStory={deleteTravelStory}
      />

      <button
        className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-4 sm:right-10 bottom-4 sm:bottom-10 shadow-lg transition-all duration-300 z-50"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: 'add', data: null })
        }
      >
        <MdAdd className="text-[24px] sm:text-[32px] text-white" />
      </button>
    </>
  );
};

export default Home;
