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

  const { title, category, description } = infoCourse
  
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
      <div className="my-4 bg-white rounded-md p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="w-fit mb-4 px-2 py-1 bg-violet-400 text-white rounded-full text-xs shadow-md">{category}</div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default InfoCourse
