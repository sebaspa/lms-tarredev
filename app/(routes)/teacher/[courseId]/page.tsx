import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

import { ChaptersBlock, CourseForm, CourseImage, CoursePrice, HeaderCourse } from './components'

const CoursePage = async ({
  params
}: {
  params: Promise<{ courseId: string }>
}) => {
  const { courseId } = await params
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className='px-6'>
        <div className='w-full bg-white my-2 p-3 rounded-md'>
          <p>No tienes permisos para ver este curso.</p>
        </div>
      </div>
    )
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc'
        }
      }
    }
  })

  if (!course) {
    return (
      <div className='px-6'>
        <div className='w-full bg-white my-2 p-3 rounded-md'>
          <p>El curso no existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='m-6'>
      <HeaderCourse idCourse={course.id} isPublished={course.isPublished} />
      <CourseForm course={course} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
        <CourseImage idCourse={course.id} imageCourse={course.imageUrl} />
        <CoursePrice idCourse={course.id} priceCourse={course.price} />
      </div>
      <ChaptersBlock idCourse={course.id} chapters={course.chapters} />
    </div>
  )
}

export default CoursePage
