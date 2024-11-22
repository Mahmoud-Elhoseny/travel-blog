import React, { useState } from 'react';
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from 'react-icons/md';
import DateSelector from '../../components/input/DateSelector';
import ImageSelector from '../../components/input/ImageSelector';
import TagInput from '../../components/input/TagInput';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { toast } from 'react-toastify';
import uploadImage from '../../utils/uploadImage';

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {

  const [title, setTitle] = useState(storyInfo?.title || '');
  const [image, setImage] = useState(storyInfo?.image || null);
  const [story, setStory] = useState(storyInfo?.story || '');
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );

  const addTravelStory = async () => {
    try {
      let imageUrl = '';
      if (image) {
        const imgUploadRes = await uploadImage(image);
        imageUrl = imgUploadRes.imageUrl || '';
      }
      const response = await axiosInstance.post('/travel/add-travel', {
        title,
        story,
        image: imageUrl || '',
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).format('Do MMM YYYY')
          : moment().format('Do MMM YYYY'),
      });

      if (response.data) {
        toast.success('Story added successfully');
        onClose();
        getAllTravelStories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || 'Something went wrong');
    }
  };

  const updateTravelStory = async () => {
    try {
      let imageUrl = '';

      if (typeof image === 'object') {
        const imgUploadRes = await uploadImage(image);
        imageUrl = imgUploadRes.imageUrl || '';
      } else {
        imageUrl = image || '';
      }

      const response = await axiosInstance.put(
        `/travel/update-travel/${storyInfo.id}`,
        {
          title,
          story,
          image: imageUrl,
          visitedLocation,
          visitedDate: visitedDate
            ? moment(visitedDate).valueOf()
            : moment().valueOf(),
        }
      );
      if (response.data) {
        toast.success('Story Updated successfully');
        onClose();
        getAllTravelStories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || 'Something went wrong');
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) {
      toast.error('Please enter the title');
      return;
    }
    if (!story) {
      toast.error('Please enter the story');
      return;
    }
    if (type === 'edit') {
      updateTravelStory();
    } else {
      addTravelStory();
    }
  };
  const handleDeleteImg = async () => {
    const deleteImgRes = await axiosInstance.delete(
      `/travel/delete-image/${storyInfo.image}`
    );
    if (deleteImgRes.data) {
      const response = await axiosInstance.put(
        `/travel/update-travel/${storyInfo.id}`,
        {
          title,
          story,
          image: '',
          visitedLocation,
          visitedDate: visitedDate
            ? moment(visitedDate).valueOf()
            : moment().valueOf(),
        }
      );
      if (response.data) {
        toast.success('Image deleted successfully');
        setImage(null);
      }
    }
  };
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === 'add' ? 'Add Story' : 'Update Story'}
        </h5>
        <div>
          <div className="flex items-center gap-3 bg-cyan-50 p-2 rounded-l-lg ">
            {type === 'add' ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>
              </>
            )}
            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">title</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>
          <ImageSelector
            image={image}
            setImage={setImage}
            handleDeleteImg={handleDeleteImg}
          />
          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Story</label>
            <textarea
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Story"
              rows={10}
              value={story}
              type="text"
              onChange={(e) => setStory(e.target.value)}
            />
          </div>
          <div className="pt-3">
            <label className="input-label">VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
