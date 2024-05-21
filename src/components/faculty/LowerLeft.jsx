import React from 'react'
import { useState } from 'react';
import Modal from './Modal';
import ErrorBoundary from '../../ErrorBoundary';



const LowerLeft = (props) => {
  const { title, data } = props.Modata;
  const headData=props.headData
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <ErrorBoundary>
    <div className='flex flex-wrap items-center justify-center'>
      <div className='flex flex-col justify-center items-start '>
       
        <img src={headData.image} alt="head" className='rounded-md h-full w-1/2' />
        <div className="ml-1">
          <h1 className='font-bold'>{headData.position}</h1>
          <span className="block font-semibold">{headData.name}</span>
          <p className=''>
            {headData.designation}
          </p>
        </div>
        <button onClick={handleShowModal} className='p-1.5 md:p-2.5  bg-[#1050A2] rounded-md text-white mt-4'>Show More...</button>

      </div>
      {showModal && <Modal onClose={handleCloseModal} title={title} data={data} />}

    </div>
    </ErrorBoundary>
   
</>
  )
}

export default LowerLeft