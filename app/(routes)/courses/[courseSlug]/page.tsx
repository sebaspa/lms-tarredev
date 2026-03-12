import { getCourseBySlug } from '@/actions/getCourseBySlug'
import { getPurchaseCourseById } from '@/actions/getPurchaseCourseById'

import { BreadCrumbCourse, CourseContent, HeroBlockCourse } from './components'
import { currentUser } from '@clerk/nextjs/server'

const PageCourse = async ({
  params
}: {
  params: Promise<{ courseSlug: string }>
}) => {
  const { courseSlug } = await params

  const infoCourse = await getCourseBySlug(courseSlug)

  if (!infoCourse) {
    return (
      <div className='max-w-6xl mx-auto'>
        <div className='my-4 mx-6 rounded-lg bg-white p-6'>
          <p>Curso no encontrado.</p>
        </div>
      </div>
    )
  }

  const { id, title, chapters } = infoCourse

  const user = await currentUser()

  if (!user) {
    return (
      <div className='max-w-6xl mx-auto'>
        <div className='my-4 mx-6 rounded-lg bg-white p-6'>
          <p>Debes iniciar sesión para ver el curso.</p>
        </div>
      </div>
    )
  }

  const purchaseCourse = await getPurchaseCourseById(user.id, id)

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='my-4 mx-6 rounded-lg bg-white p-6'>
        <BreadCrumbCourse title={title} />
        <HeroBlockCourse course={infoCourse} purchaseCourse={purchaseCourse} />
      </div>
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <CourseContent chapters={chapters} />
      </div>
    </div>
  )
}

export default PageCourse
