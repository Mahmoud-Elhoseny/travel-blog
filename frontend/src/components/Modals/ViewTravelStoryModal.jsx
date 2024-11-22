import React from 'react';
import Modal from 'react-modal';
import ViewTravelStory from '../../pages/Home/ViewTravelStory';
const ViewTravelStoryModal = ({
  setOpenViewModal,
  openViewModal,
  handleEdit,
  deleteTravelStory,
}) => {
  return (
    <Modal
      isOpen={openViewModal.isShown}
      onRequestClose={() => setOpenViewModal({ isShown: false, data: null })}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1000,
        },
      }}
      appElement={document.getElementById('root')}
      className="model-box"
    >
      <ViewTravelStory
        storyInfo={openViewModal.data || null}
        onClose={() =>
          setOpenViewModal((prev) => ({ ...prev, isShown: false }))
        }
        onEditClick={() => {
          setOpenViewModal((prev) => ({ ...prev, isShown: false }));
          handleEdit(openViewModal.data || null);
        }}
        onDeleteClick={() => {
          deleteTravelStory(openViewModal.data || null);
        }}
      />
    </Modal>
  );
};

export default ViewTravelStoryModal;
