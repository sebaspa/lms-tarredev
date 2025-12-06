import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const { courseId } = await params
    const {userId} = await auth()
    const { list } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      }
    })

    if (!ownCourse) {
      return new NextResponse('Course not found', { status: 404 })
    }

    await prisma.$transaction(
      list.map((item: { id: string; position: number }) => {
        return prisma.chapter.update({
          where: {
            id: item.id
          },
          data: {
            position: item.position
          }
        })
      })
    )

    return NextResponse.json({ message: 'Success', status: 200 })

  } catch (error) {
    console.error('[COURSE_CHAPTER_REORDER]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
