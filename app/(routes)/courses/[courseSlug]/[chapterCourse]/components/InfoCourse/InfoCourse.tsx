import { Lock } from 'lucide-react'
import { InfoCourseProps } from './InfoCourse.types'
import { ProgressCourse, VideoCourse } from '../'

const InfoCourse = (props: InfoCourseProps) => {
  const {
    infoCourse,
    chapterCourseId,
    userProgress,
    purchaseCourse,
    videoUrl
  } = props
  console.log('purchaseCourse: ', purchaseCourse)
  return (
    <div className='w-full relative'>
      {!purchaseCourse && (
        <div className='absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary'>
          <Lock className='w-8 h-8' />
          <p className='text-sm font-semibold'>
            Capítulo bloqueado. Paga el curso para acceder.
          </p>
        </div>
      )}
      {videoUrl && <VideoCourse videoUrl={videoUrl} />}
      <ProgressCourse
        chapterCourseId={chapterCourseId}
        infoCourse={infoCourse}
        userProgress={userProgress}
      />
    </div>
  )
}

export default InfoCourse
