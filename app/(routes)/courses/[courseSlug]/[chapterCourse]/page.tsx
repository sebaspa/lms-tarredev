import { redirect } from 'next/navigation'

import { currentUser } from '@clerk/nextjs/server'

import { getCourseBySlug } from '@/actions/getCourseBySlug'
import { getPurchasedCourse } from '@/actions/getPurchasedCourse'
import { getUserProgress } from '@/actions/getUserProgress'

import { ChaptersCourse, InfoCourse } from './components'

const ChapterCoursePage = async ({
  params
}: {
  params: Promise<{ courseSlug: string; chapterCourse: string }>
}) => {
  const { courseSlug, chapterCourse } = await params
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  const infoCourse = await getCourseBySlug(courseSlug)

  if (!infoCourse) {
    redirect(`/courses/${courseSlug}`)
  }

  const userPgrogress = await getUserProgress()

  const isPurchasedCourse = await getPurchasedCourse(user.id, infoCourse.id)

  const videoUrl = infoCourse.chapters.find(
    chapter => chapter.id === chapterCourse
  )?.videoUrl

  return (
    <div className='p-6'>
      <div className='grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4'>
        <InfoCourse
          infoCourse={infoCourse}
          chapters={infoCourse.chapters}
          chapterCourseId={chapterCourse}
          userProgress={userPgrogress}
          purchaseCourse={isPurchasedCourse}
          videoUrl={videoUrl}
        />
        <ChaptersCourse
          chapters={infoCourse.chapters}
          courseSlug={courseSlug}
          chapterCourse={chapterCourse}
          userProgress={userPgrogress}
        />
      </div>
    </div>
  )
}

export default ChapterCoursePage
