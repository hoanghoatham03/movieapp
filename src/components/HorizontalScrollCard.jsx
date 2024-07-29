import { useRef } from 'react'
import Card from './Card'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef(null)

  const handleNext = () => {
    containerRef.current.scrollLeft += 270
  }

  const handlePrev = () => {
    containerRef.current.scrollLeft -= 270
  }

  return (
    <div className='container mx-auto px-3 my-10 '>
      <h2 className='text-xl lg:text-2xl font-bold mb-3 capitalize'>{heading}</h2>
      <div className=' relative'>
        <div
          ref={containerRef}
          className=' grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all-duration scrollbar-none'
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + 'heading' + index}
                data={data}
                trending={trending}
                index={index + 1}
                media_type={media_type}
              />
            )
          })}
        </div>
        <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
          <button onClick={handlePrev} className=' bg-white p-1 rounded-full text-xl z-10 text-black -ml-2'>
            <FaAngleLeft />
          </button>
          <button onClick={handleNext} className=' bg-white p-1 rounded-full text-xl z-10 text-black -mr-2'>
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HorizontalScrollCard
