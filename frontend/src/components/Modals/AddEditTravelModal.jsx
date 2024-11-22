import React from 'react';
import Modal from 'react-modal';
import AddEditTravelStory from '../../pages/Home/AddEditTravelStory';
const AddEditTravelModal = ({
  openAddEditModal,
  setOpenAddEditModal,
  getAllTravelStories,
}) => {
  return (
    <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={() =>
        setOpenAddEditModal({ isShown: false, type: null, data: null })
      }
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1000,
        },
      }}
      appElement={document.getElementById('root')}
      className="model-box"
    >
      <AddEditTravelStory
        storyInfo={openAddEditModal.data}
        type={openAddEditModal.type}
        onClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        getAllTravelStories={getAllTravelStories}
      />
    </Modal>
  );
};

export default AddEditTravelModal;
