import { ChaptersList } from '../'

import { ChaptersCourseProps } from './ChaptersCourse.types'

const ChaptersCourse = (props: ChaptersCourseProps) => {
  const { chapters, courseSlug, chapterCourse, userProgress } = props
  return (
    <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Capítulos</h2>
      <ChaptersList
        chapters={chapters}
        courseSlug={courseSlug}
        currentChapter={chapterCourse}
        userProgress={userProgress}
      />
    </div>
  )
}

export default ChaptersCourse
