
import TestHeader from '@/components/common/TestHeader'
import PaginationSection from '@/pages/ListeningAllPages/PaginationSection'
import SpeakingPartTwoMiddle from './SpeakingPartTwoMiddle'


const SpeakingPartTwoMain = () => {
  return (
    <div className='flex flex-col w-full'>
            <TestHeader durationInSeconds={60} onExit={"/speaking/part1"}  />
            <SpeakingPartTwoMiddle/>
             <PaginationSection/>
    </div>
  )
}

export default SpeakingPartTwoMain