import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params
    const { userId } = await auth()
    const { title } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId
      }
    })

    if (!course) {
      return new NextResponse('Course not found', { status: 404 })
    }

    const chapterCount = await prisma.chapter.count({
      where: {
        courseId
      }
    })

    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId,
        position: chapterCount + 1
      }
    })

    return NextResponse.json(chapter)
  } catch (error) {
    console.error('[COURSE_CHAPTER]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
