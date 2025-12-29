
import TestHeader from '@/components/common/TestHeader'
import WritingPartTwoMiddle from './WritingPartTwoMiddle'
import PaginationSection from '@/pages/ListeningAllPages/PaginationSection'


const WritingPartTwo = () => {
  return (
    <div className='flex flex-col w-full'>
            <TestHeader durationInSeconds={60} onExit={"/writing/part1"}  />
            <WritingPartTwoMiddle/>
             <PaginationSection/>
    </div>
  )
}

export default WritingPartTwo