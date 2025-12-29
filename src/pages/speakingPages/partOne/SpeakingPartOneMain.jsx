
import TestHeader from '@/components/common/TestHeader'
import PaginationSection from '@/pages/ListeningAllPages/PaginationSection'
import SpeakingPartOneMiddle from './SpeakingPartOneMiddle'


const SpeakingPartOneMain = () => {
  return (
    <div className='flex flex-col w-full '>
            <TestHeader durationInSeconds={60} onExit={"/speaking"}  />
            <SpeakingPartOneMiddle/>
             <PaginationSection/>
    </div>
  )
}

export default SpeakingPartOneMain