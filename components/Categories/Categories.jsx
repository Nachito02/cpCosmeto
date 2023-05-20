import React from 'react'
import Image from 'next/image'
const Categories = ({categories, handleCategoryClick}) => {
  return (
    categories.map((e, i) => (
        <div
          key={i}
          className="mb-2 md:mb-0 relative hover:scale-110 hover:cursor-pointer transition-all ease-in-out"
          onClick={() => handleCategoryClick(e)}
        >
          <Image
            className="brightness-50 w-[300px] h-[300px]"
            src={e.img_service}
            width={300}
            height={300}
            alt="categoria cejas"
          />
          <p className="absolute top-1/2 text-black text-xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 ">
            {e.name}
          </p>
        </div>
      ))
  )
}

export default Categories