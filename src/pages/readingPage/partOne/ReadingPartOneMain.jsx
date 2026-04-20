import TestHeader from '@/components/common/TestHeader'
import PaginationSection from '@/pages/ListeningAllPages/PaginationSection'
import React from 'react'
import ReadingPartOneMiddle from './ReadingPartOneMiddle'

const ReadingPartOneMain = () => {
  return (
       <div className='flex flex-col w-full '>
            <TestHeader durationInSeconds={60} onExit={"/reading"}  />
            <ReadingPartOneMiddle/>
             <PaginationSection/>
    </div>
  )
}

export default ReadingPartOneMain