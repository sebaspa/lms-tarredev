import prisma from "@/lib/prisma"

import { currentUser } from "@clerk/nextjs/server"

import { Header } from "./components"

const TeacherPage = async () => {
  const user = await currentUser()

  if(!user) {
    return (<p>Not signed in</p>)
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: user.id
    }
  })

  console.log(courses)

  return (
    <div>
      <Header />
    </div>
  )
}

export default TeacherPage
