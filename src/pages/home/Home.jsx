import React from 'react'
import IconCard from '@/components/IconCard'
import { ImageAssets } from '@/lib/ImageProvider'

const Home = () => {
  return (
    <div className='container mx-auto '>

      <div className="flex justify-center gap-20">
        <div className="flex items-center gap-3 group">
          <img src={ImageAssets.I} className='w-16 group-hover:rotate-12' alt="" />
          <p className="text-4xl font-bold">IELTS</p>
        </div>
        <div className="flex items-center gap-3 group">
          <img src={ImageAssets.P} className='w-16 group-hover:rotate-12' alt="" />
          <p className="text-4xl font-bold">PTE</p>
        </div>
        <div className="flex items-center gap-3 group">
          <img src={ImageAssets.C} className='w-16 group-hover:rotate-12' alt="" />
          <p className="text-4xl font-bold">CLASSROOM</p>
        </div>
      </div>

      <div className="mt-10">
        <div
          className=" bg-cover bg-center bg-no-repeat rounded-2xl"
          style={{ backgroundImage: `url(${ImageAssets.banner})` }}
        >
          <div className="grid grid-cols-2 justify-between py-32 px-8">
            <div className=""></div>
            <div className="">
              <p className="text-lg mb-2 text-white font-bold">Get ready in advance</p>
              <p className="text-white text-4xl font-bold mb-6">
                Get yourself prepared ahead of time by taking 2026 free mock tests
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Get free mock test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home