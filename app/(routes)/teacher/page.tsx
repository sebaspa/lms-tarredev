import prisma from '@/lib/prisma'

import { currentUser } from '@clerk/nextjs/server'

import { Header, ListCourses } from './components'

const TeacherPage = async () => {
  const user = await currentUser()

  if (!user) {
    return <p>Not signed in</p>
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: user.id
    }
  })

  return (
    <div>
      <Header />
      <ListCourses courses={courses} />
    </div>
  )
}

export default TeacherPage
