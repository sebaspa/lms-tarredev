import prisma from '@/lib/prisma'

import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs/server'

export async function DELETE (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { courseId } = await params

    const course = await prisma.course.delete({
      where: {
        id: courseId,
        userId
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
