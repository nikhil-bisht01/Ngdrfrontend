import React from 'react'
import ErrorBoundary from '../../ErrorBoundary'

const LeftSection = (props) => {
  return (
    <ErrorBoundary>
  <div className='text-justify rounded-md p-6 md:p-12 lg:p-14 bg-[#f5eeee76]'>
        <h1 className='font-semibold '>{props.heading}</h1>
        <p className='leading-normal' >{props.content}</p>
    </div>
    </ErrorBoundary>
  
  )
}

export default LeftSection