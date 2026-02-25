import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs/server'

export async function PATCH (
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth()
    const { courseId, chapterId } = await params
    const values = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(chapter)
  } catch (error) {
    console.log('[CHAPTER_UPDATE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
