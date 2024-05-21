import React from 'react'
import ErrorBoundary from '../../ErrorBoundary'

const RightSection = ({images}) => {
  return (
 <ErrorBoundary>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-5 grid-auto-flow dense grid-rows-[300px]'>
  {images.map((image, index) => (
    <div key={index} className='h-full overflow-hidden rounded-lg'>
      <img src={image.path} alt={`img${index}`} className='h-full w-full object-cover' />
    </div>
  ))}
</div>
 </ErrorBoundary>


  )
}

export default RightSection