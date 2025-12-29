import TestHeader from '@/components/common/TestHeader'
import PaginationSection from '@/pages/ListeningAllPages/PaginationSection'
import React from 'react'
import WritingPartOnaeMiddle from './WritingPartOnaeMiddle'


const WritingPartOne = () => {
  return (
    <div className='flex flex-col w-full'>
            <TestHeader durationInSeconds={60}  onExit={"/writing"} />
            <WritingPartOnaeMiddle />
             <PaginationSection/>
    </div>
  )
}

export default WritingPartOne