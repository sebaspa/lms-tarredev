import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

import { ChapterForm } from "./components"

const ChapterIdPage = async ({params}: {params: Promise<{courseId: string, chapterId: string}>}) => {
  const {courseId, chapterId} = await params
  const {userId} = await auth()

  if (!userId) {
    return (
      <div className='px-6'>
        <div className='w-full bg-white my-2 p-3 rounded-md'>
          <p>No tienes permisos para ver este capítulo.</p>
        </div>
      </div>
    )
  }

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: courseId
    }
  })

  if(!chapter) {
    return (
      <div className='px-6'>
        <div className='w-full bg-white my-2 p-3 rounded-md'>
          <p>Capítulo no encontrado.</p>
        </div>
      </div>
    )
  }
  
  console.log(chapter)

  return (
    <div className="m-6">
      <ChapterForm chapter={chapter} courseId={courseId} />
    </div>
  )
}

export default ChapterIdPage
