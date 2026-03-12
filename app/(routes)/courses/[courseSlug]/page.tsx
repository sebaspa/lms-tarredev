import { getCourseBySlug } from '@/actions/getCourseBySlug'
import { BreadCrumbCourse } from './components'

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

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='my-4 mx-6 rounded-lg bg-white p-6'>
        <BreadCrumbCourse title={infoCourse.title} />
      </div>
    </div>
  )
}

export default PageCourse
