import prisma from '@/lib/prisma'

import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs/server'

/**
 * Updates a course by its ID.
 *
 * @param {Request} req - The request object
 * @param {Promise<{ courseId: string >}} params - The params object containing the courseId
 * @returns {Promise<NextResponse>} - The response object
 * @throws {Error} - If the user is not authorized or if the course is not found
 */
export async function PATCH (
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { userId } = await auth()
    const { courseId } = await params
    const values = await req.json()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

/**
 * Deletes a course by its ID.
 *
 * @param {Request} req - The request object
 * @param {Promise<{ courseId: string >}} params - The params object containing the courseId
 * @returns {Promise<NextResponse>} - The response object
 */
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
